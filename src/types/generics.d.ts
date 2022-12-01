// FIX Key Filter
// Ex: HTMLHeadingElement returning elements other than h1-6
type KeyMap<T, V> = {
    [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

export type Tag<V> = KeyMap<HTMLElementTagNameMap, V>
