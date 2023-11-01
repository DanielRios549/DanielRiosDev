<script lang="ts">
    import { onMount } from 'svelte'

    export let name: string
    export let icon: string

    let file: any

    onMount(async () => {
        file = (await import(`$/icons/${icon}.svg`)).default
    })
</script>

<section>
    <header>
        <h3>{name}</h3>
    </header>
    <svelte:component class="colorized" this={file}/>
</section>

<style lang="scss">
    section {
        @extend %center;

        border-radius: 50%;
        border: 0.2rem solid var(--color1);
        background-color: var(--color2);
        position: relative;
        height: 2.5rem;
        width: 2.5rem;
        cursor: pointer;

        @for $i from 1 through 10 {
            &:nth-child(#{$i + 1}) {
                left: $i * -5%;
            }
        }
        &:hover > header {
            visibility: visible;
        }
        :--svg {
            --size: 1.5rem;
        }
        > header {
            position: absolute;
            display: block;
            visibility: hidden;
            border: 0.15rem solid var(--highlight);
            background-color: var(--color2);
            top: -3.5rem;
            left: -25%;
            padding: 0.5rem;

            &::after {
                content: '';
                position: absolute;
                top: 2.2rem;
                border: 1rem solid transparent;
                border-top-color: var(--highlight);
            }
            :--heading {
                font-size: 1rem;
            }
        }
    }
</style>
