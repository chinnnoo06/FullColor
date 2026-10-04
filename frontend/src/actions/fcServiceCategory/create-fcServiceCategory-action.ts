"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"
import { CreateFCServiceCategoryFormSchema, TCreateFCServiceCategoryForm } from "@/schemas/fcServiceCategory/fcServiceCategory.form.schemas"

export const createFCServiceCategory = async (data: TCreateFCServiceCategoryForm): Promise<TActionState> => {
    const parsed = CreateFCServiceCategoryFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/fc-category-services`

    const formData = new FormData()

    formData.append("name", parsed.data.name)
    formData.append("description", parsed.data.description)
    formData.append("fcServiceCategoryImage", parsed.data.image)

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

    revalidatePath('/admin/fullcolor-categorias-servicios')
    updateTag('fcServiceCategories')

    return {
        error: "",
        success: success.message
    }
}
