import { dev } from '$app/environment'
import { fail } from '@sveltejs/kit'
import { contact } from '$/lib/validations'
import type { Response } from '$/types/form'
// import { sendMail } from '$lib/server/send-mail'

export const actions = {
    default: async ({ request, locals }): Promise<Response> => {
        const data = Object.fromEntries<string>(await request.formData() as any)
        const verify = contact.safeParse(data)

        if (!verify.success) {
            return fail(500, {
                error: dev ? verify.error : true,
                message: 'The data provided is incorrect'
            })
        }

        const { name, email, subject, message } = verify.data
        // sendMail(name, email, subject, message)

        const { error } = await locals.supabase
            .from('contact')
            .insert({ name, email, subject, message })

        if (error) {
            return fail(500, {
                error: dev ? error : true,
                message: 'Error to sent the message'
            })
        }

        return {
            message: 'Message Sent'
        }
    }
}
