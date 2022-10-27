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
        background-color: var(--color1);
        height: var(--vh, 100vh);
        position: absolute;
        top: 60px;
        width: 100vw;
        transition: top 200ms ease;
        display: flex;
        justify-content: center;
        z-index: 10;

        &:not(.open) {
            top: -100%;
        }
        ul {
            display: flex;
            gap: 2px;
            flex-direction: column;
            width: min(300px, 70vw);
            height: auto;

            li {
                height: 60px;
                padding-left: 20px;

                &:not(:last-child) {
                    border-bottom: 2px solid var(--color2);
                }
                a {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
</style>