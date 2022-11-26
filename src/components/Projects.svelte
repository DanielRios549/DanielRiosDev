<script lang="ts">
    import { projects } from '$/stores'
    import Github from '$/icons/github.svg'
    import Link from '$/icons/link.svg'

    export let header: boolean = false
</script>

<section>
    {#if header}
        <header>
            <h2>Projects</h2>
        </header>
    {/if}
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
        @extend %centerLayout;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 10px;

        article {
            border-radius: var(--radius);
            background-color: var(--color2);
            width: min(400px, 90vw);
            text-align: center;
            display: grid;
            place-items: center;

            &:hover {
                figcaption {
                    backdrop-filter: blur(4px) opacity(1);
                }
                .link {
                    display: flex;
                }
            }
            grid-template:
                "image link" 50px
                "image ." 120px
                "header repo" 50px
                "stack repo" 30px
                / 1fr 50px
            ;
            // @media (--mobileSmall) {
            //     grid-template:
            //         "image link" 50px
            //         "image ." 1fr
            //         "header ." 50px
            //         "stack ." min-content
            //         "repo ." 50px
            //         / 1fr 50px
            //     ;
            // }
            header {
                grid-area: header;
                z-index: 8;
            }
            figure {
                position: relative;
                width: 100%;
                height: 100%;
                grid-area: image;
                grid-column: 1/3;
                z-index: 7;
                display: flex;
                align-self: center;
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
                    width: 100%;
                    height: auto;
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
                display: none;
                grid-area: link;
                z-index: 8;
            }
        }
    }
</style>
