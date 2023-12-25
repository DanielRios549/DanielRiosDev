<script lang="ts">
    import { theme } from '$/stores'
    import Dark from '$/icons/dark.svg'
    import Light from '$/icons/light.svg'
    import type { Theme } from '$/types'

    const themes: Theme[] = ['light', 'dark']
    const icons = [Dark, Light]

    // TODO: Fix current icon always Sun (SSR)
    $: current = themes.findIndex((search) => search === $theme)
    $: icon = icons[current]

    const setTheme = () => {
        if (current + 1 < themes.length) {
            $theme = themes[current + 1]
        }
        else {
            $theme = themes[0]
        }
    }

    // TODO: Fix transition not working (invalid state)
    const changeTheme = (event: any) => {
        // @ts-ignore
        if (!document.startViewTransition) {
            setTheme()
            return
        }

        const left = event?.clientX ?? innerWidth / 2
        const top = event?.clientY ?? innerHeight / 2

        const radius = Math.hypot(
            Math.max(left, innerWidth - left),
            Math.max(top, innerHeight - top)
        )

        // @ts-ignore
        const transition = document.startViewTransition(() => {
            setTheme()
        })

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0 at ${left}px ${top}px)`,
                        `circle(${radius}px at ${left}px ${top}px)`
                    ]
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)'
                }
            )
        })
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

        :global(:--svg) {
            --fill: var(--icon);
        }
    }

    @media (--mobile) {
        button :global(:--svg) {
            --fill: var(--icon);
        }
    }
</style>
