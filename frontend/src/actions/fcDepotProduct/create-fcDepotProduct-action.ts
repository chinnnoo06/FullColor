"use server"

import { revalidatePath, updateTag } from "next/cache"
import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"
import { CreateFCDepotProductFormSchema, TCreateFCDepotProductForm } from "@/schemas/fcDepotProduct/fcDepotProduct.form.schemas"

export const createFCDepotProduct = async (data: TCreateFCDepotProductForm): Promise<TActionState> => {
    const parsed = CreateFCDepotProductFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const formData = new FormData()

    formData.append("name", parsed.data.name)
    formData.append("description", parsed.data.description)
    formData.append("colors", JSON.stringify(parsed.data.colors))
    formData.append("retailPrice", parsed.data.retailPrice.toString())
    if (parsed.data.midWholesalePrice != null) formData.append("midWholesalePrice", parsed.data.midWholesalePrice.toString())
    if (parsed.data.wholesalePrice != null) formData.append("wholesalePrice", parsed.data.wholesalePrice.toString())
    formData.append("seo", JSON.stringify(parsed.data.seo))

    parsed.data.images.forEach((image) => {
        formData.append("fcDepotProductImages", image)
    })

    const req = await fetch(`${process.env.API_URL}/fc-depot-products`, {
        method: "POST",
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
