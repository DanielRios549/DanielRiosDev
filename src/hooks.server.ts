import { env } from '$env/dynamic/public'
import { prisma } from '$prisma/client'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import type { Database } from '$/types/generated'

export async function handle({ event, resolve }) {
    event.locals.supabase = createSupabaseServerClient<Database>({
        supabaseUrl: env.PUBLIC_API_URL,
        supabaseKey: env.PUBLIC_API_KEY,
        event,
        cookieOptions: {
            name: 'session',
            secure: !import.meta.env.DEV
        }
    })

    event.locals.prisma = prisma

    /**
     * a little helper that is written for convenience so that instead
     * of calling `const { data: { session } } = await supabase.auth.getSession()`
     * you just call this `await getSession()`
     */
    event.locals.getSession = async () => {
        const { data } = await event.locals.supabase.auth.getSession()

        return data.session
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        }
    })
}
