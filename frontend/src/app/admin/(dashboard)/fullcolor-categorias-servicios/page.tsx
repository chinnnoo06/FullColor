import type { Metadata } from 'next'

import { LinkButton } from '@/components/ui/buttons/LinkButton'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { FCServiceCategoriesTable } from '@/components/services/categories/table/FCServiceCategoriesTable'
import { getFCServiceCategoriesService } from '@/services/server/fcServiceCategory.service'

export const metadata: Metadata = { title: 'Categorías de servicios FC' }

export default async function AdminFCServiceCategoriesPage() {
    const fcServiceCategories = await getFCServiceCategoriesService()

    return (
        <section className="flex flex-col gap-10 lg:gap-15">
            <div className="flex flex-col xl:flex-row justify-between gap-5">
                <div className="text-secondary flex flex-col gap-2.5">
                    <SectionLabel>Administra las categorías de servicios</SectionLabel>
                    <SectionTitle lead="Categorías de" rotating="Servicios" as="h1" />
                </div>

                <div className="flex items-center">
                    <LinkButton href="/admin/fullcolor-categorias-servicios/crear">Crear Categoría</LinkButton>
                </div>
            </div>

            <FCServiceCategoriesTable fcServiceCategories={fcServiceCategories} />
        </section>
    )
}
