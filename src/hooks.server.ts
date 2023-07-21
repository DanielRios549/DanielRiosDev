import { createClient } from '@supabase/supabase-js'
import { API_KEY } from '$env/static/private'
import { PUBLIC_API_URL } from '$env/static/public'
import type { Handle } from '@sveltejs/kit'
import type { Database } from '$/types/generated'

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createClient<Database>(
        PUBLIC_API_URL,
        API_KEY
    )

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        }
    })
}
