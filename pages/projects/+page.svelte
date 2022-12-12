<script lang="ts">
    import { options } from '$/stores'
    import Projects from '$/components/Projects.svelte'

    const { title, description } = $options.projects
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
</svelte:head>

<section>
    <header>
        <h3>Projects</h3>
        <Projects/>
    </header>
</section>

<style lang="scss">
    section {
        @extend %centerLayout;
    }
</style>
