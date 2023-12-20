import { prisma } from '$prisma/client'
import { options } from '$prisma/seeders/options'
import { texts } from '$prisma/seeders/texts'
import { projects } from '$prisma/seeders/projects'

async function main() {
    await Promise.all([
        options(),
        texts(),
        projects()
    ])
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })
