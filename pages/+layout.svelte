<script lang="ts">
    import { browser } from '$app/environment'
    import { onMount } from 'svelte'
    import { wait } from '$/lib'
    import { menu, theme, projects, options } from '$/stores'
    import Menu from '$/components/Menu.svelte'
    import type { Theme } from '$/types'
    import type { LayoutServerData } from './$types'

    const themes: Theme[] = ['light', 'dark']

    export let data: LayoutServerData

    $: {
        $projects = data.projects
        $options = data.options
    }

    const changeTheme = () => {
        const current = themes.findIndex((search) => search === $theme)

        if (current + 1 < themes.length) {
            $theme = themes[current + 1]
        }
        else {
            $theme = themes[0]
        }
    }

    $: ready = !import.meta.env.DEV
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
    <header>
        <h1>Page Header</h1>
        <Menu/>
        <button on:click={changeTheme}>Change</button>
        <button on:click={() => ($menu = !$menu)}>Open</button>
    </header>
    <main>
        <slot/>
    </main>
{/if}

<style lang="scss" global>
    @use "../styles/app.scss";
</style>
