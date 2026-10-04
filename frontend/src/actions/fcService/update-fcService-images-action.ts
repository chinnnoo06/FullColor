"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"
import { TUpdateTFCServiceImagesForm, UpdateFCServiceImagesFormSchema } from "@/schemas/fcService/fcService.form.schemas"

export const updateFCServiceImages = async (id: string, data: TUpdateTFCServiceImagesForm): Promise<TActionState> => {
    const parsed = UpdateFCServiceImagesFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/fc-services/${id}/images`

    const formData = new FormData()

    parsed.data.images.forEach((image) => {
        formData.append("fcServiceImages", image)
    })

    const req = await fetch(url, {
        method: 'PATCH',
        headers: {
            "Authorization": `Bearer ${token}`,
            ...originHeader()
        },
        body: formData
    })

    const json = await req.json()

    if (!req.ok) {
        const { message } = ErrorResponseSchema.parse(json)

        return {
            error: message ?? "Error Desconocido",
            success: ""
        }
    }

    const success = SuccessResponseSchema.parse(json)

    revalidatePath('/admin/fullcolor-servicios')
    updateTag('fcServices')

    return {
        error: "",
        success: success.message
    }
}
