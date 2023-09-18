import { get } from 'svelte/store'
import { page } from '$app/stores'
import type { Database } from '$/types/generated'

export function getText(location: string): [string, boolean] {
    const items: Database['public']['Tables']['portfolio_texts']['Row'][] = get(page).data.texts
    const find = items.filter((text) => text.type === location).at(0)

    if (find) {
        return [find.content, !!find.html]
    }

    return ['No Text', false]
}
