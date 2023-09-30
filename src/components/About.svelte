<script lang="ts">
    import { page } from '$app/stores'
    import { getMenu } from '$/stores'
    import Title from '$/components/Title.svelte'
    import Text from '$/components/Text.svelte'

    const links = getMenu('header')
    const { title } = $page.data.options.about

    const email = links.find((item) => {
        return item[1] === 'Contact'
    })?.at(0)
</script>

<section>
    <Title>{title}</Title>
    <figure>
        <figcaption>
            <img src="{$page.data.images}/info/me.jpg" alt="daniel_rios_image">
        </figcaption>
    </figure>
    <p>
        <Text item={$page.data.texts.about}/>
    </p>
    <a href={email}>
        <span>Contact</span>
    </a>
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
                "image" 350px
                "text" 1fr
                "footer" 40px
                / 1fr
            ;
        }
        :global {
            header {
                grid-area: header;
            }
            a:hover {
                text-decoration: underline;
                width: auto;
            }
        }
        figure {
            grid-area: image;
            width: 200px;

            img {
                width: 100%;
                border-radius: var(--radius);
            }
        }
        p {
            grid-area: text;
            font-size: clamp(1.3rem, 3vw, 1.7rem);
        }
        a {
            @extend %center;

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
