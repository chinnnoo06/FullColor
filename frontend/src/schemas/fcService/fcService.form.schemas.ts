import { z } from "zod"

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const IMAGE_MAX_SIZE = 10 * 1024 * 1024

export const CreateFCServiceFormSchema = z.object({
    name: z.string().trim().min(1, { message: "Campo obligatorio" }).max(100, { message: "Máximo 100 caracteres" }),
    description: z.string().trim().min(1, { message: "Campo obligatorio" }).max(500, { message: "Máximo 500 caracteres" }),
    category: z.string().min(1, { message: "Campo obligatorio" }),
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

export const UpdateFCServiceFormSchema = CreateFCServiceFormSchema.omit({ images: true })

export const UpdateFCServiceImagesFormSchema = CreateFCServiceFormSchema.pick({ images: true })

export type TUpdateTFCServiceImagesForm = z.infer<typeof UpdateFCServiceImagesFormSchema>

export type TCreateFCServiceForm = z.infer<typeof CreateFCServiceFormSchema>

export type TUpdateFCServiceForm = z.infer<typeof UpdateFCServiceFormSchema>
