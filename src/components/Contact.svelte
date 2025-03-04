<script lang="ts">
    import { contact } from '$lib/validations'
    import Form from '$/components/Form.svelte'
    import Input from '$/components/forms/Input.svelte'
    import type { z } from 'zod'

    const initialValues: z.infer<typeof contact> = {
        name: '',
        email: '',
        subject: '',
        message: ''
    }
</script>

<section id="contact" class="wrapper">
    <h2>Contact</h2>
    <Form action="/contact" {initialValues} validationSchema={contact}>
        <Input type="text" name="name" label="Name"/>
        <Input type="text" name="email" label="Email"/>
        <Input type="text" name="subject" label="Subject"/>

        <Input type="textarea" name="message" placeholder="Your Message"/>
    </Form>
</section>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        :--heading {
            @extend %sectionHeader;
        }
        :global {
            form {
                flex: 1 1 250px;
                padding: 1rem;

                textarea {
                    background-color: var(--color2);
                    width: 100%;
                    height: 20rem;
                }
            }
        }
    }
</style>