import { AuthApiError } from '@supabase/supabase-js'
import { fail, redirect } from '@sveltejs/kit'
import { login } from '$/lib/validations'

export const actions = {
    default: async ({ request, locals }) => {
        const data = Object.fromEntries<string>(await request.formData() as any)
        const verify = login.safeParse(data)

        if (!verify.success) {
            return fail(500, {
                error: 'The provided data is incorrect'
            })
        }

        const { error: e } = await locals.supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password
        })

        if (e) {
            if (e instanceof AuthApiError && e.status === 400) {
                return fail(500, {
                    error: 'Invalid Email or Password'
                })
            }

            return fail(500, {
                error: 'Server Error. Try again later.'
            })
        }

        throw redirect(303, '/')
    }
}
