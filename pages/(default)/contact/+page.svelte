<script lang="ts">
    import { page } from '$app/stores'
    import Contact from '$/components/Contact.svelte'

    const { title, description } = $page.data.options.contact
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}/>
</svelte:head>

<template>
    <Contact/>
</template>
