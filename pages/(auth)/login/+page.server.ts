import { AuthApiError } from '@supabase/supabase-js'
import { fail, redirect } from '@sveltejs/kit'

export const actions = {
    default: async ({ request, locals }) => {
        const { email, password } = Object.fromEntries<string>(await request.formData() as any)

        const { error: e } = await locals.supabase.auth.signInWithPassword({
            email,
            password
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
