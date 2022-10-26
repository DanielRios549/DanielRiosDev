import { createClient } from '@supabase/supabase-js'
import type { PageServerLoad } from './$types'

export const project = process.env.PROJECT || ''
export const supabase = createClient(
    process.env.API_URL || '',
    process.env.API_KEY || ''
)

export const load: PageServerLoad = async () => {
    const projects = await supabase.from('Projects')
        .select('name, stack, repo, link')

    const optionsList = await supabase.from<Record<string, string>>(`${project}_Options`)
        .select('option, value')

    const options: Record<string, any> = {}

    optionsList.data?.forEach(({ option, value }) => {
        const split = option.split('_')
        const page = split.length > 1 ? split[0] : 'home'
        const config = split.length > 1 ? split[1] : 'none'

        if (!options[page]) {
            options[page] = {}
        }

        options[page][config] = value
    })

    return {
        projects: projects.data || [],
        options: options || {}
    }
}
