import React from 'react'
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
    const api = `${process.env.URL}/api`

    const { title, description } = await (await fetch(`${api}/info/all`)).json() as Page

    return {
        props: { title, description },
        revalidate: Number(process.env.ISR_REVALIDATE) || 60 * 60 * 24
    }
}
