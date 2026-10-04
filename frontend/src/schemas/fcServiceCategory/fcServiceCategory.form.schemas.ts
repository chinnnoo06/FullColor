import { z } from "zod"

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const IMAGE_MAX_SIZE = 10 * 1024 * 1024

export const CreateFCServiceCategoryFormSchema = z.object({
    name: z.string().trim().min(1, { message: "Campo obligatorio" }).max(100, { message: "Máximo 100 caracteres" }),
    description: z.string().trim().min(1, { message: "Campo obligatorio" }).max(500, { message: "Máximo 500 caracteres" }),
    image: z
        .instanceof(File, { message: "Campo obligatorio" })
        .refine((file) => IMAGE_TYPES.includes(file.type), { message: "Solo JPG, PNG o WebP" })
        .refine((file) => file.size <= IMAGE_MAX_SIZE, { message: "La imagen debe pesar 10 MB o menos" }),
})

export const UpdateFCServiceCategoryFormSchema = CreateFCServiceCategoryFormSchema.omit({ image: true })

export const UpdateFCServiceCategoryImageFormSchema = CreateFCServiceCategoryFormSchema.pick({ image: true })

export type TCreateFCServiceCategoryForm = z.infer<typeof CreateFCServiceCategoryFormSchema>
export type TUpdateFCServiceCategoryForm = z.infer<typeof UpdateFCServiceCategoryFormSchema>
export type TUpdateFCServiceCategoryImageForm = z.infer<typeof UpdateFCServiceCategoryImageFormSchema>
