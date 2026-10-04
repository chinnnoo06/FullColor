import { z } from "zod"

export const FCWebTechnologySchema = z.enum([
    "javascript",
    "typescript",
    "tailwind",
    "react",
    "nextjs",
    "expressjs",
    "nestjs",
    "mongodb",
    "postgresql",
])
export type TFCWebTechnology = z.infer<typeof FCWebTechnologySchema>

export const WhatsAppLineKeySchema = z.enum(['principal', 'impresiones', 'laser-dtf', 'depot-web'])
export type TWhatsAppLineKey = z.infer<typeof WhatsAppLineKeySchema>
