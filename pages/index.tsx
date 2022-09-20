import Head from 'next/head'
import type { GetStaticProps } from 'next'
import type { Page } from 'src/types'

import style from 'styles/pages/index.module.scss'

export default function Home({ title, description }: Page) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
            </Head>
            <h1 id={style.message}>Coming soon</h1>
        </>
    )
}

export const getStaticProps: GetStaticProps<Page> = async () => {
    const url = process.env.URL

    const { title, description } = await (await fetch(`${url}/api/info/all`)).json() as Page

    return {
        props: { title, description },
        revalidate: 10
    }
}
