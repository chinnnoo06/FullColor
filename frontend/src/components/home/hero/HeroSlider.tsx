import Image from 'next/image'
import { Marquee } from '@/components/ui/Marquee'
import { BulletHex } from '@/components/ui/BulletHex'
import { HERO_SLIDES } from '@/utils/data/hero'

const TRACK = [...HERO_SLIDES, ...HERO_SLIDES]

const SHAPE = {
    tall: 'w-45 lg:w-70',
    wide: 'w-80 lg:w-125',
} as const

const SLIDE_SIZES = {
    tall: '(min-width: 1024px) 280px, 180px',
    wide: '(min-width: 1024px) 500px, 320px',
} as const

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