import { supabase } from '$api/connection'
import type { NextApiHandler } from 'next'
import type { Project } from '$/types'

const handler: NextApiHandler<Project[]> = async (req, res) => {
    const get = await supabase.from('Projects')

    if (get.data && get?.data?.length >= 1) {
        res.status(200).json(get?.body)
    }
    res.status(200).json([])
}

export default handler
