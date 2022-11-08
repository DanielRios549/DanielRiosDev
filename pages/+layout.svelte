<script lang="ts">
    import { browser } from '$app/environment'
    import { onMount } from 'svelte'
    import { wait } from '$/lib'
    import { theme, projects, options, menus } from '$/stores'
    import Header from '$/components/Header.svelte'
    import Menu from '$/components/Menu.svelte'
    import type { LayoutServerData } from './$types'

    export let data: LayoutServerData

    $: {
        $projects = data.projects
        $options = data.options
        $menus = data.menus
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
    <Header/>
    <Menu/>
    <main>
        <slot/>
    </main>
{/if}

<style lang="scss" global>
    @use "../styles/app";
</style>
