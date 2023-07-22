<script lang="ts">
    import { page } from '$app/stores'
    import { enhance } from '$app/forms'
</script>

<template>
    {#if $page.data.session}
        <form action="?/logout" method="POST" use:enhance>
            <legend>You are already logged in</legend>
            <button type="submit">Logout</button>
        </form>
    {:else}
        <form action="?/login" method="POST" use:enhance>
            <input type="text" name="email" id="email" value="test@test.com">
            <input type="password" name="password" id="password" value="12345">

            <button type="submit">Login</button>
        </form>
    {/if}
</template>

<style lang="scss">
    form {
        @extend %center;

        flex-direction: column;
        gap: 20px;
        margin: auto;
        width: min(100vw, 350px);

        legend {
            font-size: 1.8rem;
            color: var(--text);
        }
        input {
            background-color: var(--color2);
            width: 100%;
        }
        button[type="submit"] {
            background-color: var(--color3);
            color: var(--text);
            width: 100%;
            height: 50px;
        }
    }
</style>
