"use client"

import { useEffect, useState } from "react";
import { FiAlertTriangle } from 'react-icons/fi';
import { toast } from "react-toastify";

import { UpdateFCDepotProductImagesFormSchema } from '@/schemas/fcDepotProduct/fcDepotProduct.form.schemas';
import { TFCDepotProduct } from "@/schemas/fcDepotProduct/fcDepotProduct.schemas";
import { useFCDepotProduct } from "@/hooks/useFCDepotProduct";
import { Button } from "@/components/ui/buttons/Button";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { ImagesField } from "@/components/ui/form/ImagesField";
import { CurrentFCDepotProductImages } from "./CurrentFCDepotProductImages";

export const EditFCDepotProductImagesForm = ({ fcDepotProduct }: { fcDepotProduct: TFCDepotProduct }) => {
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<string>();

    const { updateFCDepotProductImage } = useFCDepotProduct();

    useEffect(() => {
        if (updateFCDepotProductImage.error) toast.error(updateFCDepotProductImage.error);
        if (updateFCDepotProductImage.success) toast.success(updateFCDepotProductImage.success);
    }, [updateFCDepotProductImage.error, updateFCDepotProductImage.success]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsed = UpdateFCDepotProductImagesFormSchema.safeParse({ images });

        if (!parsed.success) {
            return setError(parsed.error.issues[0]?.message ?? "Revisa las imágenes");
        }

        setError(undefined);
        updateFCDepotProductImage.handleUpdateFCDepotProductImage(fcDepotProduct._id, parsed.data);
    };

    return (
        <form className="space-y-10" onSubmit={onSubmit} noValidate>
            <FormSection>
                <FormSectionTitle>Imágenes actuales</FormSectionTitle>

                <CurrentFCDepotProductImages images={fcDepotProduct.images} name={fcDepotProduct.name} />

                <p className="text-fourth/75 flex items-start gap-2.5 text-xs lg:text-sm">
                    <FiAlertTriangle aria-hidden="true" className="mt-0.5 size-4 lg:size-4.5 shrink-0 text-red-600" />
                    Al guardar, estas imágenes se reemplazan por las nuevas y se borran del
                    servidor. Para conservar alguna, vuelve a subirla junto con las demás.
                </p>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Nuevas imágenes</FormSectionTitle>

                <ImagesField images={images} onChange={setImages} error={error} title="Imágenes" />
            </FormSection>

            <Button type="submit" width="full" loading={updateFCDepotProductImage.loading} loadingText="Guardando...">
                Reemplazar imágenes
            </Button>
        </form>
    )
}
