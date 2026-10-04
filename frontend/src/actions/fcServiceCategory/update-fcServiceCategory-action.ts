"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"
import { TUpdateFCServiceCategoryForm, UpdateFCServiceCategoryFormSchema } from "@/schemas/fcServiceCategory/fcServiceCategory.form.schemas"

export const updateFCServiceCategory = async (id: string, data: TUpdateFCServiceCategoryForm): Promise<TActionState> => {
    const parsed = UpdateFCServiceCategoryFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/fc-category-services/${id}`

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

    revalidatePath('/admin/fullcolor-categorias-servicios')
    updateTag('fcServiceCategories')

    return {
        error: "",
        success: success.message
    }
}
