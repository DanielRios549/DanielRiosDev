<script lang="ts">
    import { page } from '$app/stores'
    import { login } from '$/lib/validations'
    import Form from '$/components/Form.svelte'
    import Input from '$/components/forms/Input.svelte'
    import type { z } from 'zod'

    const initialValues: z.infer<typeof login> = {
        email: '',
        password: ''
    }
</script>

<template>
    {#if $page.data?.session}
        <Form action="/logout" submitText="Logout">
            <legend>You are already logged in</legend>
        </Form>
    {:else}
        <Form action="/login" {initialValues} validationSchema={login} submitText="Login">
            <Input type="text" name="email" label="Email"/>
            <Input type="password" name="password" label="Password"/>
        </Form>
    {/if}
</template>

<style lang="scss">
    legend {
        font-size: 1.8rem;
        color: var(--text);
    }
</style>
