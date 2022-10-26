import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import svg from '@poppanator/sveltekit-svg'
import { resolve } from 'path'

const config = defineConfig({
    plugins: [svg(), sveltekit()],
    server: {
        port: 3000,
        strictPort: true
    },
    resolve: {
        alias: {
            $: resolve('./src')
        }
    }
})

export default config
