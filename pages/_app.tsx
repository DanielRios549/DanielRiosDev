import React, { useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/app.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        document.body.style.setProperty(
            '--vh', `${window.innerHeight}px`
        )
    }, [])

    return (
        <React.StrictMode>
            <Head>
                <link rel="icon" href="/favicon.png"/>
            </Head>
            <header>
                <h1>Page Header</h1>
            </header>
            <main>
                <Component {...pageProps} />
            </main>
        </React.StrictMode>
    )
}
