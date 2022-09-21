import { useState, useCallback, Dispatch, SetStateAction } from 'react'

export function useLocalStorage<T = undefined>(key: string, value: T) {
    return useStorage<T>(key, value, true)
}

export function useSessionStorage<T = undefined>(key: string, value: T) {
    return useStorage<T>(key, value, false)
}

function useStorage<T>(key: string, value: T, persist: boolean): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        try {
            const stored = persist === true ? localStorage.getItem(key) : sessionStorage.getItem(key)
            return stored ? JSON.parse(stored) : value
        }
        catch {
            return value
        }
    })

    const setValue = useCallback((newValue: any) => {
        try {
            setState(newValue)
            persist === true ? localStorage.setItem(key, JSON.stringify(newValue)) : sessionStorage.setItem(key, JSON.stringify(newValue))
        }
        catch (error) {
            console.error(error)
        }
    }, [key, persist])

    return [state, setValue]
}
