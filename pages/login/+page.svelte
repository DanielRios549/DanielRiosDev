<script lang="ts">
    import * as yup from 'yup'
    import { page } from '$app/stores'
    import Form from '$/components/Form.svelte'
    import Input from '$/components/forms/Input.svelte'

    const initialValues = {
        email: '',
        password: ''
    }
    const validationSchema = {
        email: yup.string().email('Type a valid Email, please').required('Email is Required'),
        password: yup.string().required('Password is Required').min(5, 'Password too shot')
    }
</script>

<template>
    {#if $page.data.session}
        <Form action="/login?/logout" submitText="Logout">
            <legend>You are already logged in</legend>
        </Form>
    {:else}
        <Form action="/login?/login" {initialValues} {validationSchema} submitText="Login">
            <Input type="text" name="email" label="Email"/>
            <Input type="text" name="password" label="Password"/>
        </Form>
    {/if}
</template>

<style lang="scss">
    legend {
        font-size: 1.8rem;
        color: var(--text);
    }
</style>
