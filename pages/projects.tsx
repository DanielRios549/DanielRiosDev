import Head from 'next/head'
import type { GetStaticProps } from 'next'
import type { Project, Page } from 'src/types'

import style from 'styles/pages/projects.module.scss'

interface Props extends Page {
    projects: Project[]
}

export default function Projects({ title, projects, description }: Props) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
            </Head>
            <section id={style.projects}>
                <header>
                    <h3>Projects</h3>
                </header>
                {projects.map(({ name, stack }, index) => (
                    <article key={index}>{name} - {stack}</article>
                ))}
            </section>
        </>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const url = process.env.URL
    const api = `${url}/api`

    const title = await (await fetch(`${api}/info/projects-title`)).json()
    const projects = await (await fetch(`${api}/projects/all`)).json()

    return {
        props: { title, projects },
        revalidate: 10
    }
}
