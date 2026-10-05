import { CreateFCServiceCategoryForm } from '@/components/services/categories/form/CreateFCServiceCategoryForm'
import { BackButton } from '@/components/ui/buttons/BackButton'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Crear categoría de servicio FC' }

export default function AdminCreateFCServiceCategoryPage() {
    return (
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
            <div className="flex flex-col xl:flex-row justify-between gap-5">
                <div className="text-secondary flex flex-col gap-2.5">
                    <SectionLabel>Agrega una nueva categoría</SectionLabel>
                    <SectionTitle lead="Crear" rotating="Categoría" as="h1" />
                </div>

                <div className="flex items-center">
                    <BackButton />
                </div>
            </div>

            <CreateFCServiceCategoryForm />
        </section>
    )
}
