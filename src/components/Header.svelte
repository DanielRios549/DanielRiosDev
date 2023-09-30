<script lang="ts">
    import { browser } from '$app/environment'
    import { page } from '$app/stores'
    import { menu } from '$/stores'
    import Text from '$/components/Text.svelte'

    let scroll = 0

    $: if (browser) {
        document.body.style.overflowY = $menu ? 'hidden' : 'auto'
    }
</script>

<svelte:window bind:scrollY={scroll}/>

<header class:menu={$menu} class:pinned={scroll > 50}>
    <h1><Text item={$page.data.texts.header}/></h1>
    <button on:click={() => ($menu = !$menu)}  class:open={$menu} aria-label="menu-toggle">
        <hr/>
        <hr/>
        <hr/>
    </button>
</header>

<style lang="scss">
    header {
        position: sticky;
        top: 0;
        grid-area: header;
        display: flex;
        align-items: center;
        z-index: 11;
        transition: all 200ms ease;

        @media(--mobile) {
            justify-content: space-between;

            &.menu {
                background-color: var(--color1);

                button > hr {
                    background-color: var(--text);
                }
                h1 {
                    color: var(--text);
                }
            }
        }
        &.pinned {
            @extend %transparency;
        }
        h1 {
            padding-left: 15px;
            font-size: clamp(1.2rem, 6vw, 2rem);
            color: var(--header-color, var(--text));
        }
        button {
            @extend %center;

            background-color: transparent;
            align-self: stretch;

            @media (--mobile) {
                width: 60px;
                flex-direction: column;
                align-items: flex-end;
                gap: 7px;
                padding: 10px;

                &.open {
                    hr:nth-of-type(1) {
                        top: 25%;
                        width: 80%;
                        transform: rotate(135deg);
                    }
                    hr:nth-of-type(2) {
                        top: 0;
                        width: 80%;
                        transform: rotate(45deg);
                    }
                    hr:nth-of-type(3) {
                        opacity: 0;
                    }
                }
                hr {
                    position: relative;
                    border-radius: 10px;
                    background-color: var(--header-color, var(--white));
                    display: block;
                    height: 3px;
                    transition: transform 200ms ease;

                    &:nth-of-type(1) {
                        width: 50%;
                    }
                    &:nth-of-type(2) {
                        width: 80%;
                    }
                    &:nth-of-type(3) {
                        width: 40%;
                    }
                }
            }
        }
    }
</style>
