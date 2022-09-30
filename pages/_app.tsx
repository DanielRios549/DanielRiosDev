import React from 'react'
import Head from 'next/head'
import Menu from 'src/components/Menu'
import { useMenu, useTheme } from 'src/stores/config'
import type { AppProps } from 'next/app'
import type { Themes } from 'src/types/stores'

import '../styles/app.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
    const themes: Themes[] = ['light', 'dark']
    const [theme, setTheme] = useTheme()
    const [menu, setMenu] = useMenu()

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
                <Menu/>
                <button onClick={changeTheme}>Change</button>
                <button onClick={() => setMenu(!menu)}>Open</button>
            </header>
            <main>
                <Component {...pageProps} />
            </main>
        </React.StrictMode>
    )
}
