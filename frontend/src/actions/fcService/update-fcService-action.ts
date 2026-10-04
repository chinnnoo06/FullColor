"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"
import { TUpdateFCServiceForm, UpdateFCServiceFormSchema } from "@/schemas/fcService/fcService.form.schemas"

export const updateFCService = async (id: string, data: TUpdateFCServiceForm): Promise<TActionState> => {
    const parsed = UpdateFCServiceFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/fc-services/${id}`

    const req = await fetch(url, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...originHeader()
        },
        body: JSON.stringify({
            name: parsed.data.name,
            description: parsed.data.description,
            category: parsed.data.category,
        })
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
