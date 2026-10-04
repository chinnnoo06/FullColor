import { z } from "zod"

export const LoginFormSchema = z.object({
    username: z.string().trim().min(1, { message: 'Campo obligatorio' }).max(50, { message: 'Máximo 50 caracteres' }),
    password: z.string().trim().min(1, { message: 'Campo obligatorio' })
})

export type TLoginForm = z.infer<typeof LoginFormSchema>
