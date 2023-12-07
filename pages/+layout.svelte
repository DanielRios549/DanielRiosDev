<script lang="ts">
    import { invalidate, onNavigate } from '$app/navigation'
    import { browser } from '$app/environment'
    // import { page } from '$app/stores'
    import { onMount } from 'svelte'
    // import { wait } from '$/lib'
    import { theme } from '$/stores'
    import Header from '$/components/Header.svelte'
    import Menu from '$/components/Menu.svelte'
    import Chat from '$/components/Chat.svelte'

    export let data

    $: ({ auth, session } = data)

    onNavigate((navigating) => {
        // @ts-ignore
        if (!document.startViewTransition) {
            return undefined
        }

        return new Promise((resolve) => {
            // @ts-ignore
            document.startViewTransition(async () => {
                resolve()
                await navigating.complete
            })
        })
    })

    onMount(() => {
        // TODO: Fix ready = true not working inside onMount
        // await wait(100)

        // ready = true
        const { data } = auth.onAuthStateChange((_event, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth')
            }
        })

        return () => data.subscription.unsubscribe()
    })

    // $: ready = import.meta.env.DEV
    $: vh = 0

    $: if (browser) {
        document.body.style.setProperty('--vh', `${vh}px`)
        document.body.id = $theme
    }
</script>

<svelte:window bind:innerHeight={vh}/>

<template>
    <Header/>
    <Menu/>
    <main>
        {#if data.texts.warning}
            <dialog open>{data.texts.warning.content}</dialog>
        {/if}
        <slot/>
        <Chat/>
    </main>
</template>

<style lang="scss" global>
    /* stylelint-disable import-notation */
    @import "../styles/app";

    :root {
        view-transition-name: root;
    }
    ::view-transition-old,
    ::view-transition-new {
        animation-duration: 600ms;
    }
    #app {
        $header: 60px;
        $vh: var(--vh, 100vh);

        background-color: var(--color1);
        min-height: $vh;
        display: grid;
        place-content: center;
        font-size: 1em;
        grid-template:
            "header" $header
            "main" 1fr
            / 1fr
        ;
        > main {
            grid-area: main;
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 20px;

            > dialog {
                @extend %center;

                position: sticky;
                top: calc($header + 1rem);
                border: 2px solid var(--color1);
                background-color: var(--error);
                color: var(--text);
                height: 2rem;
                width: 95vw;
                margin: 0 auto;
                z-index: 12;
            }
        }
    }
</style>
