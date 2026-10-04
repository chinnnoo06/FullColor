import Image from 'next/image'
import { Marquee } from '@/components/ui/Marquee'
import { TProduct } from '@/types/content.types'

export const ProductSlider = ({ products }: { products: TProduct[] }) => {
    const track = [...products, ...products, ...products]

    return (
        <Marquee duration={40} gap={20}>
            {track.map((product, i) => (
                <figure key={`${product.name}-${i}`} className="flex w-30 flex-col gap-2.5 lg:w-40">
                    <span className="border-fourth/30 bg-thrird relative aspect-square w-full overflow-hidden rounded-xl border">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="160px"
                            className="object-cover object-center"
                        />
                    </span>
                    <figcaption className="font-barlow text-fourth/75 text-xs lg:text-sm tracking-[0.15em] uppercase truncate">
                        {product.name}
                    </figcaption>
                </figure>
            ))}
        </Marquee>
    )
}
