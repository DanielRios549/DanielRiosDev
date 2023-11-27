<script lang="ts">
    import { page } from '$app/stores'
    import Lock from '$/icons/lock.svg'
    import Link from '$/icons/link.svg'
    import TechIcon from '$/components/TechIcon.svelte'

    $: images = $page.data.images
    $: projects = $page.data.projects
</script>

<section id="projects" class="wrapper">
    <header>
        <h2>Projects</h2>
    </header>
    <div class="content">
        {#each projects as {name, stack, repo, link, image}}
            {@const imageLink = image ? `${images}/projects/${image}` : '/images/project.jpg'}
            {@const techs = stack.replace(' ', '').split(',')}
            <article>
                <header>
                    <h3>{name}</h3>
                </header>
                <a href="/{name.replaceAll(' ', '-').toLowerCase()}" class="project-link">
                    <figure>
                        <figcaption>{name}</figcaption>
                        <img src={imageLink} alt="{name} Image">
                    </figure>
                </a>
                <div>
                    <div class="stack">
                        {#each techs as tech}
                            <TechIcon name={tech} icon={tech.toLowerCase().trim()}/>
                        {/each}
                        {#if techs.length > 4}
                            <TechIcon name="More" icon="plus"/>
                        {/if}
                    </div>
                    <span class="repo">
                        {#if repo}
                            <a href={repo} target="_blank" rel="noreferrer">
                                <span>Repo</span>
                            </a>
                        {:else}
                           <Lock/>
                        {/if}
                    </span>
                    {#if link}
                        <span class="link">
                            <a href={link} target="_blank" rel="noreferrer">
                                <span>View</span>
                                <Link/>
                            </a>
                        </span>
                    {/if}
                </div>

            </article>
        {/each}
    </div>
</section>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        :--heading {
            @extend %sectionHeader;
        }
        .content {
            $gap: 1rem;

            display: flex;
            gap: $gap;
            margin: 0 auto;

            :is(figcaption, article header) {
                display: none;
            }
            a {
                transition: opacity 200ms ease;

                &.project-link:hover {
                    opacity: 0.6;
                }
                figure {
                    view-transition-name: project-image;

                    &:not(:has(img)) {
                        background-color: var(--color1);
                    }
                    img {
                        @extend %imageCover;
                    }
                }
            }
            article {
                $height: 3rem;

                display: flex;
                flex-direction: column;
                gap: $gap;

                div {
                    display: flex;
                    gap: $gap;

                    span {
                        @extend %center;

                        height: $height;

                        :--svg {
                            --size: 1.5rem;
                        }
                        a {
                            @extend %center;

                            width: 100%;
                            height: $height;
                        }
                    }
                    .stack {
                        @extend %center;

                        height: $height;
                        color: var(--text);
                        gap: 0;

                        > :global {
                            *:not(:first-child) {
                                margin-left: -0.8rem;
                            }
                            *:nth-child(n+4) {
                                display: none;
                            }
                            *:last-child {
                                display: flex;
                            }
                        }
                    }
                    .repo {
                        color: var(--text);


                        :--svg {
                            --fill: var(--text);
                        }
                        a {
                            color: var(--text);
                        }
                    }
                    .link {
                        background-color: var(--highlight);

                        :--svg {
                            --fill: color: var(--text);
                        }

                        a {
                            color: var(--color2);
                        }
                    }
                }
            }
        }
    }
    @media (--large) {
        .wrapper .content {
            background-color: var(--color1);
            justify-content: center;
            flex-wrap: wrap;

            article {
                background-color: var(--color2);
                width: 25rem;
                padding: 1rem;

                figure {
                    width: 100%;
                    height: 12rem;
                }
                div {
                    justify-content: space-between;

                    .repo {
                        background-color: var(--color1);
                        width:7rem;
                    }
                    .link {
                        width: 10rem;
                    }
                }
            }
        }
    }
    @media (--mobile) {
        .wrapper .content {
            flex-direction: column;

            figure {
                width: 90vw;
                height: min(calc(90vw / 1.75), 20rem);
            }
            .stack {
                width: 20rem;
                margin: 0 auto;
            }
            div:not(.stack) {
                flex-direction: column;

                .repo {
                    background-color: var(--color2);
                }
            }
        }
    }
</style>
