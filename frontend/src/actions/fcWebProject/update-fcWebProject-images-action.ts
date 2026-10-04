"use server"

import { revalidatePath, updateTag } from "next/cache"
import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"
import { UpdateFCWebProjectImagesFormSchema, TUpdateFCWebProjectImagesForm } from "@/schemas/fcWebProject/fcWebProject.form.schemas"

export const updateFCWebProjectImages = async (id: string, data: TUpdateFCWebProjectImagesForm): Promise<TActionState> => {
    const parsed = UpdateFCWebProjectImagesFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const formData = new FormData()

    parsed.data.images.forEach((image) => {
        formData.append("fcWebProjectImages", image)
    })

    const req = await fetch(`${process.env.API_URL}/fc-web-projects/${id}/images`, {
        method: "PATCH",
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

    revalidatePath("/admin/fullcolor-web-projectos")
    updateTag("fcWebProjects")

    return {
        error: "",
        success: success.message
    }
}
