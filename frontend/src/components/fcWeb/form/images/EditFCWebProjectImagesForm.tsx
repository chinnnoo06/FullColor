"use client"

import { useEffect, useState } from "react";
import { FiAlertTriangle } from 'react-icons/fi';
import { toast } from "react-toastify";

import { UpdateFCWebProjectImagesFormSchema } from '@/schemas/fcWebProject/fcWebProject.form.schemas';
import { TFCWebProject } from "@/schemas/fcWebProject/fcWebProject.schemas";
import { useFCWebProject } from "@/hooks/useFCWebProject";
import { Button } from "@/components/ui/buttons/Button";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { ImagesField } from "@/components/ui/form/ImagesField";
import { CurrentFCWebProjectImages } from "./CurrentFCWebProjectImages";

export const EditFCWebProjectImagesForm = ({ fcWebProject }: { fcWebProject: TFCWebProject }) => {
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<string>();

    const { updateFCWebProjectImage } = useFCWebProject();

    useEffect(() => {
        if (updateFCWebProjectImage.error) toast.error(updateFCWebProjectImage.error);
        if (updateFCWebProjectImage.success) toast.success(updateFCWebProjectImage.success);
    }, [updateFCWebProjectImage.error, updateFCWebProjectImage.success]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsed = UpdateFCWebProjectImagesFormSchema.safeParse({ images });

        if (!parsed.success) {
            return setError(parsed.error.issues[0]?.message ?? "Revisa las imágenes");
        }

        setError(undefined);
        updateFCWebProjectImage.handleUpdateFCWebProjectImage(fcWebProject._id, parsed.data);
    };

    return (
        <form className="space-y-10" onSubmit={onSubmit} noValidate>
            <FormSection>
                <FormSectionTitle>Imágenes actuales</FormSectionTitle>

                <CurrentFCWebProjectImages images={fcWebProject.images} name={fcWebProject.name} />

                <p className="text-fourth/75 flex items-start gap-2.5 text-xs lg:text-sm">
                    <FiAlertTriangle aria-hidden="true" className="mt-0.5 size-4 lg:size-4.5 shrink-0 text-red-600" />
                    Al guardar, estas imágenes se reemplazan por las nuevas y se borran del
                    servidor. Para conservar alguna, vuelve a subirla junto con las demás.
                </p>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Nuevas imágenes</FormSectionTitle>

                <ImagesField images={images} onChange={setImages} error={error} title="Imágenes" max={10} />
            </FormSection>

            <Button type="submit" width="full" loading={updateFCWebProjectImage.loading} loadingText="Guardando...">
                Reemplazar imágenes
            </Button>
        </form>
    )
}
