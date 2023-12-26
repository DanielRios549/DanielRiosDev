<script lang="ts">
    import Svelte from '$/icons/svelte.svg'
    import Typescript from '$/icons/typescript.svg'
    import Python from '$/icons/python.svg'
    import Node from '$/icons/nodejs.svg'
    import React from '$/icons/react.svg'
    import Prisma from '$/icons/prisma.svg'
    import Sass from '$/icons/sass.svg'
    import GraphQL from '$/icons/graphql.svg'

    // TODO: Get Icons dynamically like in TechIcon Component
    const technologies: Record<string, [string, number, typeof Svelte | null][]> = {
        'Front End': [
            ['Svelte', 90, Svelte],
            ['Typescript', 80, Typescript],
            ['Sass', 85, Sass],
            ['React', 40, React]
        ],
        'Back End': [
            ['Node', 60, Node],
            ['Python', 50, Python],
            ['Prisma', 60, Prisma],
            ['GraphQL', 40, GraphQL]
        ]
    }
</script>

<section class="wrapper">
    <header>
        <h2>Technologies</h2>
    </header>
    <div class="content">
        {#each Object.entries(technologies) as [name, items]}
            <section class="group">
                <header>
                    <h2>{name}</h2>
                </header>
                <div>
                    {#each items as [tech, percentage, icon]}
                        <section class="item">
                            <header>
                                <svelte:component class="colorized" this={icon}/>
                                <h3>{tech}</h3>
                            </header>
                            <progress max="100" value={percentage}>{percentage}%</progress>
                        </section>
                    {/each}
                </div>
            </section>
        {/each}
    </div>
</section>

<style lang="scss">
    .wrapper {
        background-color: var(--color2);
        display: flex;
        flex-direction: column;
        padding-block: 3rem;

        :--heading {
            @extend %sectionHeader;
        }
        .content {
            @extend %centerLayout;

            display: flex;
            justify-content: space-evenly;

            .group {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                :--heading {
                    font-size: 1.5rem;
                }
                > div {
                    background-color: var(--color1);
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;

                    .item {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;

                        header {
                            @extend %center;

                            flex-direction: column;
                            width: 5rem;
                            height: 5rem;

                            :--heading {
                                font-size: 1.2rem;
                            }
                            :--svg {
                                --size: 3.5rem;

                                flex-shrink: 0;
                            }
                        }
                        progress {
                            appearance: none;
                            width: 75%;

                            &::-webkit-progress-bar {
                                background-color: var(--color3);
                            }
                            &::-webkit-progress-value {
                                background-color: var(--highlight);
                            }
                        }
                    }
                }
            }
        }
    }
    @media (--large) {
        .wrapper .content .group {
            &:nth-child(1) .item progress {
                order: -1;
            }
            &:nth-child(2) .item progress {
                transform: rotate(-180deg);
            }
            > div {
                padding: 2rem;
            }
        }
    }
    @media (--desktop) {
        .wrapper .content .group {
            width: 30rem;
        }
    }
    @media (--tablet) {
        .wrapper .content .group {
            width: 20rem;
        }
    }
    @media (--mobile) {
        .wrapper {
            gap: 2rem;

            .content {
                flex-direction: column;
                width: min(25rem, 95vw);
                margin: 0 auto;
                gap: 1rem;

                .group {
                    width: 100%;

                    > div {
                        padding: 0.5rem;
                    }
                }
            }
        }
    }
</style>
