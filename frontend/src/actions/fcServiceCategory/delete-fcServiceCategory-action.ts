"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

export const deleteFCServiceCategory = async (id: string): Promise<TActionState> => {
    const token = await getToken()

    const url = `${process.env.API_URL}/fc-category-services/${id}`

    const req = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`,
            ...originHeader()
        }
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

    revalidatePath('/admin/fullcolor-categorias-servicios')
    updateTag('fcServiceCategories')

    return {
        error: "",
        success: success.message
    }
}
