export const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function projectUri(link: string) {
    return link.replaceAll(' ', '-').toLowerCase()
}

export function projectName(link: string) {
    return link.replaceAll('-', ' ').toLowerCase()
}
