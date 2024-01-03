import { getContext, setContext } from 'svelte'
import type { createForm } from 'felte'

type FormContext = ReturnType<typeof createForm>

export const setFormContext = (object: FormContext) => setContext<FormContext>('form', object)
export const formContext = () => getContext<FormContext>('form') || {}
