import { useMemo } from 'react'
import { useAtom, atom } from 'jotai'
import type { SetStateAction } from 'jotai'

export function useLocalStorage<T>(key: string, value: T) {
    return useStorage<T>(key, value, true)
}

export function useSessionStorage<T>(key: string, value: T) {
    return useStorage<T>(key, value, false)
}

export function useStorage<T>(key: string, value: T, persist: boolean): [T, (update: SetStateAction<T>) => void] {
    const browser = typeof window !== 'undefined'
    const storage = persist ? browser && localStorage : false

    const initital = (): T => {
        if (storage) {
            const stored = storage.getItem(key)
            return stored ? JSON.parse(stored) : value
        }
        else {
            return value
        }
    }

    const state = atom(initital())

    const derived = useMemo(() => atom(
        (get) => get(state),
        (get, set, update) => {
            try {
                const newValue = typeof update === 'function' ? update(get(state)) : update
                set(state, newValue)

                if (storage) {
                    storage.setItem(key, JSON.stringify(newValue))
                }
            }
            catch (error) {
                console.error(error)
            }
        }
    ), [key, state, storage])

    return useAtom(derived)
}
