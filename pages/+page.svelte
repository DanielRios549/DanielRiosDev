<script lang="ts">
    import { page } from '$app/stores'
    import Banner from '$/components/Banner.svelte'

    const { title, description } = $page.data.options.home
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}/>
</svelte:head>

<template>
    <Banner/>
</template>

<style lang="scss">

</style>
