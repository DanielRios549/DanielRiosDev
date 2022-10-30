<script lang="ts">
    import { menu, theme } from '$/stores'
    import type { Theme } from '$/types'

    const themes: Theme[] = ['light', 'dark']

    const changeTheme = () => {
        const current = themes.findIndex((search) => search === $theme)

        if (current + 1 < themes.length) {
            $theme = themes[current + 1]
        }
        else {
            $theme = themes[0]
        }
    }
</script>

<header>
    <h1>Page Header</h1>
    <button on:click={changeTheme}>Change</button>
    <button on:click={() => ($menu = !$menu)}  class:open={$menu}>
        <span></span>
        <span></span>
        <span></span>
    </button>
</header>

<style lang="postcss">
    header {
        grid-area: header;
        display: flex;
        justify-content: space-between;
        z-index: 11;

        button {
            @extend %center;

            @media (--desktop) {
                display: none !important;
            }
            @media (--touch) {
                width: 60px;
                flex-direction: column;
                align-items: flex-end;
                gap: 7px;
                padding: 10px;

                &.open {
                    span:nth-of-type(1) {
                        top: 25%;
                        width: 80%;
                        transform: rotate(135deg);
                    }
                    span:nth-of-type(2) {
                        top: 0;
                        width: 80%;
                        transform: rotate(45deg);
                    }
                    span:nth-of-type(3) {
                        opacity: 0;
                    }
                }
                span {
                    position: relative;
                    border-radius: 10px;
                    background-color: var(--text);
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
