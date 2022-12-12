<script lang="ts">
    import { page } from '$app/stores'
    import { menu } from '$/stores/config'
    import { getMenu } from '$/stores/menus'

    const links = getMenu('header')

    $: current = $page.url.pathname
</script>

<nav class:open={$menu}>
    <ul>
        {#each links as [link, name]}
            <li class:active={current === link}>
                <a on:click={() => ($menu = false)} href={link}>{name}</a>
            </li>
        {/each}
    </ul>
</nav>

<style lang="scss">
    @media (--large) {
        $color: var(--headerColor, var(--text));

        nav {
            grid-area: header;
            position: sticky;
            top: 0;

            ul {
                flex-direction: row;
                column-gap: 10px;

                li {
                    position: relative;

                    a:hover::after,
                    &.active a::after {
                        width: 100%;
                    }
                    a {
                        width: 100px;
                        justify-content: center;
                        color: $color;

                        &::after {
                            content: "";
                            background-color: $color;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            height: 3px;
                            width: 0;
                            transition: width 200ms ease;
                        }
                    }
                }
            }
        }
    }
    @media (--mobile) {
        nav {
            background-color: var(--color1);
            position: fixed;
            top: 60px;
            width: 100vw;
            height: 100vh;
            justify-content: center;
            z-index: 9;

            &:not(.open) {
                top: -100%;
                height: 0;
            }
            ul {
                flex-direction: column;
                gap: 2px;
                width: min(300px, 70vw);

                li {
                    padding-left: 20px;

                    &:not(:last-child) {
                        border-bottom: 2px solid var(--color2);
                    }
                    a {
                        color: var(--text);
                    }
                }
            }
        }
    }
    nav {
        transition: top 200ms ease;
        display: flex;
        justify-self: flex-end;
        z-index: 11;

        ul {
            display: flex;
            height: auto;

            li {
                height: 60px;

                a {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
</style>
