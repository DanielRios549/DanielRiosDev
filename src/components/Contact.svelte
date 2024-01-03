<script lang="ts">
    import { z } from 'zod'
    import Form from '$/components/Form.svelte'
    import Input from '$/components/forms/Input.svelte'

    const initialValues = {
        name: '',
        email: '',
        subject: '',
        message: ''
    }
    const validationSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().min(1, 'Email is required').email('Type a valid Email, please'),
        subject: z.string().min(1, 'Subject is required'),
        message: z.string().min(1, 'Message is required')
    })
</script>

<section id="contact" class="wrapper">
    <h2>Contact</h2>
    <Form action="/contact" {initialValues} {validationSchema}>
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

                textarea {
                    background-color: var(--color2);
                    width: 100%;
                    height: 20rem;
                }
            }
        }
    }
</style>