import { savable } from '$/lib/store'
import type { Theme } from '$/types'

export const menu = savable<boolean>('menu', false, false)
export const theme = savable<Theme>('theme', 'dark', true)
