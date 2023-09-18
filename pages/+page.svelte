<script lang="ts">
    import { page } from '$app/stores'

    const { title, description } = $page.data.options.home
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}/>
</svelte:head>

<template>
    <span>This project still in development.</span>
</template>

<style lang="scss">
    span {
        @extend %center;

        background-color: var(--error);
        height: 2rem;
        width: 95vw;
        margin: 0 auto;
    }
</style>
