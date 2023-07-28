<script lang="ts">
    import { theme } from '$/stores'
    import Dark from '$/icons/dark.svg'
    import Light from '$/icons/light.svg'
    import type { Theme } from '$/types'

    const themes: Theme[] = ['light', 'dark']
    const icons = [Dark, Light]

    $: current = themes.findIndex((search) => search === $theme)
    $: icon = icons[current]

    const changeTheme = () => {
        if (current + 1 < themes.length) {
            $theme = themes[current + 1]
        }
        else {
            $theme = themes[0]
        }
    }
</script>

<button on:click={changeTheme} aria-label="theme-switcher">
    <svelte:component this={icon}/>
</button>

<style lang="scss">
    button {
        background-color: transparent;
        $size: 40px;

        border-radius: 50%;
        width: $size;
        height: $size;

        :global {
            svg path {
                fill: var(--header-color, var(--icon)) !important;

                @media (--mobile) {
                    fill: var(--icon) !important;
                }
            }
        }
    }
</style>
