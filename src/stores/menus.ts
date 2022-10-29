import { get } from 'svelte/store'
import { savable } from '$/lib/store'
import type { Menu } from '$/types/page'

export const menus = savable<Menu[]>('menus', [], false)

export function getMenu(location: Menu['location']) {
    const find = get(menus).filter((menu) => menu.location === location).at(0)?.items

    return find || [['/', 'No Menu']]
}
