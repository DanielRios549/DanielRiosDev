<script lang="ts">
    import * as yup from 'yup'
    import { enhance } from '$app/forms'
    import { page } from '$app/stores'
    import { createForm } from 'svelte-forms-lib'
    import { setFormContext } from '$/lib/contexts'

    export let action: string
    export let submit: ((values: Record<string, string>) => any) | null = null
    export let submitText: string = 'Submit'
    export let initialValues: Record<string, any> = {}
    export let validationSchema: yup.ObjectShape = {}

    const form = createForm({
        initialValues,
        validationSchema: yup.object().shape(validationSchema),
        onSubmit: (values) => {
            submit && submit(values)
        }
    })

    setFormContext(form)

</script>

<form {action} method="POST" on:submit|preventDefault={form.handleSubmit} use:enhance>
    {#if $page.form?.error}
        <section class="error">
            <span>{$page.form?.error}</span>
        </section>
    {/if}
    <slot/>
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