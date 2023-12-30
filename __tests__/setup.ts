import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'
import { env } from '$env/dynamic/private'
import type * as stores from '$app/stores'

vi.mock('$app/stores', async () => {
    const { readable } = await import('svelte/store')

    const getStores: typeof stores.getStores = () => ({
        navigating: readable(null),
        page: readable({ url: new URL(env.URL), params: {} }) // TODO: Fix Typing
    })

    const page: typeof stores.page = {
        subscribe(fn) {
            return getStores().page.subscribe(fn)
        }
    }

    const navigating: typeof stores.navigating = {
        subscribe(fn) {
            return getStores().navigating.subscribe(fn)
        }
    }

    return {
        getStores,
        navigating,
        page
    }
})
