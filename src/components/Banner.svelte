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
    <span>
        <Text item={$page.data.texts.about}/>
    </span>
    {#each icons as [top, left, icon], index}
        <svelte:component class="colorized" this={icon} style="--top:{top}%;--left:{left}%;--delay:{index}s"/>
    {/each}
</section>

<style lang="scss">
    @keyframes icon-move {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(var(--left), calc(var(--left) - var(--top)));
        }
    }
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
            animation: icon-move 10s ease var(--delay) infinite alternate;
        }
    }
    @media (--large) {
        section {
            header :global(:--text) {
                font-size: 4rem;
            }
            span {
                width: 40%;
            }
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

            header :global(:--text) {
                font-size: clamp(1vw, 2.5rem, 3rem);
            }
            :global(:--text) {
                text-align: center;
            }
            :--svg {
                display: none;
            }
        }
    }
</style>
