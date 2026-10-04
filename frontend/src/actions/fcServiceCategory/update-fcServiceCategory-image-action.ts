"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"
import { TUpdateFCServiceCategoryImageForm, UpdateFCServiceCategoryImageFormSchema } from "@/schemas/fcServiceCategory/fcServiceCategory.form.schemas"

export const updateFCServiceCategoryImage = async (id: string, data: TUpdateFCServiceCategoryImageForm): Promise<TActionState> => {
    const parsed = UpdateFCServiceCategoryImageFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/fc-category-services/${id}/image`

    const formData = new FormData()

    formData.append("fcServiceCategoryImage", parsed.data.image)

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

    revalidatePath('/admin/fullcolor-categorias-servicios')
    updateTag('fcServiceCategories')

    return {
        error: "",
        success: success.message
    }
}
