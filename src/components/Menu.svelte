<script lang="ts">
    import { menu } from '$/stores/config'

    const links = [
        ['/', 'Home'],
        ['/projects', 'Projects'],
        ['/contact', 'Contact']
    ]
</script>

<nav class:open={$menu}>
    <ul>
        {#each links as [link, name]}
            <li><a on:click={() => ($menu = !$menu)} href={link}>{name}</a></li>
        {/each}
    </ul>
</nav>

<style lang="postcss">
    nav {
        box-shadow: 5px 2px 20px rgba(#000000, 0.5);
        background-color: var(--color2);
        height: var(--vh, 100vh);
        position: absolute;
        top: 0;
        width: min(80vw, 350px);
        transition: left 200ms ease;

        .open {
            left: 0px;
        }
        &:not(.open) {
            left: -100%;
        }
        ul {
            display: flex;
            flex-direction: column;

            li {
                height: 60px;
                padding-left: 20px;

                a {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
</style>