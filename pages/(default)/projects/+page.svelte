<script lang="ts">
    import { page } from '$app/stores'
    import Projects from '$/components/Projects.svelte'

    const { title, description } = $page.data.options.projects
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
</svelte:head>

<div>
    <Projects/>
</div>

<style lang="scss">
    div {
        @extend %centerLayout;

        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
</style>
