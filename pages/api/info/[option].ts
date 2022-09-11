import { createClient } from '@supabase/supabase-js'
import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
    const prefix = process.env.PREFIX || ''
    const supabase = createClient(
        process.env.API_URL || '',
        process.env.API_KEY || ''
    )

    const { option } = req.query
    const get = await supabase.from('Options')
        .select('value')
        .eq('option', `${prefix}${option}`)

    if (get.data && get?.data?.length >= 1) {
        res.status(200).json(get?.body[0].value)
    }
    res.status(404).json({
        message: `Option '${option}' does not exist.`
    })
}

export default handler
