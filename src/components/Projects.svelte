<script lang="ts">
    import { projects } from '$/stores'
</script>

<section>
    <header>
        <h2>Projects</h2>
    </header>
    {#each $projects as {name, stack, repo, link}}
        <article>
            <header>
                <h3>{name}</h3>
            </header>
            <span class="stack">{stack}</span>
            <span class="repo"><a href={repo} target="_blank" rel="noreferrer">Repo</a></span>
        </article>
    {/each}
</section>


<style lang="scss">
    section {
        @extend %centerLayout;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        article {
            border-radius: var(--radius);
            background-color: var(--color2);
            width: min(400px, 90vw);
            height: 200px;
            text-align: center;
            display: grid;

            grid-template:
                "image link" 50px
                "image ." 1fr
                "header repo" 50px
                "stack repo" min-content
                / 1fr 50px
            ;
            header {
                grid-area: header;
            }
            .stack {
                grid-area: stack;
            }
            .repo {
                grid-area: repo;
            }
        }
    }
</style>
