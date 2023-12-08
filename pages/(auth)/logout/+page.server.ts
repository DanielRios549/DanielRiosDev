import { fail, redirect } from '@sveltejs/kit'

export const actions = {
    default: async ({ locals }) => {
        const { error: e } = await locals.supabase.auth.signOut()

        if (e) {
            return fail(500, {
                error: 'Server Error. Cannot Log User Out'
            })
        }

        throw redirect(303, '/')
    }
}
