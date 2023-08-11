import { PUBLIC_API_URL, PUBLIC_API_KEY } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import { dev } from '$app/environment'
import { inject } from '@vercel/analytics'
import type { Database } from '$/types/generated'

inject({ mode: dev ? 'development' : 'production' })

export async function load({ fetch, data, depends }) {
    depends('supabase:auth')

    const { auth } = createSupabaseLoadClient<Database>({
        supabaseUrl: PUBLIC_API_URL,
        supabaseKey: PUBLIC_API_KEY,
        event: { fetch },
        serverSession: data.session,
        cookieOptions: {
            name: 'session',
            secure: !import.meta.env.DEV
        }
    })

    const { session, ...serverData } = data
    const { data: authData } = await auth.getSession()

    return {
        auth,
        session: authData.session,
        ...serverData
    }
}
