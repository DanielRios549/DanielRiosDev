<script lang="ts">
    import { menu } from '$/stores/config'
    import { getMenu } from '$/stores/menus'

    const links = getMenu('header')
</script>

<nav class:open={$menu}>
    <ul>
        {#each links as [link, name]}
            <li><a on:click={() => ($menu = !$menu)} href={link}>{name}</a></li>
        {/each}
    </ul>
</nav>

<style lang="postcss">
    @media (--desktop) {
        nav {
            grid-area: menu;
            position: relative;
            justify-content: flex-end;

            ul {
                flex-direction: row;
                column-gap: 10px;

                li {
                    position: relative;

                    a {
                        width: 100px;
                        justify-content: center;

                        &:hover::after {
                            width: 100%;
                        }
                        &::after {
                            content: "";
                            background-color: var(--text);
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
    @media (--touch) {
        nav {
            position: absolute;
            top: 60px;
            width: 100vw;
            justify-content: center;

            &:not(.open) {
                top: -100%;
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
                }
            }
        }
    }
    nav {
        background-color: var(--color1);
        transition: top 200ms ease;
        display: flex;
        z-index: 10;

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
