import { getFCServiceService } from "@/services/server/fcService.service";
import { getFCServiceCategoriesService } from "@/services/server/fcServiceCategory.service";
import { EditFCServiceForm } from "@/components/fcServices/form/EditFCServiceForm";
import { BackButton } from "@/components/ui/buttons/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Editar servicio de FC" }

export default async function AdminEditFCServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const [fcService, fcServiceCategories] = await Promise.all([
        getFCServiceService(id),
        getFCServiceCategoriesService(),
    ])

    if (!fcService) notFound();

    return (
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
            <div className="flex flex-col xl:flex-row justify-between gap-5">
                <div className="text-secondary flex flex-col gap-2.5">
                    <SectionLabel>Edita el servicio</SectionLabel>
                    <SectionTitle lead="Editar" rotating="Servicio" as="h1" />
                </div>

                <div className="flex items-center">
                    <BackButton />
                </div>
            </div>

            <EditFCServiceForm fcService={fcService} fcServiceCategories={fcServiceCategories} />
        </section>
    )
}
