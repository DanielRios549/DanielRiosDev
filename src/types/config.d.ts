import type { Pages } from './page'

export interface Option {
    title: string
    description: string
}

export type Options = Record<Pages, Option>
