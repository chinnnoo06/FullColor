'use client'

import { createRef, useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Reveal } from '../../ui/Reveal'
import { SectionTitle } from '../../ui/SectionTitle'
import { LinkButton } from '../../ui/buttons/LinkButton'
import { FCServiceCategoryCard } from './FCServiceCategoryCard'
import { type TServiceCardRef } from './types'
import { fadeUp, staggerParent } from '@/utils/motion/reveal'
import { SectionCurve } from '@/components/ui/SectionCurve'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TFCServiceCategory } from '@/schemas/fcServiceCategory/fcServiceCategory.schemas'

export const FCServices = ({ fcServiceCategories }: { fcServiceCategories: TFCServiceCategory[] }) => {
    const refs = useMemo<TServiceCardRef[]>(
        () => fcServiceCategories.map(() => createRef<HTMLLIElement>()),
        []
    )

    const listRef = useRef<HTMLUListElement>(null)
    const inView = useInView(listRef, { once: true, amount: 0.1 })

    return (
        <section id="home-services" data-section="home-services" className="relative bg-fourth py-15 lg:py-20">
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-15">
                    <Reveal variants={fadeUp} className="flex w-full flex-col gap-5 lg:sticky lg:top-25 lg:w-[50%] xl:w-[40%]">
                        <div className="flex flex-col gap-2.5">
                            <SectionLabel tone="secondary">Servicios</SectionLabel>
                            <SectionTitle as="h2" tone="light" lead="Lo que" rotating="hacemos" />
                        </div>

                        <p className="text-thrird/75 text-base lg:text-lg">
                            Impresión, personalización, publicidad y desarrollo web en un solo lugar.
                            Elige el servicio que necesitas y cotízalo con nosotros.
                        </p>

                        <LinkButton href="/servicios">Conocer Más</LinkButton>
                    </Reveal>

                    <motion.ul
                        ref={listRef}
                        role="list"
                        className="flex w-full flex-col gap-5 lg:w-[50%] xl:w-[60%]"
                        variants={staggerParent(0.15, 0)}
                        initial="hidden"
                        animate={inView ? 'show' : 'hidden'}
                    >
                        {fcServiceCategories.map((fcServiceCategory, i) => (
                            <FCServiceCategoryCard
                                key={fcServiceCategory.slug}
                                fcServiceCategory={fcServiceCategory}
                                index={i}
                                cardRef={refs[i]}
                                nextRef={refs[i + 1]}
                            />
                        ))}
                    </motion.ul>
                </div>
            </div>
            <SectionCurve fill="fill-thrird" direction='bottom' />
        </section>
    )
}
