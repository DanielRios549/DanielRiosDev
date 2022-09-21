import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import '../styles/app.scss'
import { useLocalStorage } from 'src/lib/useStorage'

export default function MyApp({ Component, pageProps }: AppProps) {
    const themes = ['light', 'dark']
    const [theme, setTheme] = useLocalStorage('theme', themes[0])

    const changeTheme = () => {
        const current = themes.findIndex((search) => search === theme)

        if (current + 1 < themes.length) {
            setTheme(themes[current + 1])
        }
        else {
            setTheme(themes[0])
        }
    }

    // TODO: Fix useLayoutEffect on server mismatch initial values
    React.useLayoutEffect(() => {
        document.body.id = theme

        document.body.style.setProperty(
            '--vh', `${window.innerHeight}px`
        )
    }, [theme])

    return (
        <React.StrictMode>
            <Head>
                <link rel="icon" href="/favicon.png"/>
            </Head>
            <header>
                <h1>Page Header</h1>
                <button onClick={changeTheme}>Change</button>
            </header>
            <main>
                <Component {...pageProps} />
            </main>
        </React.StrictMode>
    )
}
