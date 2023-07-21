/* eslint-disable no-unused-vars */
/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '$/types/generated'

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient<Database>
        }

        // interface PageData {}
        // interface Error {}
        // interface Platform {}
    }
}
