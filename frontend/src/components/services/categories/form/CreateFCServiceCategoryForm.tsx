"use client"

import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"

import { Button } from "@/components/ui/buttons/Button"
import { FormSection } from "@/components/ui/form/FormSection"
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle"
import { ImageField } from "@/components/ui/form/ImageField"
import { Input } from "@/components/ui/form/Input"
import { Label } from "@/components/ui/form/Label"
import { SpanError } from "@/components/ui/form/SpanError"
import { Textarea } from "@/components/ui/form/Textarea"
import { useFCServiceCategory } from "@/hooks/useFCServiceCategory"
import { CreateFCServiceCategoryFormSchema, TCreateFCServiceCategoryForm } from "@/schemas/fcServiceCategory/fcServiceCategory.form.schemas"

export const CreateFCServiceCategoryForm = () => {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TCreateFCServiceCategoryForm>({
        resolver: zodResolver(CreateFCServiceCategoryFormSchema),
        defaultValues: {
            name: '',
            description: '',
        }
    })

    const { createFCServiceCategory } = useFCServiceCategory()

    useEffect(() => {
        if (createFCServiceCategory.error) toast.error(createFCServiceCategory.error)
        if (createFCServiceCategory.success) toast.success(createFCServiceCategory.success)
    }, [createFCServiceCategory.error, createFCServiceCategory.success])

    const image = useWatch({ control, name: 'image' })

    const onSubmit = (data: TCreateFCServiceCategoryForm) => createFCServiceCategory.handleCreateFCServiceCategory(data)

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

            <FormSection>
                <FormSectionTitle>Imagen</FormSectionTitle>

                <ImageField
                    id="image"
                    label="Imagen de la categoría"
                    image={image ?? null}
                    onChange={(file) => setValue('image', file as File, { shouldValidate: true })}
                    error={errors.image?.message}
                />
            </FormSection>

            <Button type="submit" width="responsive" loading={createFCServiceCategory.loading} loadingText="Cargando...">
                Crear Categoría
            </Button>
        </form>
    )
}
