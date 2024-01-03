import { z } from 'zod'

export const login = z.object({
    email: z.string().min(1, 'Email is required').email('Type a valid Email, please'),
    password: z.string().min(3, 'Password too short')
})

export const contact = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Type a valid Email, please'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required')
})
