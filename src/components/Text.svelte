<script lang="ts">
    import type { Text } from '$/types'

    export let item: Text | string
    export let html: boolean | null = typeof item !== 'string' ? item?.html : false

    $: content = typeof item !== 'string' ? item.content : item
</script>

<template>
    {#if html}
        {@html content}
    {:else}
        {content}
    {/if}
</template>
