<script lang="ts">
    import { options } from '$/stores'

    const { title, description } = $options.home
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}/>
</svelte:head>

<h1>Coming soon</h1>

<style lang="postcss">
    h1 {
        font-size: 2rem;
        color: var(--text);
    }
</style>
