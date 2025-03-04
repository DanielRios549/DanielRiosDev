<script lang="ts">
    import { page } from '$app/stores'
    import { menu as menuStatus } from '$/stores/config'
    import ThemeSwitcher from '$/components/ThemeSwitcher.svelte'

    import LinkedIn from '$/icons/linkedin.svg'
    import Github from '$/icons/github.svg'

    const links: [string, string][] = [
        [
            '/',
            'Home'
        ],
        [
            '/projects',
            'Projects'
        ],
        [
            '/contact',
            'Contact'
        ]
    ]
    const social: [string, string, typeof LinkedIn][] = [
        [
            'https://www.linkedin.com/in/danielrios549',
            'LinkedIn',
            LinkedIn
        ],
        [
            'https://github.com/DanielRios549',
            'Github',
            Github
        ]
    ]

    const navClick = () => {
        $menuStatus = false
    }

    $: current = $page.url.pathname
</script>

<div class:open={$menuStatus} class="wrapper">
    <nav>
        <ul>
            {#each links as [link, name]}
                <li class:active={current === link}>
                    <a on:click={navClick} href={link}>
                        {name}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
    <menu>
        {#each social as [link, name, icon]}
            <li>
                <a href={link} target="_blank" aria-label="{name} link">
                    <svelte:component this={icon}/>
                    <span>{name}</span>
                </a>
            </li>
        {/each}
    </menu>
    <ThemeSwitcher/>
    {#if $page.data.session}
        <section>
            <header>
                <h2>{$page.data.info?.name || $page.data.session.user.email}</h2>
            </header>
            <figure>
                <img src="{$page.data.images}/{$page.data.info.image}" alt="profile">
            </figure>
        </section>
    {/if}
</div>

<style lang="scss">
    .wrapper {
        transition: top 200ms ease;
        display: flex;
        justify-self: flex-end;
        z-index: 11;

        :is(ul, menu) {
            display: flex;
            height: auto;

            li {
                height: 60px;

                :is(a:hover, &.active a) {
                    color: var(--highlight);
                }
                a {
                    display: flex;
                    align-items: center;
                }
            }
        }
        menu li a {
            gap: 1rem;

            :--svg {
                --size: 2rem;
            }
        }
        section {
            padding-right: 15px;
            display: flex;
            gap: 1rem;

            header {
                h2 {
                    color: var(--text)
                }
            }
            figure {
                order: -1;
                width: 2rem;
                height: 2rem;

                img {
                    @extend %imageCover;
                }
            }
        }
    }
    @media (--desktop) {
        .wrapper {
            width: 50vw;
            justify-content: space-between;
        }
    }
    @media (--tablet) {
        .wrapper menu li {
            width: 4rem;

            a {
                position: relative;

                span {
                    display: none;
                }
            }
        }
    }
    @media (--large) {
        $color: var(--text);

        .wrapper {
            grid-area: header;
            position: sticky;
            top: 0;
            display: flex;
            align-items: center;
            gap: 20px;

            :is(ul, menu) {
                flex-direction: row;
                column-gap: 10px;

                li {
                    position: relative;

                    a {
                        justify-content: center;
                        color: $color;
                        height: 100%;
                        gap: 1rem;
                        padding: 0 1rem;
                    }
                }
            }
        }
    }
    @media (--mobile) {
        .wrapper {
            background-color: var(--color1);
            position: fixed;
            top: 60px;
            width: 100vw;
            height: 100vh;
            align-items: center;
            flex-direction: column;
            z-index: 13;
            gap: 5rem;

            &:not(.open) {
                top: -200%;
                height: 0;
            }
            ul {
                flex-direction: column;

                li:not(:last-child) {
                    border-bottom: 2px solid var(--color2);
                }
            }
            :is(ul, menu) {
                gap: 2px;
                width: min(300px, 70vw);
                flex-wrap: wrap;

                li {
                    a {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: var(--text);
                        height: 100%;
                        width: 100%;
                        padding: 0 20px;
                    }
                }
            }
        }
    }
</style>
