import type { Pages } from './page'

export interface Option {
    title: string
    description: string
    banner?: string
}

export type Options = Record<Pages, Option>

export type Text = {
    html: boolean | null
    content: string
}

export type Texts = Record<'header' | 'about' | 'resume' | 'warning', Text>
