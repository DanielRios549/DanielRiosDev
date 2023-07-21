import { PROJECT } from '$env/static/private'
import type { Pages, Options, Option } from '$/types'
import type { LayoutServerLoad } from './$types'

// export const prerender = true

export const load: LayoutServerLoad = async ({ locals }) => {
    const [projects, menus, texts, optionsList] = await Promise.all([
        locals.supabase.from('projects').select('name, stack, repo, link, image'),
        locals.supabase.from(`${PROJECT}_menus`).select('location, items'),
        locals.supabase.from(`${PROJECT}_texts`).select('type, content, html'),
        locals.supabase.from(`${PROJECT}_options`).select('option, value')
    ])

    const { publicUrl } = locals.supabase.storage.from('images').getPublicUrl('projects').data
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
