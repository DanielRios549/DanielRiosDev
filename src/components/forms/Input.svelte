<script lang="ts">
    import { formContext } from '$/lib/contexts'

    const { errors } = formContext() || {}

    export let type: 'number' | 'text' | 'password' | 'textarea' = 'text'
    export let hidden: boolean = false
    export let name: string
    export let label: string = ''
    export let placeholder: string = ''

    const identifier = name.replaceAll(' ', '-').toLowerCase().trim()
</script>

<template>
    {#if type === 'textarea'}
        <textarea {hidden}
        class:error={$errors && $errors[identifier]}
        id={identifier}
        name={identifier}
        placeholder={placeholder || label}></textarea>
    {:else}
        <input {hidden} {type}
            class:error={$errors && $errors[identifier]}
            min={type === 'number' ? 1 : null}
            id={identifier}
            name={identifier}
            placeholder={placeholder || label}
        />
    {/if}
    {#if label}
        <label for={identifier}>{label}</label>
    {/if}
    {#if $errors && $errors[identifier]}
        <span>{$errors[identifier][0]}</span>
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
