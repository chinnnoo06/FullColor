import { getFCServiceService } from "@/services/server/fcServices.service";
import { EditFCServiceImagesForm } from "@/components/fcServices/form/images/EditFCServiceImagesForm";
import { BackButton } from "@/components/ui/buttons/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Imágenes del servicio de FC" }

export default async function AdminEditFCServiceImagesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const fcService = await getFCServiceService(id);

    if (!fcService) notFound();

    return (
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
            <div className="flex flex-col xl:flex-row justify-between gap-5">
                <div className="text-secondary flex flex-col gap-2.5">
                    <SectionLabel>Edita las imágenes</SectionLabel>
                    <SectionTitle lead="Imágenes" rotating="Servicio" as="h1" />
                </div>

                <div className="flex items-center">
                    <BackButton />
                </div>
            </div>

            <EditFCServiceImagesForm fcService={fcService} />
        </section>
    )
}
