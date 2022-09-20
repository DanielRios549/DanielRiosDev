import { resolve } from 'path'

const config = {
    reactStrictMode: true,

    webpack(config) {
        config.resolve.alias['$api/*'] = resolve('pages/api/*')
        config.resolve.alias['$/*'] = resolve('src/*')

        return config
    }
}

export default config
