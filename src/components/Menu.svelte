<script lang="ts">
    import { page } from '$app/stores'
    import { menu } from '$/stores/config'
    import { getMenu } from '$/stores/menus'
    import ThemeSwitcher from '$/components/ThemeSwitcher.svelte'

    import Link from '$/icons/link.svg'

    const links = getMenu('header')

    $: current = $page.url.pathname
</script>

<section class:open={$menu}>
    {#if import.meta.env.DEV}
        <ThemeSwitcher/>
    {/if}
    <nav>
        <ul>
            {#each links as [link, name]}
                <li class:active={current === link}>
                    <a on:click={() => ($menu = false)} href={link}>
                        {name}
                        {#if !link.startsWith('/')}
                            <Link/>
                        {/if}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
    {#if $page.data.session}
        <span>{$page.data.info?.name || $page.data.session.user.email}</span>
    {/if}
</section>

<style lang="scss">
    @media (--large) {
        $color: var(--header-color, var(--text));

        section {
            grid-area: header;
            position: sticky;
            top: 0;
            display: flex;
            align-items: center;
            gap: 20px;

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
                        min-width: 6rem;
                        justify-content: center;
                        color: $color;
                        height: 100%;
                        gap: 1rem;
                        padding: 0 1rem;

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
                        :global {
                            svg {
                                path {
                                    fill: var(--header-color) !important;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    @media (--mobile) {
        section {
            background-color: var(--color1);
            position: fixed;
            top: 60px;
            width: 100vw;
            height: 100vh;
            align-items: center;
            flex-direction: column;
            z-index: 9;

            &:not(.open) {
                top: -100%;
                height: 0;
            }
            nav {
                // display: inline;
                // order: 1;

                ul {
                    flex-direction: column;
                    gap: 2px;
                    width: min(300px, 70vw);

                    li {
                        padding: 0 20px;

                        &:not(:last-child) {
                            border-bottom: 2px solid var(--color2);
                        }
                        a {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            color: var(--text);
                            height: 100%;
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
    section {
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
