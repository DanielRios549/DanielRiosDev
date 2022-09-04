import Head from 'next/head'
import style from 'styles/pages/index.module.scss'

export default function Home() {
    return (
        <>
            <Head>
                <title>Daniel Rios</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main id={style.main}>
                <h1>Coming soon</h1>
            </main>
        </>
    )
}
