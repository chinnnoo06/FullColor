'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Marquee } from '@/components/ui/Marquee'
import { TFCDepotProduct } from '@/schemas/fcDepotProduct/fcDepotProduct.schemas'

const IMAGE_URL = process.env.NEXT_PUBLIC_FC_DEPOT_PRODUCTS_IMAGE_URL!

const MAX_COLORS = 3

const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(price)

export const ProductSlider = ({ products }: { products: TFCDepotProduct[] }) => {
    const track = [...products, ...products, ...products]

    return (
        <Marquee duration={40} gap={20}>
            {track.map((product, i) => (
                <Link
                    key={`${product._id}-${i}`}
                    href={`/depot/${product.slug}`}
                    className="group border-fourth/30 hover:border-primary/30 flex w-30 lg:w-40 shrink-0 flex-col overflow-hidden rounded-xl border transition-colors duration-300"
                >
                    <div className="relative aspect-4/5 w-full overflow-hidden bg-fourth/5">
                        {product.images[0] && (
                            <Image
                                src={`${IMAGE_URL}/${product.images[0]}`}
                                alt={product.name}
                                fill
                                sizes="160px"
                                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            />
                        )}

                        {product.colors.length > 0 && (
                            <div className="absolute flex flex-col gap-1 rounded-r-lg bg-black/40 p-1 backdrop-blur-sm">
                                {product.colors.slice(0, MAX_COLORS).map((color) => (
                                    <span
                                        key={color.hex}
                                        title={color.name}
                                        aria-label={color.name}
                                        className="size-2.5 lg:size-3 rounded-full border border-fourth/30 shadow-sm"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5 p-2.5">
                        <p className="font-barlow text-fourth group-hover:text-primary line-clamp-1 text-xs lg:text-sm font-bold uppercase transition-colors duration-300">
                            {product.name}
                        </p>
                        <p className="font-barlow text-primary text-xs font-semibold lg:text-sm">
                            {formatPrice(product.retailPrice)}
                        </p>
                    </div>
                </Link>
            ))}
        </Marquee>
    )
}
