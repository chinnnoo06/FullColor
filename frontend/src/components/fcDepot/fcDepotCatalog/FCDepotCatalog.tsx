import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { PublicPagination } from '@/components/ui/PublicPagination'
import { TFCDepotProduct } from '@/schemas/fcDepotProduct/fcDepotProduct.schemas'
import { TPagination } from '@/schemas/common/common.response.schemas'
import { FCDepotProductCard } from './FCDepotProductCard'

type TFCDepotCatalogProps = {
    fcDepotProducts: TFCDepotProduct[]
    pagination: TPagination
}

export const FCDepotCatalog = ({ fcDepotProducts, pagination }: TFCDepotCatalogProps) => {
    return (
        <section id="depot-catalogo" data-section="depot-catalogo" className="scroll-mt-15 lg:scroll-mt-20 bg-thrird py-15 lg:py-20">
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <div className="flex flex-col gap-10 lg:gap-15">

                    <div className="flex flex-col gap-2.5">
                        <SectionLabel>Catálogo</SectionLabel>
                        <SectionTitle as="h2" lead="Nuestros" rotating="productos" />
                    </div>

                    {fcDepotProducts.length === 0 ? (
                        <p className="text-fourth/75 text-base lg:text-lg">
                            No hay productos disponibles todavía.
                        </p>
                    ) : (
                        <ul role="list" className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                            {fcDepotProducts.map((product) => (
                                <li key={product._id}>
                                    <FCDepotProductCard fcDepotProduct={product} page={pagination.page} />
                                </li>
                            ))}
                        </ul>
                    )}

                    <PublicPagination pagination={pagination} basePath="/depot" anchor="depot-catalogo" />
                </div>
            </div>
        </section>
    )
}
