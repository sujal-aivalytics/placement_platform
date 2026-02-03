import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined,
    pool: Pool | undefined
}

// Validate environment variable
if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set')
    throw new Error('DATABASE_URL environment variable is not set')
}

// Create a connection pool with error handling
const pool = globalForPrisma.pool ?? new Pool({
    connectionString: process.env.DATABASE_URL, // runtime pooler (correct)
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 30000, // Increased from 10s to 30s
    statement_timeout: 30000, // Add statement timeout
    query_timeout: 30000, // Add query timeout
})

// Add pool error handler
pool.on('error', (err) => {
    console.error('❌ Unexpected database pool error:', err)
})

// Create the adapter
const adapter = new PrismaPg(pool)

// Initialize Prisma Client with the adapter
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// Store pool in global for reuse
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
    globalForPrisma.pool = pool
}

// Connection health check function
export async function checkDatabaseConnection() {
    try {
        await prisma.$queryRaw`SELECT 1`
        return true
    } catch (error) {
        console.error('❌ Database health check failed:', error)
        return false
    }
}

// Test connection on initialization
if (process.env.NODE_ENV === 'development') {
    prisma.$connect()
        .then(() => console.log('✅ Database connected successfully'))
        .catch((err) => {
            console.error('❌ Database connection failed:', err)
            // Try to reconnect after a delay
            setTimeout(() => {
                console.log('🔄 Attempting to reconnect to database...')
                prisma.$connect()
                    .then(() => console.log('✅ Database reconnected successfully'))
                    .catch((retryErr) => console.error('❌ Database reconnection failed:', retryErr))
            }, 5000)
        })
}

// Graceful shutdown
process.on('beforeExit', async () => {
    await prisma.$disconnect()
    await pool.end()
})

