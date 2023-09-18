<script lang="ts">
    import type { getText } from '$/stores/texts'

    export let item: ReturnType<typeof getText>
</script>

<template>
    {#if item[1]}
        {@html item[0]}
    {:else}
        {item[0]}
    {/if}

</template>
