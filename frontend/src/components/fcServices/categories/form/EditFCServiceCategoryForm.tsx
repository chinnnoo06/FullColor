"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"

import { Button } from "@/components/ui/buttons/Button"
import { FormSection } from "@/components/ui/form/FormSection"
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle"
import { Input } from "@/components/ui/form/Input"
import { Label } from "@/components/ui/form/Label"
import { SpanError } from "@/components/ui/form/SpanError"
import { Textarea } from "@/components/ui/form/Textarea"
import { useFCServiceCategory } from "@/hooks/useFCServiceCategory"
import { TUpdateFCServiceCategoryForm, UpdateFCServiceCategoryFormSchema } from "@/schemas/fcServiceCategory/fcServiceCategory.form.schemas"
import { TFCServiceCategory } from "@/schemas/fcServiceCategory/fcServiceCategory.schemas"

export const EditFCServiceCategoryForm = ({ fcServiceCategory }: { fcServiceCategory: TFCServiceCategory }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<TUpdateFCServiceCategoryForm>({
        resolver: zodResolver(UpdateFCServiceCategoryFormSchema),
        defaultValues: {
            name: fcServiceCategory.name,
            description: fcServiceCategory.description,
        }
    })

    const { updateFCServiceCategory } = useFCServiceCategory()

    useEffect(() => {
        if (updateFCServiceCategory.error) toast.error(updateFCServiceCategory.error)
        if (updateFCServiceCategory.success) toast.success(updateFCServiceCategory.success)
    }, [updateFCServiceCategory.error, updateFCServiceCategory.success])

    const onSubmit = (data: TUpdateFCServiceCategoryForm) => updateFCServiceCategory.handleUpdateFCServiceCategory(fcServiceCategory._id, data)

    return (
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormSection>
                <FormSectionTitle>Información</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="name">Nombre</Label>
                    <Input type="text" id="name" placeholder="Nombre de la categoría" {...register("name")} />
                    <SpanError message={errors.name?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea id="description" rows={4} placeholder="Descripción de la categoría" {...register("description")} />
                    <SpanError message={errors.description?.message} />
                </div>
            </FormSection>

            <Button type="submit" width="responsive" loading={updateFCServiceCategory.loading} loadingText="Cargando...">
                Editar Categoría
            </Button>
        </form>
    )
}
