<script lang="ts">
    import { getText, options } from '$/stores'

    const text = getText('about')
    const title = $options.about.title
</script>

<section>
    <header>
        <h2>{title}</h2>
    </header>
    <figure>
        <figcaption>
            <span>Image</span>
        </figcaption>
    </figure>
    <p>{text}</p>
    <button><span>Contact</span></button>
</section>

<style lang="scss">
    section {
        @extend %centerLayout;
        display: grid;
        gap: 10px;
        grid-template:
            "image header" 30px
            "image text" 1fr
            "image footer" 40px
            / min-content 1fr
        ;

        @media (--mobileSmall) {
            place-items: center;
            text-align: center;
            grid-template:
                "header" 30px
                "image" 50px
                "text" 1fr
                "footer" 40px
                / 1fr
            ;
        }
        header {
            grid-area: header;
        }
        figure {
            grid-area: image;
            width: 200px;
        }
        p {
            grid-area: text;
            font-size: clamp(1.3rem, 3vw, 2rem);
        }
        button {
            grid-area: footer;
            background-color: var(--highlight);
            width: 200px;
            align-self: stretch;

            span{
                color: var(--black);
                font-size: 1.2rem;
            }
        }
    }
</style>
