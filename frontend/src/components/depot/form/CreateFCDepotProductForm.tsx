"use client"

import { Button } from "@/components/ui/buttons/Button"
import { FormSection } from "@/components/ui/form/FormSection"
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle"
import { ImagesField } from "@/components/ui/form/ImagesField"
import { Input } from "@/components/ui/form/Input"
import { Label } from "@/components/ui/form/Label"
import { SpanError } from "@/components/ui/form/SpanError"
import { Textarea } from "@/components/ui/form/Textarea"
import { useFCDepotProduct } from "@/hooks/useFCDepotProduct"
import { CreateFCDepotProductFormSchema, TCreateFCDepotProductForm } from "@/schemas/fcDepotProduct/fcDepotProduct.form.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useFieldArray, useForm, useWatch } from "react-hook-form"
import { toast } from "react-toastify"
import { HiPlus, HiTrash } from "react-icons/hi2"

export const CreateFCDepotProductForm = () => {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TCreateFCDepotProductForm>({
        resolver: zodResolver(CreateFCDepotProductFormSchema),
        defaultValues: {
            name: '',
            description: '',
            colors: [{ name: '', hex: '' }],
            retailPrice: '' as unknown as number,
            midWholesalePrice: null,
            wholesalePrice: null,
            seo: { metaTitle: '', metaDescription: '' },
            images: [],
        }
    })

    const { fields, append, remove } = useFieldArray({ control, name: 'colors' })

    const { createFCDepotProduct } = useFCDepotProduct()

    useEffect(() => {
        if (createFCDepotProduct.error) toast.error(createFCDepotProduct.error)
        if (createFCDepotProduct.success) toast.success(createFCDepotProduct.success)
    }, [createFCDepotProduct.error, createFCDepotProduct.success])

    const images = useWatch({ control, name: 'images' })
    const colors = useWatch({ control, name: 'colors' })

    const onSubmit = (data: TCreateFCDepotProductForm) => createFCDepotProduct.handleCreateFCDepotProduct(data)

    return (
        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormSection>
                <FormSectionTitle>Información</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="name">Nombre</Label>
                    <Input type="text" id="name" placeholder="Nombre del producto" {...register("name")} />
                    <SpanError message={errors.name?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea id="description" rows={4} placeholder="Descripción del producto" {...register("description")} />
                    <SpanError message={errors.description?.message} />
                </div>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Colores</FormSectionTitle>

                <div className="space-y-5">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2.5">
                            <div className="form-group flex-1">
                                <Label htmlFor={`colors.${index}.name`}>Nombre</Label>
                                <Input
                                    type="text"
                                    id={`colors.${index}.name`}
                                    placeholder="Ej: Rojo"
                                    {...register(`colors.${index}.name`)}
                                />
                                <SpanError message={errors.colors?.[index]?.name?.message} />
                            </div>

                            <div className="form-group flex-1">
                                <Label htmlFor={`colors.${index}.hex`}>Hex</Label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        id={`colors.${index}.hex`}
                                        placeholder="#FF0000"
                                        {...register(`colors.${index}.hex`)}
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 size-4 lg:size-4.5 shrink-0 rounded-full border-white/10" style={{ backgroundColor: colors[index]?.hex || 'transparent' }} />
                                </div>
                                <SpanError message={errors.colors?.[index]?.hex?.message} />
                            </div>

                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="mt-5 shrink-0 cursor-pointer text-red-500 hover:text-red-400 transition-colors"
                                    aria-label="Eliminar color"
                                >
                                    <HiTrash className="size-4 lg:size-4.5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <SpanError message={errors.colors?.message} />

                <div>
                    <button
                        type="button"
                        onClick={() => append({ name: '', hex: '' })}
                        className="inline-flex cursor-pointer items-center gap-2.5 rounded-lg px-5 py-2.5 text-sm lg:text-base text-primary hover:bg-primary/15 transition-colors duration-300"
                    >
                        <HiPlus className="size-4 lg:size-4.5" />
                        Agregar color
                    </button>
                </div>

            </FormSection>

            <FormSection>
                <FormSectionTitle>Precios</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="retailPrice">Precio menudeo</Label>
                    <Input type="number" id="retailPrice" step="0.01" min="0" placeholder="0.00" {...register("retailPrice", { valueAsNumber: true })} />
                    <SpanError message={errors.retailPrice?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="midWholesalePrice" optional>Precio medio mayoreo</Label>
                    <Input type="number" id="midWholesalePrice" step="0.01" min="0" placeholder="0.00" {...register("midWholesalePrice", { setValueAs: (v) => v === '' ? null : Number(v) })} />
                    <SpanError message={errors.midWholesalePrice?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="wholesalePrice" optional>Precio mayoreo</Label>
                    <Input type="number" id="wholesalePrice" step="0.01" min="0" placeholder="0.00" {...register("wholesalePrice", { setValueAs: (v) => v === '' ? null : Number(v) })} />
                    <SpanError message={errors.wholesalePrice?.message} />
                </div>
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
                    title="Imágenes del producto"
                />
            </FormSection>

            <Button type="submit" width="responsive" loading={createFCDepotProduct.loading} loadingText="Cargando...">
                Crear Producto
            </Button>
        </form>
    )
}
