<script lang="ts">
    import { page } from '$app/stores'
    import { afterNavigate, beforeNavigate } from '$app/navigation'
    import { projectName } from '$/lib'
    import { setupTransitions } from '$/components/Projects.svelte'
    import TechIcon from '$/components/TechIcon.svelte'

    export let data

    const link = $page.url.pathname.replaceAll('/', '')

    $: project = data.projects.find((project) => {
        return project.name?.toLowerCase() === projectName(link)
    })

    beforeNavigate(() => {
        setupTransitions('project', 'div.slider > figure:first-child', 'div.stack', link)
    })

    afterNavigate(() => {
        setupTransitions('project', 'div.slider > figure:first-child', 'div.stack', link)
    })
</script>

<section id="project-{link}" class="wrapper">
    <header>
        <h1>{project?.name}</h1>
        <div class="stack">
            {#each project?.stack.replace(' ', '').split(',') as tech}
                <TechIcon name={tech} icon={tech.toLowerCase().trim()}/>
            {/each}
        </div>
    </header>
    <div class="slider">
        {#each data.projectImages as image}
            {#if !image.name.startsWith('.')}
                <figure>
                    <img src="{data.images}/projects/{link}/{image.name}" alt="project">
                </figure>
            {/if}
        {:else}
            <figure>
                <img src="/images/project.jpg" alt="project">
            </figure>
        {/each}
    </div>
</section>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        header {
            @extend %centerLayout;

            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 3rem;
            padding-inline: 3rem;
            color: var(--text);

            div {
                display: flex
            }
        }
        .slider {
            @extend %centerLayout;

            display: flex;
            gap: 1rem;
            padding: 1rem 5rem;
            margin: 0 auto;
            max-width: 100dvw;
            overflow: auto hidden;

            figure {
                --width: 40rem;

                width: var(--width);
                height: calc(var(--width) / 1.76);
                flex-shrink: 0;

                img {
                    @extend %imageCover;
                }
            }
        }
    }
</style>