import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Pagination } from '@/components/ui/Pagination'
import { TFCServiceCategory } from '@/schemas/fcServiceCategory/fcServiceCategory.schemas'
import { TFCService } from '@/schemas/fcService/fcService.schemas'
import { TPagination } from '@/schemas/common/common.response.schemas'
import { FCServiceCard } from './FCServiceCard'
import { FCServiceCategorySelector } from './FCServiceCategorySelector'

type TFCServicesCatalogProps = {
    fcServiceCategories: TFCServiceCategory[]
    fcServices: TFCService[]
    pagination: TPagination
    currentCategory?: string
}

export const FCServicesCatalog = ({ fcServiceCategories, fcServices, pagination, currentCategory }: TFCServicesCatalogProps) => {
    const basePath = currentCategory ? `/servicios?categoria=${currentCategory}` : '/servicios'

    return (
        <section id="services-catalog" data-section="services-catalog" className="scroll-mt-15 lg:scroll-mt-20 bg-thrird py-15 lg:py-20">
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <div className="flex flex-col gap-10 lg:gap-15">

                    <div className='flex flex-col gap-5'>
                        <div className="flex flex-col gap-2.5">
                            <SectionLabel>Catálogo</SectionLabel>
                            <SectionTitle as="h2" lead="Nuestros" rotating="servicios" />
                        </div>

                        <FCServiceCategorySelector
                            categories={fcServiceCategories}
                            currentSlug={currentCategory}
                        />
                    </div>

                    {fcServices.length === 0 ? (
                        <p className="text-fourth/75 text-base lg:text-lg">
                            No hay servicios en esta categoría todavía.
                        </p>
                    ) : (
                        <ul role="list" className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                            {fcServices.map((fcService) => (
                                <FCServiceCard key={fcService._id} fcService={fcService} />
                            ))}
                        </ul>
                    )}

                    <Pagination pagination={pagination} basePath={basePath} anchor="services-catalog" />
                </div>
            </div>
        </section>
    )
}
