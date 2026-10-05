'use client'

import { createRef, useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Reveal } from '../../ui/Reveal'
import { SectionTitle } from '../../ui/SectionTitle'
import { SectionLabel } from '../../ui/SectionLabel'
import { fadeUp, staggerParent } from '@/utils/motion/reveal'
import { ProcessCard, type TProcessCardRef } from './ProcessCard'
import { CONTACT_STEPS } from '@/utils/data/contact'
import { SectionCurve } from '@/components/ui/SectionCurve'

export const Process = () => {
    const refs = useMemo<TProcessCardRef[]>(
        () => CONTACT_STEPS.map(() => createRef<HTMLLIElement>()),
        []
    )

    const listRef = useRef<HTMLUListElement>(null)
    const inView = useInView(listRef, { once: true, amount: 0.1 })

    return (
        <section id="contacto-proceso" data-section="contacto-proceso" className="relative bg-fourth py-15 lg:py-20">
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-15">

                    <Reveal variants={fadeUp} className="flex w-full flex-col gap-5 lg:sticky lg:top-25 lg:w-[50%] xl:w-[40%]">
                        <div className="flex flex-col gap-2.5">
                            <SectionLabel tone="secondary">¿Cómo funciona?</SectionLabel>
                            <SectionTitle as="h2" tone="light" lead="Así de" rotating="sencillo" />
                        </div>

                        <p className="text-thrird/75 text-base lg:text-lg">
                            Desde que nos escribes hasta que recibes tu pedido, el proceso es rápido, claro y sin sorpresas.
                        </p>
                    </Reveal>

                    <motion.ul
                        ref={listRef}
                        role="list"
                        className="flex w-full flex-col gap-5 lg:w-[50%] xl:w-[60%]"
                        variants={staggerParent(0.18, 0)}
                        initial="hidden"
                        animate={inView ? 'show' : 'hidden'}
                    >
                        {CONTACT_STEPS.map((s, i) => (
                            <ProcessCard
                                key={s.step}
                                {...s}
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
