<script lang="ts">
    import { z } from 'zod'
    import { validator } from '@felte/validator-zod'
    import { createForm } from 'felte'
    import { enhance } from '$app/forms'
    import { page } from '$app/stores'
    import { setFormContext } from '$/lib/contexts'
    import type { Data } from '$/types/form'

    export let action: string
    export let submit: ((values: Data) => any) | null = null
    export let submitText: string = 'Submit'
    export let initialValues: Record<string, any> = {}
    export let validationSchema: z.ZodObject<any> = z.object({})

    const config = createForm({
        initialValues,
        extend: validator({
            schema: validationSchema
        }),
        onSuccess(_, context) {
            if (submit) {
                const data: Data = {}

                for (const control of context.controls || []) {
                    data[control.name] = control.value
                }

                submit(data)
            }
        }
    })

    setFormContext(config)
</script>

<form {action} method="POST" use:config.form use:enhance>
    <slot/>
    {#if $page.form?.message}
        <section class:show={$page.form?.message} class:error={$page.form?.error}>
            <span>{$page.form?.message}</span>
        </section>
    {/if}
    <button type="submit">{submitText}</button>
</form>

<style lang="scss">
    form {
        @extend %center;

        flex-direction: column;
        gap: 10px;
        margin: auto;
        width: min(100vw, 50rem);

        section {
            position: relative;

            &:not(.show) {
                display: none;
            }
            &.show {
                @extend %center;

                background-color: var(--highlight);
                height: 2rem;
                width: 100%;
            }
            &.error {
                background-color: var(--error);
            }
            button {
                background-color: transparent;
                position: absolute;
                right: 0.5rem;
                font-size: 1.3rem;
            }
        }
        :global {
            input {
                background-color: var(--color2);
                height: 3rem;
                width: 100%;
            }
            button[type="submit"] {
                background-color: var(--color3);
                color: var(--text);
                width: 100%;
                height: 50px;
                cursor: pointer;

                &:hover {
                    background-color: var(--color2);
                    color: var(--text2);
                }
            }
        }
    }
</style>