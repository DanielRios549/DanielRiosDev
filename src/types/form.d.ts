import type { ZodError } from "zod"
import type { PostgrestError } from "@supabase/supabase-js"
import type { ActionFailure, HttpError } from "@sveltejs/kit"

export type Data = Record<string, string>

export type Error = {
    message: string
    error: ZodError | PostgrestError | HttpError | true
}

export type Success = {
    message: string
}

export type Response = ActionFailure<Error> | Success
