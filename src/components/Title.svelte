<script lang="ts">
    import type { Tag } from '$/types/generics'

    export let tag: Tag<HTMLHeadingElement> = 'h2'
</script>

<header>
    <svelte:element this={tag}>
        <slot/>
    </svelte:element>
</header>

<style lang="scss">
    @media (--mobile) {
        h2 {
            text-align: center;
        }
    }
</style>
