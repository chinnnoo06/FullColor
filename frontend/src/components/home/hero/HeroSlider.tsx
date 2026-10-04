import Image, { type StaticImageData } from 'next/image'
import { Marquee } from '@/components/ui/Marquee'
import img8 from '@/assets/media/img8.webp'
import img9 from '@/assets/media/img9.webp'
import img10 from '@/assets/media/img10.webp'
import img11 from '@/assets/media/img11.webp'
import img12 from '@/assets/media/img12.webp'
import img13 from '@/assets/media/img13.webp'
import img14 from '@/assets/media/img14.webp'

type TSlide = {
    image: StaticImageData
    alt: string
    label: string
    shape: 'tall' | 'wide'
}

const HERO_SLIDES: TSlide[] = [
    { image: img8, alt: 'Set de termos negros grabados con el logo de Full Color', label: 'Termos grabados', shape: 'wide' },
    { image: img9, alt: 'Playeras negras con estampado DTF a todo color', label: 'Playeras DTF', shape: 'tall' },
    { image: img10, alt: 'Botella térmica negra con grabado láser', label: 'Grabado láser', shape: 'tall' },
    { image: img11, alt: 'Rollo de vinil impreso con el logo de Full Color', label: 'Vinil impreso', shape: 'wide' },
    { image: img12, alt: 'Playeras deportivas personalizadas con logo', label: 'Textil personalizado', shape: 'tall' },
    { image: img13, alt: 'Plotter imprimiendo stickers de Full Color', label: 'Stickers', shape: 'wide' },
    { image: img14, alt: 'Bolsa de papel kraft impresa con logotipo', label: 'Bolsas impresas', shape: 'tall' },
]

const TRACK = [...HERO_SLIDES, ...HERO_SLIDES]

const SHAPE = {
    tall: 'w-45 lg:w-70',
    wide: 'w-80 lg:w-125',
} as const

const SLIDE_SIZES = {
    tall: '(min-width: 1024px) 280px, 180px',
    wide: '(min-width: 1024px) 500px, 320px',
} as const

import { BulletHex } from '@/components/ui/BulletHex'

export const HeroSlider = () => {
    return (
        <Marquee duration={70} gap={20}>
            {TRACK.map((slide, i) => (
                <figure
                    key={`${slide.label}-${i}`}
                    className={`border-fourth/30 group relative h-60 shrink-0 overflow-hidden rounded-xl border lg:h-95 ${SHAPE[slide.shape]}`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.alt}
                        sizes={SLIDE_SIZES[slide.shape]}
                        loading="eager"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <figcaption className="from-thrird/75 absolute inset-x-0 bottom-0 flex items-center gap-2.5 bg-linear-to-t to-transparent p-5 pt-10">
                        <BulletHex />
                        <span className="font-barlow text-fourth/75 text-xs tracking-[0.15em] uppercase lg:text-sm truncate">
                            {slide.label}
                        </span>
                    </figcaption>
                </figure>
            ))}
        </Marquee>
    )
}
