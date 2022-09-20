import { createClient } from '@supabase/supabase-js'

export const project = process.env.PROJECT || ''
export const supabase = createClient(
    process.env.API_URL || '',
    process.env.API_KEY || ''
)
