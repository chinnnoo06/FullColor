'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Reveal } from '../../ui/Reveal'
import { SectionTitle } from '../../ui/SectionTitle'
import { SectionLabel } from '../../ui/SectionLabel'
import { fadeUp, staggerParent } from '@/utils/motion/reveal'
import { WHATSAPP_LINE_CARDS } from '@/utils/data/contact'
import { WhatsAppLineCard } from './WhatsAppLineCard'
import { SectionCurve } from '@/components/ui/SectionCurve'

export const WhatsAppLines = () => {
    const gridRef = useRef<HTMLDivElement>(null)
    const inView = useInView(gridRef, { once: true, amount: 0.1 })

    return (
        <section id="contact-lines" data-section="contact-lines" className="relative bg-fourth py-15 lg:py-20">
            <SectionCurve fill="fill-thrird" />
            <div className="flex flex-col gap-10 lg:gap-15 mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <Reveal variants={fadeUp} className="flex flex-col gap-2.5">
                    <SectionLabel tone="secondary">Líneas de contacto</SectionLabel>
                    <SectionTitle as="h2" tone="light" lead="Habla con la" rotating="línea correcta" />
                </Reveal>

                <motion.div
                    ref={gridRef}
                    className="grid grid-cols-1 gap-5 lg:grid-cols-2"
                    variants={staggerParent(0.15, 0)}
                    initial="hidden"
                    animate={inView ? 'show' : 'hidden'}
                >
                    {WHATSAPP_LINE_CARDS.map((line, index) => (
                        <WhatsAppLineCard key={line.key} line={line} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
