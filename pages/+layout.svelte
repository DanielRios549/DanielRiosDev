<script lang="ts">
    import { invalidate } from '$app/navigation'
    import { browser } from '$app/environment'
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    // import { wait } from '$/lib'
    import { theme } from '$/stores'
    import Header from '$/components/Header.svelte'
    import Menu from '$/components/Menu.svelte'

    export let data

    $: ({ auth, session } = data)

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
        <span>This project still in development.</span>
        <slot/>
    </main>
</template>

<style lang="scss" global>
    @use "../styles/app";

    #app {
        --header-color: var(--text);
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

            > span {
                @extend %center;

                background-color: var(--error);
                height: 2rem;
                width: 95vw;
                margin: 0 auto;
            }
        }
    }
</style>
