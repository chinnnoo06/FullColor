'use client'

import Image from 'next/image'
import Link from 'next/link'
import { TFCDepotProduct } from '@/schemas/fcDepotProduct/fcDepotProduct.schemas'
import { SpanButton } from '@/components/ui/buttons/SpanButton'
import { saveDepotOrigin } from '@/utils/fcDepotCatalogOrigin'

type TFCDepotProductCardProps = {
    fcDepotProduct: TFCDepotProduct
    page: number
}

const MAX_COLORS = 5

const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(price)

export const FCDepotProductCard = ({ fcDepotProduct, page }: TFCDepotProductCardProps) => {
    const image = fcDepotProduct.images[0]

    return (
        <Link
            href={`/depot/${fcDepotProduct.slug}`}
            data-product-id={fcDepotProduct._id}
            onClick={() => saveDepotOrigin({ page, productId: fcDepotProduct._id })}
            className="group border-fourth/30 hover:border-primary/30 flex flex-col overflow-hidden rounded-xl border transition-colors duration-300"
        >
            <div className="relative aspect-4/5 w-full overflow-hidden bg-fourth/5">
                {image && (
                    <Image
                        src={`${process.env.NEXT_PUBLIC_FC_DEPOT_PRODUCTS_IMAGE_URL}/${image}`}
                        alt={fcDepotProduct.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center"
                    />
                )}

                {fcDepotProduct.colors.length > 0 && (
                    <div className="absolute flex flex-col gap-1.5 rounded-r-xl bg-black/40 p-1.5 lg:p-2.5 backdrop-blur-sm">
                        {fcDepotProduct.colors.slice(0, MAX_COLORS).map((color) => (
                            <span
                                key={color.hex}
                                title={color.name}
                                aria-label={color.name}
                                className="size-4 rounded-full border border-fourth/30 shadow-sm lg:size-4.5"
                                style={{ backgroundColor: color.hex }}
                            />
                        ))}
                    </div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute inset-2.5 lg:inset-5 flex translate-y-2 items-center justify-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <SpanButton width='full'>Ver más</SpanButton>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 p-2.5 lg:p-5">
                <h3 className="font-barlow text-fourth group-hover:text-primary line-clamp-2 text-xl lg:text-2xl font-bold uppercase transition-colors duration-300">
                    {fcDepotProduct.name}
                </h3>

                <p className="font-barlow text-primary mt-auto text-lg font-semibold lg:text-xl">
                    {formatPrice(fcDepotProduct.retailPrice)} MXN
                </p>
            </div>
        </Link>
    )
}
