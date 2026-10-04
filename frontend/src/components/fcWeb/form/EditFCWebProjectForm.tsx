"use client"

import { Button } from "@/components/ui/buttons/Button"
import { FormSection } from "@/components/ui/form/FormSection"
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle"
import { Input } from "@/components/ui/form/Input"
import { Label } from "@/components/ui/form/Label"
import { SpanError } from "@/components/ui/form/SpanError"
import { Textarea } from "@/components/ui/form/Textarea"
import { useFCWebProject } from "@/hooks/useFCWebProject"
import { TUpdateFCWebProjectForm, UpdateFCWebProjectFormSchema } from "@/schemas/fcWebProject/fcWebProject.form.schemas"
import { TFCWebProject } from "@/schemas/fcWebProject/fcWebProject.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { toast } from "react-toastify"
import { FCWebProjectEditorField } from "./FCWebProjectEditorField"
import { TechnologiesField } from "./TechnologiesField"

export const EditFCWebProjectForm = ({ fcWebProject }: { fcWebProject: TFCWebProject }) => {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TUpdateFCWebProjectForm>({
        resolver: zodResolver(UpdateFCWebProjectFormSchema),
        defaultValues: {
            name: fcWebProject.name,
            excerpt: fcWebProject.excerpt,
            content: fcWebProject.content,
            technologies: fcWebProject.technologies,
            seo: {
                metaTitle: fcWebProject.seo.metaTitle,
                metaDescription: fcWebProject.seo.metaDescription,
            },
        }
    })

    const { updateFCWebProject } = useFCWebProject()

    useEffect(() => {
        if (updateFCWebProject.error) toast.error(updateFCWebProject.error)
        if (updateFCWebProject.success) toast.success(updateFCWebProject.success)
    }, [updateFCWebProject.error, updateFCWebProject.success])

    const technologies = useWatch({ control, name: 'technologies' })

    const onSubmit = (data: TUpdateFCWebProjectForm) => updateFCWebProject.handleUpdateFCWebProject(fcWebProject._id, data)

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

            <Button type="submit" width="responsive" loading={updateFCWebProject.loading} loadingText="Cargando...">
                Guardar Cambios
            </Button>
        </form>
    )
}
