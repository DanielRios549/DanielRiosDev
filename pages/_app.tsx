import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/app.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <React.StrictMode>
            <Head>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Component {...pageProps} />
        </React.StrictMode>
    )
}

export default MyApp
