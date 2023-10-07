<script lang="ts">
    import { page } from '$app/stores'
    import Text from '$/components/Text.svelte'

    import Svelte from '$/icons/svelte.svg'
    import Typescript from '$/icons/typescript.svg'
    import Python from '$/icons/python.svg'
    import Node from '$/icons/nodejs.svg'
    import React from '$/icons/react.svg'

    const icons: [number, number, typeof Svelte][] = [
        [0, 10, Svelte],
        [10, 40, Typescript],
        [50, 20, Python],
        [80, 5, Node],
        [80, 45, React]
    ]
</script>

<section>
    <header>
        <Text item={$page.data.texts.resume}/>
    </header>
    <span><Text item={$page.data.texts.about}/></span>

    {#each icons as [top, left, icon]}
        <svelte:component class="colorized" this={icon} style="--top:{top}%;--left:{left}%;"/>
    {/each}
</section>

<style lang="scss">
    section {
        position: relative;
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-inline: 10%;
        gap: 3rem;

        header {
            :global(:--heading) {
                color: var(--text) !important;
                line-height: 4rem;
            }
            :global(:--text) {
                color: var(--highlight);
                font-size: 4rem;
            }
        }
        > span {
            color: var(--text);
            font-size: 2em;
        }
        :--svg {
            --size: 100px;

            position: absolute;
            top: var(--top);
            left: calc(45% + var(--left));
        }
    }
    @media (--large) {
        section span {
            width: 40%;
        }
    }
    @media (--mobileLarge) {
        section :global(:--text) {
            width: 60vw;
        }
    }
    @media (--mobileSmall) {
        section :global(:--text) {
            width: 90vw;
        }
    }
    @media (--mobile) {
        section {
            padding: 0;
            align-items: center;

            :global(:--text) {
                text-align: center;
            }
            :--svg {
                display: none;
            }
        }
    }
</style>
