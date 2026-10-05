import { z } from "zod"

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const IMAGE_MAX_SIZE = 10 * 1024 * 1024

export const CreateFCDepotProductFormSchema = z.object({
    name: z.string().trim().min(1, { message: "Campo obligatorio" }).max(100, { message: "Máximo 100 caracteres" }),
    description: z.string().trim().min(1, { message: "Campo obligatorio" }).max(500, { message: "Máximo 500 caracteres" }),
    colors: z
        .array(
            z.object({
                name: z.string().trim().min(1, { message: "Nombre del color requerido" }).max(50, { message: "Máximo 50 caracteres" }),
                hex: z.string().trim().regex(/^#[0-9A-Fa-f]{6}$/, { message: "Formato hex inválido (#RRGGBB)" }),
            })
        )
        .min(1, { message: "Agrega al menos un color" }),
    retailPrice: z.number({ message: "Campo obligatorio" }).min(0.01, { message: "Debe ser mayor a 0" }),
    midWholesalePrice: z.number({ message: "Debe ser un número válido" }).min(0, { message: "Debe ser mayor o igual a 0" }).nullable(),
    wholesalePrice: z.number({ message: "Debe ser un número válido" }).min(0, { message: "Debe ser mayor o igual a 0" }).nullable(),
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
        .max(5, { message: "Máximo 5 imágenes" }),
})

export const UpdateFCDepotProductFormSchema = CreateFCDepotProductFormSchema.omit({ images: true })

export const UpdateFCDepotProductImagesFormSchema = CreateFCDepotProductFormSchema.pick({ images: true })

export type TCreateFCDepotProductForm = z.infer<typeof CreateFCDepotProductFormSchema>
export type TUpdateFCDepotProductForm = z.infer<typeof UpdateFCDepotProductFormSchema>
export type TUpdateFCDepotProductImagesForm = z.infer<typeof UpdateFCDepotProductImagesFormSchema>
