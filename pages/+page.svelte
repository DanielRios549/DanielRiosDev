<script lang="ts">
    import About from '$/components/About.svelte'
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
<About/>

<style lang="scss">
    figure {
        $from: #28039E;
        $to: #07034D;
        background: $from;
        background: linear-gradient(45deg, $from 0%, $to 100%);
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 240px);

        figcaption {
            padding: 0 50px;
            grid-column: 1/2;
            grid-row: 2/3;
            z-index: 10;

            @media (--mobileSmall) {
                grid-column: 1/3;

                h1 {
                    align-items: center !important;
                    text-align: center;
                }
            }
            h1 {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                font-size: clamp(2rem, 6vw, 4rem);
                color: var(--white);
                z-index: 10;
                height: 100%;

                span {
                    color: var(--highlight);
                }
            }
        }
        img {
            grid-column: 1/3;
            grid-row: 1/3;
            position: relative;
            height: 100%;
            width: clamp(360px, 100vw, 1440px);
            object-fit: cover;
            justify-self: center;
            z-index: 9;

            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                z-index: 9;
                display: block;
                height: 100%;
                width: 100%;
                @extend %transparency;
            }
        }
    }
</style>
