<script lang="ts">
    import { page } from '$app/stores'
    import Banner from '$/components/Banner.svelte'
    import Technologies from '$/components/Technologies.svelte'
    import Projects from '$/components/Projects.svelte'
    import Contact from '$/components/Contact.svelte'

    const { title, description } = $page.data.options.home
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}/>
</svelte:head>

<template>
    <Banner/>
    <Technologies/>
    <Projects/>
    <Contact/>
</template>
