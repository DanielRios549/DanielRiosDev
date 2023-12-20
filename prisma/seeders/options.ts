import { prisma } from '$prisma/client'

const data: [number, string, string][] = [
    [1, 'projects_title', 'My Projects'],
    [2, 'home_description', 'Personal Portfolio of Daniel Rios'],
    [3, 'projects_description', 'Projects made by Daniel Rios'],
    [4, 'home_title', 'Daniel Rios'],
    [5, 'contact_title', 'Contact Me'],
    [6, 'contact_description', 'Contact Daniel Rios'],
    [7, 'home_banner', 'banner.jpg'],
    [8, 'about_title', 'About Me']
]

export async function options() {
    for (const [id, option, value] of data) {
        await prisma.portfolioOption.upsert({
            where: { id },
            update: {},
            create: {
                id,
                option,
                value
            }
        })
    }
}
