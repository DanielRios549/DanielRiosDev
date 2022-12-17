<script lang="ts">
    import { projects } from '$/stores'
    import Github from '$/icons/github.svg'
    import Link from '$/icons/link.svg'
</script>

<section>
    {#each $projects as {name, stack, repo, link, image}}
        <article>
            <header>
                <h3>{name}</h3>
            </header>
            {#if image}
                <figure>
                    <figcaption></figcaption>
                    <img src={image} alt="{name} Image">
                </figure>
            {/if}
            <span class="stack">{stack}</span>
            <span class="repo">
                <a href={repo} target="_blank" rel="noreferrer">
                    <Github/>
                    <span>Repo</span>
                </a>
            </span>
            {#if link}
                <span class="link">
                    <a href={link} target="_blank" rel="noreferrer">
                        <Link/>
                        <span>Link</span>
                    </a>
                </span>
            {/if}
        </article>
    {/each}
</section>


<style lang="scss">
    section {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;

        @media (--mobile) {
            justify-content: center;
        }
        article {
            border-radius: var(--radius);
            background-color: var(--color2);
            width: min(330px, 90vw);
            max-width: 330px;
            flex: 1 1 250px;
            text-align: center;
            display: grid;
            place-items: center;
            grid-template:
                "image link" 80px
                "image ." 120px
                "header repo" 50px
                "stack repo" 30px
                / 1fr 60px
            ;
            @media (--mobile) {
                figcaption {
                    backdrop-filter: blur(4px) opacity(1) !important;
                }
                .link {
                    opacity: 1 !important;
                }
            }
            @media (--mobileSmall) {
                grid-template:
                    "image link . " 200px
                    "image link ." 1fr
                    "header header header" 50px
                    "stack stack stack" min-content
                    "repo repo repo" 50px
                    / 1fr 200px 1fr
                ;
                .repo a {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .link {
                    :global {
                        svg {
                            --size: 64px;
                        }
                    }
                    span {
                        font-size: 2rem;
                    }
                }
            }
            &:hover {
                figcaption {
                    backdrop-filter: blur(4px) opacity(1);
                }
                .link {
                    opacity: 1;
                }
            }
            header {
                grid-area: header;
                z-index: 8;
            }
            figure {
                border-top-left-radius: var(--radius);
                border-top-right-radius: var(--radius);
                position: relative;
                width: 100%;
                height: 100%;
                grid-area: image;
                grid-column: 1/4;
                z-index: 7;
                display: flex;
                justify-content: center;
                overflow: hidden;

                figcaption {
                    background-color: rgba(0, 0, 0, 0.5);
                    box-shadow: inset 0px -10px 100px #000000;
                    backdrop-filter: blur(4px) opacity(0);
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    transition: backdrop-filter 500ms ease;
                }
                img {
                    width: max(100%, 500px);
                    height: 100%;
                    object-fit: cover;
                }
            }
            .stack {
                grid-area: stack;
                z-index: 8;
            }
            .repo {
                grid-area: repo;
                z-index: 8;
            }
            .link {
                opacity: 0;
                grid-area: link;
                transition: opacity 300ms linear;
                z-index: 8;

                a {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    :global {
                        svg path {
                            fill: var(--white) !important;
                        }
                    }
                    span {
                        color: var(--white) !important;
                    }
                }
            }
        }
    }
</style>
