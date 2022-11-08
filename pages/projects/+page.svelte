<script lang="ts">
    import { options, projects } from '$/stores'

    const { title, description } = $options.projects

</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}/>
</svelte:head>

<section>
    <header>
        <h3>Projects</h3>
    </header>
    {#each $projects as {name, stack}}
        <article>{name} - {stack}</article>
    {/each}
</section>

<style lang="postcss">
    section {
        border: 1px solid red
    }
</style>
