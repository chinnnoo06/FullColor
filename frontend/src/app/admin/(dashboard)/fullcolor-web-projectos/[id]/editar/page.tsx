import { getFCWebProjectByIdService } from "@/services/server/fcWebProject.service";
import { EditFCWebProjectForm } from "@/components/fcWeb/form/EditFCWebProjectForm";
import { BackButton } from "@/components/ui/buttons/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Editar proyecto web de FC" }

export default async function AdminEditFCWebProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const fcWebProject = await getFCWebProjectByIdService(id);

    if (!fcWebProject) notFound();

    return (
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
            <div className="flex flex-col xl:flex-row justify-between gap-5">
                <div className="text-secondary flex flex-col gap-2.5">
                    <SectionLabel>Edita el proyecto</SectionLabel>
                    <SectionTitle lead="Editar" rotating="Proyecto" as="h1" />
                </div>

                <div className="flex items-center">
                    <BackButton />
                </div>
            </div>

            <EditFCWebProjectForm fcWebProject={fcWebProject} />
        </section>
    )
}
