import type { Pages, Options, Option, Texts } from '$/types'

// export const prerender = true

export async function load({ locals }) {
    const session = await locals.getSession()

    const [projects, textList, optionsList, infoList] = await Promise.all([
        locals.supabase.from('projects').select('name, stack, repo, link, image'),
        locals.supabase.from('portfolio_texts').select('type, content, html'),
        locals.supabase.from('portfolio_options').select('option, value'),
        locals.supabase.from('users').select('*').eq('id', session?.user.id || '')
    ])

    const { publicUrl } = locals.supabase.storage.from('images').getPublicUrl('projects').data
    const options = {} as Options
    const texts = {} as Texts

    optionsList.data?.forEach(({ option, value }) => {
        const split = option?.split('_') || []
        const page = (split.length > 1 ? split[0] : 'home') as Pages
        const config = (split.length > 1 ? split[1] : 'title') as keyof Option

        if (!options[page]) {
            options[page] = {} as Option
        }

        options[page][config] = value
    })

    textList.data?.forEach(({ content, html, type }) => {
        const option = type as keyof Texts

        texts[option] = {
            html, content
        }
    })

    return {
        session,
        info: infoList.data?.at(0),
        images: publicUrl ? publicUrl.replace('/projects', '') : '',
        projects: projects.data || [],
        texts,
        options
    }
}
