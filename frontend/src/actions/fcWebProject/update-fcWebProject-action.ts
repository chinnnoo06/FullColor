"use server"

import { revalidatePath, updateTag } from "next/cache"
import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"
import { UpdateFCWebProjectFormSchema, TUpdateFCWebProjectForm } from "@/schemas/fcWebProject/fcWebProject.form.schemas"

export const updateFCWebProject = async (id: string, data: TUpdateFCWebProjectForm): Promise<TActionState> => {
    const parsed = UpdateFCWebProjectFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const req = await fetch(`${process.env.API_URL}/fc-web-projects/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...originHeader()
        },
        body: JSON.stringify(parsed.data)
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
