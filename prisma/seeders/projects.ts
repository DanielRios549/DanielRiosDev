import { prisma } from '$prisma/client'

const data: [number, string, string, string, string, string][] = [
    [1, 'Reakut', 'Typescript, React, Sass, Vite', 'https://github.com/DanielRios549/ReactSocial', 'https://reakut.danielrios.dev', 'reakut.png'],
    [2, 'OriGatou Home Page', 'Svelte, Typescript, Sass, Postcss', '', 'https://origatou.com', 'origatou.png'],
    [3, 'MiniCRM', 'PHP, Laravel, Inertia, React, Vite', 'https://github.com/DanielRios549/MiniCRM', '', ''],
    [4, 'CalcMaker', 'Python, Flet', 'https://github.com/DanielRios549/CalcMaker', '', 'calc-maker.png']
]

export async function projects() {
    for (const [id, name, stack, repo, link, image] of data) {
        await prisma.project.upsert({
            where: { id },
            update: {},
            create: {
                id,
                name,
                stack,
                link,
                repo,
                image
            }
        })
    }
}
