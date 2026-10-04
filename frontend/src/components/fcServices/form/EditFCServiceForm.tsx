"use client"

import { Button } from "@/components/ui/buttons/Button"
import { FormSection } from "@/components/ui/form/FormSection"
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle"
import { Input } from "@/components/ui/form/Input"
import { Label } from "@/components/ui/form/Label"
import { SpanError } from "@/components/ui/form/SpanError"
import { Textarea } from "@/components/ui/form/Textarea"
import { useFCService } from "@/hooks/useFCService"
import { TUpdateFCServiceForm, UpdateFCServiceFormSchema } from "@/schemas/fcService/fcService.form.schemas"
import { TFCService } from "@/schemas/fcService/fcService.schemas"
import { TFCServiceCategory } from "@/schemas/fcServiceCategory/fcServiceCategory.schemas"
import { Select } from "@/components/ui/form/Select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

export const EditFCServiceForm = ({ fcService, fcServiceCategories }: { fcService: TFCService; fcServiceCategories: TFCServiceCategory[] }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<TUpdateFCServiceForm>({
        resolver: zodResolver(UpdateFCServiceFormSchema),
        defaultValues: {
            name: fcService.name,
            description: fcService.description,
            category: fcService.category._id,
        }
    })

    const { updateFCService } = useFCService();

    useEffect(() => {
        if (updateFCService.error) toast.error(updateFCService.error);
        if (updateFCService.success) toast.success(updateFCService.success);
    }, [updateFCService.error, updateFCService.success]);

    const onSubmit = (data: TUpdateFCServiceForm) => updateFCService.handleUpdateFCService(fcService._id, data)

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
                    <Select id="category" {...register("category")}>
                        {fcServiceCategories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </Select>
                    <SpanError message={errors.category?.message} />
                </div>
            </FormSection>

            <Button type="submit" width="responsive" loading={updateFCService.loading} loadingText="Cargando...">
                Editar Servicio
            </Button>
        </form>
    )
}
