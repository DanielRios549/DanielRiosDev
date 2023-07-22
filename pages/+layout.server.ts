import type { Pages, Options, Option } from '$/types'

// export const prerender = true

export async function load({ locals }) {
    const session = await locals.getSession()

    const [projects, menus, texts, optionsList, infoList] = await Promise.all([
        locals.supabase.from('projects').select('name, stack, repo, link, image'),
        locals.supabase.from('portfolio_menus').select('location, items'),
        locals.supabase.from('portfolio_texts').select('type, content, html'),
        locals.supabase.from('portfolio_options').select('option, value'),
        locals.supabase.from('users').select('*').eq('id', session?.user.id)
    ])

    const { publicUrl } = locals.supabase.storage.from('images').getPublicUrl('projects').data
    const options = {} as Options

    optionsList.data?.forEach(({ option, value }) => {
        const split = option?.split('_') || []
        const page = (split.length > 1 ? split[0] : 'home') as Pages
        const config = (split.length > 1 ? split[1] : 'title') as keyof Option

        if (!options[page]) {
            options[page] = {} as Option
        }

        options[page][config] = value // TODO: Fix Typings
    })

    return {
        session,
        info: infoList.data?.at(0),
        images: publicUrl ? publicUrl.replace('/projects', '') : '',
        projects: projects.data || [],
        menus: menus.data || [],
        texts: texts.data || [],
        options: options || {}
    }
}
