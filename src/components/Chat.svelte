<script lang="ts">
    import { page } from '$app/stores'
    import { fly } from 'svelte/transition'
    import Chat from '$/icons/chat.svg'

    let open = false

    const openChat = () => {
        open = !open
    }
</script>

<template>
    <button on:click={openChat} class:open>
        <Chat/>
    </button>
    {#if open}
        <section class:open transition:fly={{ y: 10, x: 0, duration: 400 }}>
            <header>
                <h2>Messages</h2>
            </header>
            <ul>
                {#each $page.data.messages as message}
                    <li>{message.name}</li>
                {/each}
            </ul>
        </section>
    {/if}
</template>

<style lang="scss">
    $position: 1rem;
    $size: 3rem;

    %shadow {
        box-shadow: rgb(255 255 255 / 10%) 0 0.3rem 1rem, rgb(255 255 255 / 20%) 0 2px 12px;
    }
    button, section {
        background-color: var(--highlight);
        position: fixed;
        right: $position;
    }

    button {
        border-radius: 50%;
        bottom: $position;
        width: $size;
        height: $size;
        cursor: pointer;
        transition: scale 200ms ease;

        &:hover, &.open {
            @extend %shadow;

            scale: 1.1;
        }
        :--svg {
            --fill: var(--color3);
        }
    }
    section {
        @extend %shadow;

        bottom: calc($position + $size * 1.3);
        height: 30rem;
        width: 20rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        p {
            a {
                color: var(--text2);
                text-decoration: underline;
            }
        }
    }
</style>
