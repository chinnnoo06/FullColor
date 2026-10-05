'use client'

import { useState } from 'react'
import Image from 'next/image'

type TFCDepotProductGalleryProps = {
    images: string[]
    name: string
    imageUrl: string
}

export const FCDepotProductGallery = ({ images, name, imageUrl }: TFCDepotProductGalleryProps) => {
    const [active, setActive] = useState(0)

    if (images.length === 0) return null

    return (
        <div className="flex flex-col gap-2.5 2xl:flex-row-reverse 2xl:items-start max-w-xl mx-auto">
            <div className="relative aspect-3/4 w-full flex-1 overflow-hidden rounded-xl bg-fourth/5">
                <Image
                    src={`${imageUrl}/${images[active]}`}
                    alt={name}
                    fill
                    sizes="(min-width: 1280px) 35vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover object-center"
                    priority
                />
            </div>

            {images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto 2xl:flex-col 2xl:overflow-x-visible 2xl:overflow-y-auto">
                    {images.map((img, i) => (
                        <button
                            key={img}
                            onClick={() => setActive(i)}
                            aria-label={`Ver imagen ${i + 1}`}
                            className={`relative size-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors duration-200 lg:size-25 ${
                                i === active
                                    ? 'border-primary'
                                    : 'border-fourth/30 hover:border-fourth/60'
                            }`}
                        >
                            <Image
                                src={`${imageUrl}/${img}`}
                                alt={`${name} – imagen ${i + 1}`}
                                fill
                                sizes="(min-width: 1024px) 100px, 80px"
                                className="object-cover object-center"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
