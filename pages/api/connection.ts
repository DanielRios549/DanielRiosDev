import { createClient } from '@supabase/supabase-js'

export const prefix = process.env.PREFIX || ''
export const supabase = createClient(
    process.env.API_URL || '',
    process.env.API_KEY || ''
)
