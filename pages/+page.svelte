<script lang="ts">
    import { page } from '$app/stores'
    import Text from '$/components/Text.svelte'

    const { title, description } = $page.data.options.home
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}/>
</svelte:head>

<section>
    <header>
        <h2><Text item={$page.data.texts.resume}/></h2>
    </header>
</section>

<style lang="scss">
    section {
        :--heading {
            color: blue
        }
    }
</style>
