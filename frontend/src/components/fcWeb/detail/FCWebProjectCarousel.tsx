'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const ARROW =
    'cursor-pointer border-fourth/30 text-fourth/75 hover:bg-primary hover:text-thrird flex px-5 py-2.5 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300'

type TFCWebProjectCarouselProps = {
    images: string[]
    name: string
}

export const FCWebProjectCarousel = ({ images, name }: TFCWebProjectCarouselProps) => {
    const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start', duration: 25 })
    const [selected, setSelected] = useState(0)

    const prev = useCallback(() => embla?.scrollPrev(), [embla])
    const next = useCallback(() => embla?.scrollNext(), [embla])

    useEffect(() => {
        if (!embla) return
        const onSelect = () => setSelected(embla.selectedScrollSnap())
        onSelect()
        embla.on('select', onSelect)
        return () => { embla.off('select', onSelect) }
    }, [embla])

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
        if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    }

    const many = images.length > 1

    return (
        <div className="flex flex-col gap-5">
            <div
                role="region"
                aria-roledescription="carousel"
                aria-label={`Galería del proyecto ${name}`}
                tabIndex={many ? 0 : undefined}
                onKeyDown={many ? onKeyDown : undefined}
            >
                <div ref={emblaRef} className="overflow-hidden rounded-xl">
                    <div className="flex">
                        {images.map((image, i) => (
                            <div
                                key={image}
                                className="min-w-0 shrink-0 grow-0 basis-full"
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${i + 1} de ${images.length}`}
                                aria-hidden={selected !== i}
                            >
                                <div className="relative aspect-[21/10] w-full overflow-hidden">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_FC_WEB_PROJECTS_IMAGE_URL}/${image}`}
                                        alt={`${name}, imagen ${i + 1}`}
                                        fill
                                        priority={i === 0}
                                        sizes="(min-width: 1272px) 1152px, (min-width: 1024px) calc(100vw - 120px), calc(100vw - 40px)"
                                        className="object-cover object-center"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {many && (
                <div className="flex items-center justify-center gap-5">
                    <button type="button" onClick={prev} aria-label="Anterior" className={ARROW}>
                        <FaChevronLeft aria-hidden="true" className="size-4 lg:size-4.5" />
                    </button>

                    <ul className="flex items-center gap-2.5">
                        {images.map((image, i) => (
                            <li key={image}>
                                <button
                                    type="button"
                                    onClick={() => embla?.scrollTo(i)}
                                    aria-label={`Ir a la imagen ${i + 1}`}
                                    aria-current={selected === i}
                                    className={`cursor-pointer size-2 lg:size-2.5 rounded-full transition-colors duration-300 ${selected === i ? 'bg-primary' : 'bg-fourth/30 hover:bg-primary/75'}`}
                                />
                            </li>
                        ))}
                    </ul>

                    <button type="button" onClick={next} aria-label="Siguiente" className={ARROW}>
                        <FaChevronRight aria-hidden="true" className="size-4 lg:size-4.5" />
                    </button>
                </div>
            )}
        </div>
    )
}
