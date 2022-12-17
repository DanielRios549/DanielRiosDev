<script lang="ts">
    import { getText, options } from '$/stores'
    import Title from '$/components/Title.svelte'

    const text = getText('about')
    const title = $options.about.title
</script>

<section>
    <Title>{title}</Title>
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
        :global(header) {
            grid-area: header;
        }
        figure {
            grid-area: image;
            width: 200px;
        }
        p {
            grid-area: text;
            font-size: clamp(1.3rem, 3vw, 1.7rem);
        }
        button {
            border-radius: var(--radius);
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
