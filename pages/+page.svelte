<script lang="ts">
    import { options } from '$/stores'

    const { title, description } = $options.home
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}/>
</svelte:head>

<figure>
    <figcaption>
        <h1>Hello,<br> my name is <span>Daniel</span></h1>
    </figcaption>
    <img src="banner.jpg" alt="Banner"/>
</figure>

<style lang="scss">
    figure {
        height: auto;
        width: 100vw;
        display: grid;

        figcaption {
            padding: 0 50px;
            grid-column: 1/3;
            grid-row: 1/3;
            z-index: 10;

            h1 {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                font-size: clamp(2rem, 6vw, 4rem);
                color: var(--white);
                height: 100%;

                span {
                    color: var(--highlight);
                }
            }
        }
        img {
            grid-column: 1/3;
            grid-row: 1/3;
            height: auto;
            width: 100vw;
            min-width: 500px;
            object-fit: contain;
            z-index: 9;

            &::before {
                content: "";
                position: absolute;
                height: 100%;
                width: 100%;
                @extend %transparency;
            }
        }
    }
</style>
