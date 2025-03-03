import { createTransport } from 'nodemailer'
import { env } from '$env/dynamic/private'

export async function sendMail(name: string, email: string, subject: string, message: string) {
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
            to: email,
            subject: 'Form Contact to Daniel Rios',
            replyTo: env.TRANSPORT_USER,
            html: /* html */ `
                <p>Thank you for reaching out to me. I will respond as soon as possible.</p>
                <p>Feel free to reach out me again at: ${env.TRANSPORT_USER}</p>
                <p>Daniel Rios.</p><br />
                <p>This is the message you sent me:</p>
                <p>-----------------------------</p>
                <p>${message}</p>
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
            from: `Form Contact <${email}>`,
            to: env.MAIL,
            subject: subject || `Form Contact from ${email}`,
            html: /* html */ `
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>-----------------------------</p>
                <p>${message}</p>
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
}