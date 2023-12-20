import { prisma } from '$prisma/client'

const data: [number, string, string, boolean][] = [
    [1, 'header', 'Daniel Rios', false],
    [2, 'resume', '<h1>Full Stack<br><span>Developer</span></h1>', true],
    [3, 'about', 'A philomath and self-taught developer', false],
    [4, 'warning-bpk', 'This project is in maintenance.', false]
]

export async function texts() {
    for (const [id, content, type, html] of data) {
        await prisma.portfolioText.upsert({
            where: { id },
            update: {},
            create: {
                id,
                content,
                type,
                html
            }
        })
    }
}
