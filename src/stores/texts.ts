import { get } from 'svelte/store'
import { savable } from '$/lib/store'
import type { Text } from '$/types/texts'

export const texts = savable<Text[]>('menus', [], false)

export function getText(location: string): string {
    const find = get(texts).filter((text) => text.type === location).at(0)?.content

    return find || 'No Text'
}
