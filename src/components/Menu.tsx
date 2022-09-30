import React from 'react'
import Link from 'next/link'
import { useMenu } from 'src/stores/config'

import style from 'styles/components/menu.module.scss'

export default React.memo(function Menu() {
    const [open] = useMenu()

    return (
        <nav id={style.menu} className={open ? 'open' : 'close'}>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
})
