import 'dotenv/config'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-vercel'
import PostSCSS from 'postcss-scss'
import AutoPrefixer from 'autoprefixer'
import Import from 'postcss-import'
import Nested from 'postcss-nested'
import SimpleVars from 'postcss-simple-vars'
import Extend from 'postcss-extend-rule'
import CustomSelector from 'postcss-custom-selectors'
import CustomMedia from 'postcss-custom-media'
import MediaMinMax from 'postcss-media-minmax'
import { join, resolve } from 'path'

const prepend = join(resolve('./styles'), '_custom.scss')

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess({
        markupTagName: 'template',
        scss: {
            prependData: `@use "${prepend}";`
        },
        postcss: {
            prependData: `@import "${prepend}";`,
            parser: PostSCSS.parse,
            plugins: [
                AutoPrefixer(), Nested(),
                SimpleVars(), Extend(),
                Import(), CustomSelector(),
                CustomMedia(), MediaMinMax()
            ]
        }
    }),
    kit: {
        adapter: adapter({
            split: true,
            isr: {
                expiration: 30
            }
        }),
        files: {
            routes: 'pages',
            assets: 'public'
        }
    }
}

export default config
