import { getContext, setContext } from 'svelte'
import type { FormProps } from 'svelte-forms-lib'

type FormContext = NonNullable<FormProps['context']>

export const setFormContext = (object: FormContext) => setContext<FormContext>('form', object)
export const formContext = () => getContext<FormContext>('form') || {}
