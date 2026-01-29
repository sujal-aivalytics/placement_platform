// Quick fix script to add missing columns to Subtopic table
// Run with: node fix-database.js

const { Pool } = require('pg');

async function fixDatabase() {
    // Use DATABASE_URL (pooler) since DIRECT_URL connection is refused
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        console.log('🔄 Connecting to database via pooler...');

        const client = await pool.connect();
        console.log('✅ Connected to database');

        // Check if columns exist
        const checkQuery = `
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'Subtopic' 
            AND column_name IN ('createdAt', 'updatedAt');
        `;

        const existing = await client.query(checkQuery);
        console.log(`📊 Found ${existing.rows.length} timestamp columns`);

        if (existing.rows.length === 2) {
            console.log('✅ Columns already exist! No fix needed.');
            client.release();
            await pool.end();
            return;
        }

        // Add missing columns
        console.log('🔧 Adding missing columns...');

        const fixQuery = `
            DO $$ 
            BEGIN
                -- Add createdAt if missing
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name='Subtopic' AND column_name='createdAt'
                ) THEN
                    ALTER TABLE "Subtopic" 
                    ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
                    RAISE NOTICE 'Added createdAt column';
                END IF;

                -- Add updatedAt if missing
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name='Subtopic' AND column_name='updatedAt'
                ) THEN
                    ALTER TABLE "Subtopic" 
                    ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
                    RAISE NOTICE 'Added updatedAt column';
                END IF;
            END $$;
        `;

        await client.query(fixQuery);
        console.log('✅ Columns added successfully!');

        // Verify
        const verify = await client.query(checkQuery);
        console.log(`✅ Verification: Found ${verify.rows.length} timestamp columns`);

        // Show all columns
        const allColumns = await client.query(`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_name = 'Subtopic'
            ORDER BY ordinal_position;
        `);

        console.log('\n📋 Subtopic table structure:');
        allColumns.rows.forEach(col => {
            console.log(`  - ${col.column_name}: ${col.data_type}${col.is_nullable === 'NO' ? ' NOT NULL' : ''}`);
        });

        client.release();
        await pool.end();
        console.log('\n✅ Database fix completed successfully!');
        console.log('👉 Restart your dev server: npm run dev');

    } catch (error) {
        console.error('❌ Error fixing database:', error);
        process.exit(1);
    }
}

fixDatabase();
