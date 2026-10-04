"use client"

import { Button } from "@/components/ui/buttons/Button"
import { FormSection } from "@/components/ui/form/FormSection"
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle"
import { ImagesField } from "@/components/ui/form/ImagesField"
import { Input } from "@/components/ui/form/Input"
import { Label } from "@/components/ui/form/Label"
import { SpanError } from "@/components/ui/form/SpanError"
import { Textarea } from "@/components/ui/form/Textarea"
import { useFCService } from "@/hooks/useFCService"
import { CreateFCServiceFormSchema, TCreateFCServiceForm } from "@/schemas/fcService/fcService.form.schemas"
import { TFCServiceCategory } from "@/schemas/fcServiceCategory/fcServiceCategory.schemas"
import { Select } from "@/components/ui/form/Select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "react-toastify"

export const CreateFCServiceForm = ({ fcServiceCategories }: { fcServiceCategories: TFCServiceCategory[] }) => {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TCreateFCServiceForm>({
        resolver: zodResolver(CreateFCServiceFormSchema),
        defaultValues: {
            name: '',
            description: '',
            category: '',
            images: [],
        }
    })

    const { createFCService } = useFCService();

    useEffect(() => {
        if (createFCService.error) toast.error(createFCService.error);
        if (createFCService.success) toast.success(createFCService.success);
    }, [createFCService.error, createFCService.success]);

    const images = useWatch({ control, name: 'images' });

    const onSubmit = (data: TCreateFCServiceForm) => createFCService.handleCreateFCService(data)

    return (
        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormSection>
                <FormSectionTitle>Información</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="name">Nombre</Label>
                    <Input type="text" id="name" placeholder="Nombre del servicio" {...register("name")} />
                    <SpanError message={errors.name?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea id="description" rows={4} placeholder="Descripción del servicio" {...register("description")} />
                    <SpanError message={errors.description?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="category">Categoría</Label>
                    <Select id="category" defaultValue="" {...register("category")}>
                        <option value="" disabled>Elige una categoría</option>
                        {fcServiceCategories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </Select>
                    <SpanError message={errors.category?.message} />
                </div>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Imágenes</FormSectionTitle>

                <ImagesField
                    images={images}
                    onChange={(next) => setValue('images', next, { shouldValidate: true })}
                    error={errors.images?.message}
                    title="Imagenes del servicio"
                />
            </FormSection>

            <Button type="submit" width="responsive" loading={createFCService.loading} loadingText="Cargando...">
                Crear Servicio
            </Button>
        </form>
    )
}
