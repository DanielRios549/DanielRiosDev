<script lang="ts">
    import { browser } from '$app/environment'
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    import { wait } from '$/lib'
    import { theme, projects, options, menus, texts } from '$/stores'
    import Header from '$/components/Header.svelte'
    import Menu from '$/components/Menu.svelte'
    import type { LayoutServerData } from './$types'

    export let data: LayoutServerData

    $: {
        $projects = data.projects
        $options = data.options
        $texts = data.texts
        $menus = data.menus
    }

    $: mixed = $page.url.pathname === '/'
    $: ready = import.meta.env.DEV
    $: vh = 0

    $: if (browser) {
        document.body.style.setProperty('--vh', `${vh}px`)
        document.body.id = $theme
    }

    onMount(async () => {
        await wait(100)

        ready = true
    })
</script>

<svelte:window bind:innerHeight={vh}/>

{#if ready}
    <Header/>
    <Menu/>
    <main class:mixed>
        <slot/>
    </main>
{/if}

<style lang="scss" global>
    @use "../styles/app";

    #app {
        --header-color: var(--text);
        $header: 60px;
        $vh: var(--vh, 100vh);

        background-color: var(--color1);
        min-height: $vh;
        margin-bottom: 20px;
        display: grid;
        place-content: center;
        font-size: 1em;
        grid-template:
            "header" $header
            "main" 1fr
            / 1fr
        ;
        &:has(main:not(.mixed)) {
            --header-color: var(--text);
        }
        &:has(main.mixed) {
            --header-color: var(--white);
        }
        > main {
            display: flex;
            flex-direction: column;
            gap: 20px;

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
