import Head from 'next/head'
import type { GetStaticProps } from 'next'

import style from 'styles/pages/index.module.scss'

type Props = {
    title: string
}

export default function Home({ title }: Props) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main id={style.main}>
                <h1>Coming soon</h1>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const url = process.env.URL

    const get = await fetch(`${url}/api/info/title`)
    const title = await get.json()

    return {
        props: { title }
    }
}
