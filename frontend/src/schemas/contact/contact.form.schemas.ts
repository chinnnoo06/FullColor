import { z } from "zod"
import { WhatsAppLineKeySchema } from "@/schemas/enums.schemas"

export const ContactFormSchema = z.object({
    name: z.string().min(1, { message: 'Campo obligatorio' }),
    subject: z.string().min(1, { message: 'Campo obligatorio' }),
    details: z.string().min(1, { message: 'Campo obligatorio' }),
    line: WhatsAppLineKeySchema,
})

export type TContactForm = z.infer<typeof ContactFormSchema>