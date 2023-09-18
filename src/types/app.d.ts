/* eslint-disable no-unused-vars */
/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
import { SupabaseClient, Session } from '@supabase/supabase-js'
import type { Database } from '$/types/generated'
import type { LayoutServerData } from '.svelte-kit/types/pages/$types'

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient<Database>
            getSession(): Promise<Session | null>
        }

        interface PageData extends LayoutServerData {
            auth: SupabaseClient['auth'] // TODO: Fix Auth Typing not really correct
        }

        // interface PageData {
        //     session: Session | null
        // }

        // interface Error {}
        // interface Platform {}
    }
}

declare module '*.svg' {
    import type { ComponentType, SvelteComponentTyped } from 'svelte'
    import type { SVGAttributes } from 'svelte/elements'

    const content: ComponentType<
      SvelteComponentTyped<SVGAttributes<SVGSVGElement>>
    >

    export default content
}
