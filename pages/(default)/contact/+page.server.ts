import { createTransport } from 'nodemailer'
import { fail } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { contact } from '$/lib/validations'

export const actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries<string>(await request.formData() as any)
        const verify = contact.safeParse(data)

        if (!verify.success) {
            return fail(500, {
                error: 'The provided data is incorrect'
            })
        }

        const transporter = createTransport({
            host: env.TRANSPORT_HOST,
            secure: true,
            port: 465,
            auth: {
                user: env.TRANSPORT_USER,
                pass: env.TRANSPORT_PASSWORD
            }
        })

        // Verify if configuration is correct
        await new Promise((resolve, reject) => {
            transporter.verify((err, success) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(success)
                }
            })
        })

        // Send email to the one who contact me
        await new Promise((resolve, reject) => {
            const confirmation = {
                from: `Daniel Rios Contact <${env.MAIL}>`,
                to: data.email,
                subject: 'Form Contact to Daniel Rios',
                replyTo: env.TRANSPORT_USER,
                html: /* html */ `
                    <p>Thank you for reaching out to me. I will respond as soon as possible.</p>
                    <p>Feel free to reach out me again at: ${env.TRANSPORT_USER}</p>
                    <p>Daniel Rios.</p><br />
                    <p>This is the message you sent me:</p>
                    <p>-----------------------------</p>
                    <p>${data.message}</p>
                `
            }
            transporter.sendMail(confirmation, (err, info) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(info)
                }
            })
        })

        // Send email to myself
        await new Promise((resolve, reject) => {
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
            transporter.sendMail(contact, (err, info) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(info)
                }
            })
        })

        return {
            message: 'Email Sent'
        }
    }
}
