import { fail } from '@sveltejs/kit'
import { contact } from '$/lib/validations'
import { sendMail } from '$lib/server/send-mail'

export const actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries<string>(await request.formData() as any)
        const verify = contact.safeParse(data)

        if (!verify.success) {
            return fail(500, {
                error: 'The provided data is incorrect'
            })
        }

        const { name, email, subject, message } = verify.data

        sendMail(name, email, subject, message)

        return {
            message: 'Email Sent'
        }
    }
}
