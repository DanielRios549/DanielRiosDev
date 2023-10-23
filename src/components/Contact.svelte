<script lang="ts">
    import * as yup from 'yup'
    import Form from '$/components/Form.svelte'
    import Input from '$/components/forms/Input.svelte'

    const initialValues = {
        name: '',
        email: '',
        subject: '',
        message: ''
    }
    const validationSchema = {
        name: yup.string().required('Name is Required'),
        email: yup.string().email('Type a valid Email, please').required('Email is Required'),
        subject: yup.string().required('Subject is Required'),
        message: yup.string().required('Message is Required')
    }
</script>

<section id="contact" class="wrapper">
    <h2>Contact</h2>
    <Form action="/contact" {initialValues} {validationSchema}>
        <Input type="text" name="name" label="Name"/>
        <Input type="text" name="email" label="Email"/>
        <Input type="text" name="subject" label="Subject"/>

        <Input type="textarea" name="message" label="Message"/>
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