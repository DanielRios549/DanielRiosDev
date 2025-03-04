<script lang="ts">
    import { page } from '$app/stores'
    import Chat from '$/components/Chat.svelte'
</script>

<template>
    <slot/>
    {#if $page.data.session}
        <Chat/>
    {/if}
</template>
