import { createClient } from '@supabase/supabase-js'
import { PUBLIC_API_URL } from '$env/static/public'
import { API_KEY, PROJECT } from '$env/static/private'
import type { Pages, Options, Option } from '$/types'
import type { LayoutServerLoad } from './$types'

// export const prerender = true

export const load: LayoutServerLoad = async () => {
    const supabase = createClient(
        PUBLIC_API_URL,
        API_KEY
    )

    const [projects, menus, texts, optionsList] = await Promise.all([
        supabase.from('Projects').select('name, stack, repo, link, image'),
        supabase.from(`${PROJECT}_Menus`).select('location, items'),
        supabase.from(`${PROJECT}_Texts`).select('type, content, html'),
        supabase.from(`${PROJECT}_Options`).select('option, value')
    ])

    const { publicUrl } = supabase.storage.from('images').getPublicUrl('projects').data
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
        images: publicUrl ? publicUrl.replace('/projects', '') : '',
        projects: projects.data || [],
        menus: menus.data || [],
        texts: texts.data || [],
        options: options || {}
    }
}
