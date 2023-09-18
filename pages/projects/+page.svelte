<script lang="ts">
    import { page } from '$app/stores'
    import Projects from '$/components/Projects.svelte'

    const { title, description } = $page.data.options.projects
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
</svelte:head>

<section>
    <header>
        <h3>Projects</h3>
    </header>
    <Projects/>
</section>

<style lang="scss">
    section {
        @extend %centerLayout;

        display: flex;
        flex-direction: column;
        gap: 2rem;

        header h3 {
            font-size: 2rem;
        }
    }
</style>
