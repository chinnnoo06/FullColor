"use client"

import { Button } from "@/components/ui/buttons/Button"
import { FormSection } from "@/components/ui/form/FormSection"
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle"
import { ImagesField } from "@/components/ui/form/ImagesField"
import { Input } from "@/components/ui/form/Input"
import { Label } from "@/components/ui/form/Label"
import { SpanError } from "@/components/ui/form/SpanError"
import { Textarea } from "@/components/ui/form/Textarea"
import { useFCWebProject } from "@/hooks/useFCWebProject"
import { CreateFCWebProjectFormSchema, TCreateFCWebProjectForm } from "@/schemas/fcWebProject/fcWebProject.form.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { toast } from "react-toastify"
import { FCWebProjectEditorField } from "./FCWebProjectEditorField"
import { TechnologiesField } from "./TechnologiesField"

export const CreateFCWebProjectForm = () => {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TCreateFCWebProjectForm>({
        resolver: zodResolver(CreateFCWebProjectFormSchema),
        defaultValues: {
            name: '',
            excerpt: '',
            content: '',
            technologies: [],
            seo: { metaTitle: '', metaDescription: '' },
            images: [],
        }
    })

    const { createFCWebProject } = useFCWebProject()

    useEffect(() => {
        if (createFCWebProject.error) toast.error(createFCWebProject.error)
        if (createFCWebProject.success) toast.success(createFCWebProject.success)
    }, [createFCWebProject.error, createFCWebProject.success])

    const images = useWatch({ control, name: 'images' })
    const technologies = useWatch({ control, name: 'technologies' })

    const onSubmit = (data: TCreateFCWebProjectForm) => createFCWebProject.handleCreateFCWebProject(data)

    return (
        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormSection>
                <FormSectionTitle>Información</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="name">Nombre</Label>
                    <Input type="text" id="name" placeholder="Nombre del proyecto" {...register("name")} />
                    <SpanError message={errors.name?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="excerpt">Extracto</Label>
                    <Textarea id="excerpt" rows={3} placeholder="Resumen breve del proyecto (máx. 300 caracteres)" {...register("excerpt")} />
                    <SpanError message={errors.excerpt?.message} />
                </div>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Contenido</FormSectionTitle>

                <Controller
                    control={control}
                    name="content"
                    render={({ field }) => (
                        <FCWebProjectEditorField value={field.value} onChange={field.onChange} error={errors.content?.message} />
                    )}
                />
            </FormSection>

            <FormSection>
                <FormSectionTitle>Tecnologías</FormSectionTitle>

                <TechnologiesField
                    value={technologies}
                    onChange={(next) => setValue('technologies', next, { shouldValidate: true })}
                    error={errors.technologies?.message}
                />
            </FormSection>

            <FormSection>
                <FormSectionTitle>SEO</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="seo.metaTitle">Meta título</Label>
                    <Input type="text" id="seo.metaTitle" placeholder="Meta título (máx. 60 caracteres)" {...register("seo.metaTitle")} />
                    <SpanError message={errors.seo?.metaTitle?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="seo.metaDescription">Meta descripción</Label>
                    <Textarea id="seo.metaDescription" rows={3} placeholder="Meta descripción (máx. 160 caracteres)" {...register("seo.metaDescription")} />
                    <SpanError message={errors.seo?.metaDescription?.message} />
                </div>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Imágenes</FormSectionTitle>

                <ImagesField
                    images={images}
                    onChange={(next) => setValue('images', next, { shouldValidate: true })}
                    error={errors.images?.message}
                    title="Imágenes del proyecto"
                />
            </FormSection>

            <Button type="submit" width="responsive" loading={createFCWebProject.loading} loadingText="Cargando...">
                Crear Proyecto
            </Button>
        </form>
    )
}
