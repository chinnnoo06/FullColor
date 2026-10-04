"use client"

import { useEffect, useState } from "react";
import { FiAlertTriangle } from 'react-icons/fi';
import { toast } from "react-toastify";

import { UpdateFCServiceImagesFormSchema } from '@/schemas/fcService/fcService.form.schemas';
import { TFCService } from "@/schemas/fcService/fcService.schemas";
import { useFCService } from "@/hooks/useFCService";
import { Button } from "@/components/ui/buttons/Button";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { ImagesField } from "@/components/ui/form/ImagesField";
import { CurrentFCServiceImages } from "./CurrentFCServiceImages";

export const EditFCServiceImagesForm = ({ fcService }: { fcService: TFCService }) => {
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<string>();

    const { updateFCServiceImage } = useFCService();

    useEffect(() => {
        if (updateFCServiceImage.error) toast.error(updateFCServiceImage.error);
        if (updateFCServiceImage.success) toast.success(updateFCServiceImage.success);
    }, [updateFCServiceImage.error, updateFCServiceImage.success]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsed = UpdateFCServiceImagesFormSchema.safeParse({ images });

        if (!parsed.success) {
            return setError(parsed.error.issues[0]?.message ?? "Revisa las imágenes");
        }

        setError(undefined);
        updateFCServiceImage.handleUpdateFCServiceImage(fcService._id, parsed.data);
    };

    return (
        <form className="space-y-10" onSubmit={onSubmit} noValidate>
            <FormSection>
                <FormSectionTitle>Imágenes actuales</FormSectionTitle>

                <CurrentFCServiceImages images={fcService.images} name={fcService.name} />

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

            <Button type="submit" width="full" loading={updateFCServiceImage.loading} loadingText="Guardando...">
                Reemplazar imágenes
            </Button>
        </form>
    )
}
