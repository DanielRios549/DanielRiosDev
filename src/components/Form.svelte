<script lang="ts">
    import { z } from 'zod'
    import { validator } from '@felte/validator-zod'
    import { createForm } from 'felte'
    import { enhance } from '$app/forms'
    import { page } from '$app/stores'
    import { setFormContext } from '$/lib/contexts'

    type SubmitValues = Record<string, string>

    export let action: string
    export let submit: ((values: SubmitValues) => any) | null = null
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
                const data: SubmitValues = {}

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
    {#if $page.form?.error}
        <section class="error">
            <span>{$page.form?.error}</span>
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

            &:not(.error) {
                display: none;
            }
            &.error {
                @extend %center;

                background-color: var(--error);
                height: 2rem;
                width: 100%;
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