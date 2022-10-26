import { writable } from 'svelte/store'
import { browser } from '$app/environment'

export function savable<T>(key: string, initial: T, save: boolean = true) {
    let data: any = initial

    if (save) {
        const persist = browser && localStorage.getItem(key)
        data = persist ? JSON.parse(persist) : initial
    }

    const store = writable<T>(data, () => {
        const unsubscribe: any = store.subscribe((value) => {
            if (save) {
                browser && localStorage.setItem(key, JSON.stringify(value))
            }
        })

        return unsubscribe
    })

    return store
}
