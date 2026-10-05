import { getFCServiceCategoryService } from "@/services/server/fcServiceCategory.service"
import { EditFCServiceCategoryForm } from "@/components/services/categories/form/EditFCServiceCategoryForm"
import { BackButton } from "@/components/ui/buttons/BackButton"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Editar categoría de servicio FC" }

export default async function AdminEditFCServiceCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const fcServiceCategory = await getFCServiceCategoryService(id)

    if (!fcServiceCategory) notFound()

    return (
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
            <div className="flex flex-col xl:flex-row justify-between gap-5">
                <div className="text-secondary flex flex-col gap-2.5">
                    <SectionLabel>Edita la categoría</SectionLabel>
                    <SectionTitle lead="Editar" rotating="Categoría" as="h1" />
                </div>

                <div className="flex items-center">
                    <BackButton />
                </div>
            </div>

            <EditFCServiceCategoryForm fcServiceCategory={fcServiceCategory} />
        </section>
    )
}
