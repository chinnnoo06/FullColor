import { CreateFCWebProjectForm } from "@/components/fcWeb/form/CreateFCWebProjectForm";
import { BackButton } from "@/components/ui/buttons/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Crear proyecto web de FC" }

export default function AdminCreateFCWebProjectPage() {
    return (
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
            <div className="flex flex-col xl:flex-row justify-between gap-5">
                <div className="text-secondary flex flex-col gap-2.5">
                    <SectionLabel>Agrega un nuevo proyecto</SectionLabel>
                    <SectionTitle lead="Crear" rotating="Proyecto" as="h1" />
                </div>

                <div className="flex items-center">
                    <BackButton />
                </div>
            </div>

            <CreateFCWebProjectForm />
        </section>
    )
}
