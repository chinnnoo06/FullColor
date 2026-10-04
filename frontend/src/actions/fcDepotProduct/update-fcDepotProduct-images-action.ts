"use server"

import { revalidatePath, updateTag } from "next/cache"
import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"
import { UpdateFCDepotProductImagesFormSchema, TUpdateFCDepotProductImagesForm } from "@/schemas/fcDepotProduct/fcDepotProduct.form.schemas"

export const updateFCDepotProductImages = async (id: string, data: TUpdateFCDepotProductImagesForm): Promise<TActionState> => {
    const parsed = UpdateFCDepotProductImagesFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const formData = new FormData()

    parsed.data.images.forEach((image) => {
        formData.append("fcDepotProductImages", image)
    })

    const req = await fetch(`${process.env.API_URL}/fc-depot-products/${id}/images`, {
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

    revalidatePath("/admin/fullcolor-depot-productos")
    updateTag("fcDepotProducts")

    return {
        error: "",
        success: success.message
    }
}
