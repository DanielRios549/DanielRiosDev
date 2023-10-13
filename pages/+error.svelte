<script lang="ts">
    import { page } from '$app/stores'
</script>

<section>
    <header>
        <h1>{$page.status}: {$page.error?.message}</h1>
    </header>
</section>

<style lang="scss">
    section {
        @extend %center;

        color: var(--text);
        font-size: 2rem;
        height: 100%;
    }
</style>
