import { z } from "zod"
import { FCWebTechnologySchema } from "@/schemas/enums.schemas"

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const IMAGE_MAX_SIZE = 10 * 1024 * 1024

const htmlHasContent = (html: string) =>
    /<img\b/i.test(html) || html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim().length > 0

export const CreateFCWebProjectFormSchema = z.object({
    name: z.string().trim().min(1, { message: "Campo obligatorio" }).max(100, { message: "Máximo 100 caracteres" }),
    excerpt: z.string().trim().min(1, { message: "Campo obligatorio" }).max(300, { message: "Máximo 300 caracteres" }),
    content: z.string().refine(htmlHasContent, { message: "Campo Obligatorio" }),
    technologies: z.array(FCWebTechnologySchema).min(1, { message: "Selecciona al menos una tecnología" }),
    seo: z.object({
        metaTitle: z.string().trim().min(1, { message: "Campo obligatorio" }).max(60, { message: "Máximo 60 caracteres" }),
        metaDescription: z.string().trim().min(1, { message: "Campo obligatorio" }).max(160, { message: "Máximo 160 caracteres" }),
    }),
    images: z
        .array(
            z
                .instanceof(File, { message: "Campo obligatorio" })
                .refine((file) => IMAGE_TYPES.includes(file.type), { message: "Solo JPG, PNG o WebP" })
                .refine((file) => file.size <= IMAGE_MAX_SIZE, { message: "Cada imagen debe pesar 10 MB o menos" }),
        )
        .min(1, { message: "Sube al menos una imagen" })
        .max(5, { message: "Maximo 5 imagenes" })
})

export const UpdateFCWebProjectFormSchema = CreateFCWebProjectFormSchema.omit({ images: true })

export const UpdateFCWebProjectImagesFormSchema = CreateFCWebProjectFormSchema.pick({ images: true })

export type TCreateFCWebProjectForm = z.infer<typeof CreateFCWebProjectFormSchema>
export type TUpdateFCWebProjectForm = z.infer<typeof UpdateFCWebProjectFormSchema>
export type TUpdateFCWebProjectImagesForm = z.infer<typeof UpdateFCWebProjectImagesFormSchema>
