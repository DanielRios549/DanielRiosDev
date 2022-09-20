declare module '*.scss'

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly URL: string
            readonly PROJECT: string
            readonly API_URL: string
            readonly API_KEY: string
        }
    }
}

export {}
