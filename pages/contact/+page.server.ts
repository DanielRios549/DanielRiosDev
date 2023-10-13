import { createTransport } from 'nodemailer'
import { fail } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

export const actions = {
    email: async ({ request }) => {
        const data = Object.fromEntries<string>(await request.formData() as any)

        const transporter = createTransport({
            host: env.TRANSPORT_HOST,
            secure: true,
            port: 465,
            auth: {
                user: env.TRANSPORT_USER,
                pass: env.TRANSPORT_PASSWORD
            }
        })

        // To the one who contact me
        const confirmation = {
            from: `Daniel Rios Contact <${env.MAIL}>`,
            to: data.email,
            subject: 'Form Contact to Daniel Rios',
            html: /* html */ `
                <p>Thank you for reaching out to me. I will respond as soon as possible.</p>
                <p>Feel free to reach out me again at: ${env.TRANSPORT_USER}</p>
                <p>Daniel Rios.</p><br />
                <p>This is the message you sent me:</p>
                <p>-----------------------------</p>
                <p>${data.message}</p>
            `
        }

        transporter.sendMail(confirmation, (err) => {
            if (err) {
                return fail(500, {
                    error: err.cause,
                    message: err.message
                })
            }
        })

        // To myself
        const contact = {
            from: `Form Contact <${data.email}>`,
            to: env.MAIL,
            subject: data.subject || `Form Contact from ${data.email}`,
            html: /* html */ `
                <p>Name: ${data.name}</p>
                <p>Email: ${data.email}</p>
                <p>-----------------------------</p>
                <p>${data.message}</p>
            `
        }

        transporter.sendMail(contact, (err) => {
            if (err) {
                return fail(500, {
                    error: err.cause,
                    message: err.message
                })
            }
        })

        return {
            message: 'Email Sent '
        }
    }
}
