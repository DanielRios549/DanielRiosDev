export async function load({ locals, url }) {
    const { data } = await locals.supabase.storage.from('images').list(`projects${url.pathname}`)

    return {
        projectImages: data || []
    }
}
