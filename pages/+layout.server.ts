import { createClient } from '@supabase/supabase-js'
import type { Pages, Options, Option } from '$/types'
import type { LayoutServerLoad } from './$types'

// export const prerender = true

export const load: LayoutServerLoad = async () => {
    const project = process.env.PROJECT || ''
    const supabase = createClient(
        process.env.API_URL || '',
        process.env.API_KEY || ''
    )

    const [projects, menus, texts, optionsList] = await Promise.all([
        supabase.from('Projects').select('name, stack, repo, link, image'),
        supabase.from(`${project}_Menus`).select('location, items'),
        supabase.from(`${project}_Texts`).select('type, content, html'),
        supabase.from(`${project}_Options`).select('option, value')
    ])

    const { publicURL } = supabase.storage.from('images').getPublicUrl('projects')
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

    console.log(options)

    return {
        images: publicURL ? publicURL.replace('/projects', '') : '',
        projects: projects.data || [],
        menus: menus.data || [],
        texts: texts.data || [],
        options: options || {}
    }
}
