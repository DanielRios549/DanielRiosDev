<script lang="ts">
    import { invalidate } from '$app/navigation'
    import { browser } from '$app/environment'
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    // import { wait } from '$/lib'
    import { theme, projects, options, menus, texts, images } from '$/stores'
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

    $: {
        $images = data.images
        $projects = data.projects
        $options = data.options
        $texts = data.texts
        $menus = data.menus
    }

    $: mixed = $page.url.pathname === '/'
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
    <main class:mixed>
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
        // @supports (body:has()) {
            &:has(main:not(.mixed)) {
                --header-color: var(--text);
            }
            &:has(main.mixed) {
                --header-color: var(--white);
            }
        // }
        > main {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 20px;

            &:not(.mixed) {
                grid-area: main;
            }
            &.mixed {
                grid-area: header/main;
                grid-row: 1/3;
            }
        }
    }
</style>
