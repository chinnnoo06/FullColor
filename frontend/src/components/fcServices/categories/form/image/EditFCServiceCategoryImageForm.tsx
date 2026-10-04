"use client"

import { useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import { toast } from "react-toastify"

import { UpdateFCServiceCategoryImageFormSchema } from "@/schemas/fcServiceCategory/fcServiceCategory.form.schemas"
import { TFCServiceCategory } from "@/schemas/fcServiceCategory/fcServiceCategory.schemas"
import { useFCServiceCategory } from "@/hooks/useFCServiceCategory"
import { Button } from "@/components/ui/buttons/Button"
import { FormSection } from "@/components/ui/form/FormSection"
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle"
import { ImageField } from "@/components/ui/form/ImageField"
import { CurrentFCServiceCategoryImage } from "./CurrentFCServiceCategoryImage"

export const EditFCServiceCategoryImageForm = ({ fcServiceCategory }: { fcServiceCategory: TFCServiceCategory }) => {
    const [image, setImage] = useState<File | null>(null)
    const [error, setError] = useState<string>()

    const { updateFCServiceCategoryImage } = useFCServiceCategory()

    useEffect(() => {
        if (updateFCServiceCategoryImage.error) toast.error(updateFCServiceCategoryImage.error)
        if (updateFCServiceCategoryImage.success) toast.success(updateFCServiceCategoryImage.success)
    }, [updateFCServiceCategoryImage.error, updateFCServiceCategoryImage.success])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const parsed = UpdateFCServiceCategoryImageFormSchema.safeParse({ image })

        if (!parsed.success) {
            return setError(parsed.error.issues[0]?.message ?? "Revisa la imagen")
        }

        setError(undefined)
        updateFCServiceCategoryImage.handleUpdateFCServiceCategoryImage(fcServiceCategory._id, parsed.data)
    }

    return (
        <form className="space-y-10" onSubmit={onSubmit} noValidate>
            <FormSection>
                <FormSectionTitle>Imagen actual</FormSectionTitle>

                <CurrentFCServiceCategoryImage image={fcServiceCategory.image} name={fcServiceCategory.name} />

                <p className="text-fourth/75 flex items-start gap-2.5 text-xs lg:text-sm">
                    <FiAlertTriangle aria-hidden="true" className="mt-0.5 size-4 lg:size-4.5 shrink-0 text-red-600" />
                    Al guardar, esta imagen se reemplaza por la nueva y se borra del servidor.
                </p>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Nueva imagen</FormSectionTitle>

                <ImageField
                    id="image"
                    label="Imagen de la categoría"
                    image={image}
                    onChange={setImage}
                    error={error}
                />
            </FormSection>

            <Button type="submit" width="full" loading={updateFCServiceCategoryImage.loading} loadingText="Guardando...">
                Reemplazar imagen
            </Button>
        </form>
    )
}
