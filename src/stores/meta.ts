import { savable } from '$/lib/store'
import type { Options } from '$/types'

export const options = savable<Options>('options', {}, true)
