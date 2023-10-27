<script lang="ts">
    import { formContext } from '$/lib/contexts'

    const { form, handleChange, errors } = formContext() || {}

    export let type: 'number' | 'text' | 'password' | 'textarea' = 'text'
    export let hidden: boolean = false
    export let value: string | null = null
    export let name: string
    export let label: string = ''
    export let placeholder: string = ''

    let blured = false

    const identifier = name.replaceAll(' ', '-').toLowerCase()

    $: if (form && value) {
        $form[name] = value
    }

    const change = (event: any, blur: boolean) => {
        if (blur) {
            blured = true
        }

        if (blured && handleChange) {
            handleChange(event)
        }
    }
</script>

<template>
    {#if type === 'textarea'}
        <textarea {hidden}
        class:error={$errors && $errors[identifier]}
        id={identifier}
        name={identifier}
        bind:value={$form[identifier]}
        on:input={(e) => change(e, false)}
        on:blur={(e) => change(e, true)}
        placeholder={placeholder || label}></textarea>
    {:else}
        <input {hidden}
            class:error={$errors && $errors[identifier]}
            {type}
            min={type === 'number' ? 1 : null}
            id={identifier}
            name={identifier}
            value={value || (form && $form[identifier])}
            on:input={(e) => change(e, false)}
            on:blur={(e) => change(e, true)}
            placeholder={placeholder || label}
        />
    {/if}
    {#if label}
        <label for={identifier}>{label}</label>
    {/if}
    {#if $errors && $errors[identifier]}
        <span>{$errors[identifier]}</span>
    {/if}
</template>

<style lang="scss">
    :--input {
        border: none;
        padding-left: 1rem;
        color: var(--text);

        &:placeholder-shown {
            & + label {
                z-index: 11;
            }
        }
        &:is(:focus, :not(:placeholder-shown)) {
            outline: none;

            + label {
                z-index: 9;
                top: -5rem;
                text-indent: 1.5rem;
                color: var(--text);
            }
        }
        &::placeholder {
            color: transparent;
        }
        &.error {
            border: 0.2rem solid var(--error);

            ~ span {
                top: -2.4rem;
            }
        }
    }
    textarea {
        padding: 1rem;
        font-size: 1rem;

        &::placeholder {
            color: var(--text2);
        }
    }
    label {
        position: relative;
        top: -2.8rem;
        text-indent: 1rem;
        width: 100%;
        color: var(--text2);
        cursor: text;
        user-select: none;
        transition: all 200ms ease;
    }
    span {
        background-color: var(--error);
        position: relative;
        right: 0;
        bottom: 0;
        color: var(--text);
        text-align: center;
        width: 100%;
    }
    @media(--large) {
        textarea {
            max-width: min(100vw, 50rem);
            min-width: 50rem;
        }
    }
    @media(--mobile) {
        textarea {
            max-width: 100vw;
            min-width: 100vw;
        }
    }
</style>
