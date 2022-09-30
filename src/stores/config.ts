import { useStorage } from 'src/lib/useStorage'
import type { Themes } from 'src/types/stores'

export const useMenu = () => useStorage<boolean>('menu', false, false)
export const useTheme = () => useStorage<Themes>('theme', 'dark', true)
