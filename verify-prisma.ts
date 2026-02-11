import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Checking MockCompanyDrive model...');
    if (prisma.mockCompanyDrive) {
        console.log('✅ prisma.mockCompanyDrive exists');
        const count = await prisma.mockCompanyDrive.count();
        console.log(`Current drive count: ${count}`);
    } else {
        console.error('❌ prisma.mockCompanyDrive is UNDEFINED');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
