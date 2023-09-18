import type { Pages } from './page'

export interface Option {
    title: string
    description: string
    banner?: string
}

export type Options = Record<Pages, Option>
