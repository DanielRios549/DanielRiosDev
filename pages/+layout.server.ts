import { createClient } from '@supabase/supabase-js'
import type { Pages, Options, Option } from '$/types'
import type { LayoutServerLoad } from './$types'

export const prerender = true

export const project = process.env.PROJECT || ''
export const supabase = createClient(
    process.env.API_URL || '',
    process.env.API_KEY || ''
)

export const load: LayoutServerLoad = async () => {
    const projects = await supabase.from('Projects')
        .select('name, stack, repo, link, image')

    const menus = await supabase.from(`${project}_Menus`).select('location, items')
    const texts = await supabase.from(`${project}_Texts`).select('type, content, html')
    const optionsList = await supabase.from<Record<string, string>>(`${project}_Options`)
        .select('option, value')

    const options = {} as Options

    optionsList.data?.forEach(({ option, value }) => {
        const split = option.split('_')
        const page = (split.length > 1 ? split[0] : 'home') as Pages
        const config = (split.length > 1 ? split[1] : 'title') as keyof Option

        if (!options[page]) {
            options[page] = {} as Option
        }

        options[page][config] = value
    })

    return {
        projects: projects.data || [],
        menus: menus.data || [],
        texts: texts.data || [],
        options: options || {}
    }
}
