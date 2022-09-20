import { supabase, project } from 'pages/api/connection'
import type { NextApiHandler } from 'next'

const handler: NextApiHandler<string> = async (req, res) => {
    const { option } = req.query
    const get = await supabase.from(`${project}_Options`)
        .select('value')
        .eq('option', option)

    if (get.data && get?.data?.length >= 1) {
        res.status(200).json(get?.body[0].value)
    }
    res.status(404).json(`Option '${option}' does not exist.`)
}

export default handler
