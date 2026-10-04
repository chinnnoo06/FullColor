"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"
import { CreateFCServiceFormSchema, TCreateFCServiceForm } from "@/schemas/fcService/fcService.form.schemas"

export const createFCService = async (data: TCreateFCServiceForm): Promise<TActionState> => {
    const parsed = CreateFCServiceFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/fc-services`

    const formData = new FormData()

    formData.append("name", parsed.data.name)
    formData.append("description", parsed.data.description)
    formData.append("category", parsed.data.category)

    parsed.data.images.forEach((image) => {
        formData.append("fcServiceImages", image)
    })

    const req = await fetch(url, {
        method: 'POST',
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
