import { PUBLIC_API_URL, PUBLIC_API_KEY } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { Database } from '$/types/generated'

export async function load({ fetch, data, depends }) {
    depends('supabase:auth')

    const supabase = createSupabaseLoadClient<Database>({
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
    const { data: authData } = await supabase.auth.getSession()

    return {
        auth: supabase.auth,
        session: authData.session,
        ...serverData
    }
}
