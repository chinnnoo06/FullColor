import { CreateFCServiceForm } from '@/components/services/form/CreateFCServiceForm'
import { BackButton } from '@/components/ui/buttons/BackButton'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { getFCServiceCategoriesService } from '@/services/server/fcServiceCategory.service'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Crear servicio de FC' }

export default async function AdminCreateFCServicePage() {
    const fcServiceCategories = await getFCServiceCategoriesService()

    return (
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
            <div className="flex flex-col xl:flex-row justify-between gap-5">
                <div className="text-secondary flex flex-col gap-2.5">
                    <SectionLabel>Agrega un nuevo servicio</SectionLabel>
                    <SectionTitle lead="Crear" rotating="Servicio" as='h1' />
                </div>

                <div className="flex items-center">
                    <BackButton />
                </div>
            </div>

            <CreateFCServiceForm fcServiceCategories={fcServiceCategories} />
        </section>
    )
}
