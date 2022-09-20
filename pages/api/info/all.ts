import { supabase, project } from 'pages/api/connection'
import type { PostgrestResponse } from '@supabase/supabase-js'
import type { NextApiHandler } from 'next'
import type { Options, Option } from 'src/types'

const handler: NextApiHandler<Options> = async (req, res) => {
    const options: Options = {}

    const get = await supabase.from(`${project}_Options`)
        .select('option, value') as PostgrestResponse<Option>

    get.body?.forEach(({ option, value }) => {
        options[option] = value
    })

    res.status(200).json(options)
}

export default handler
