'use client'

import { createRef, useMemo } from 'react'
import { Reveal } from '../../ui/Reveal'
import { SectionTitle } from '../../ui/SectionTitle'
import { LinkButton } from '../../ui/buttons/LinkButton'
import { ServiceCard } from './ServiceCard'
import { fadeUp, fadeUpScale } from '@/utils/motion/reveal'
import { SERVICES } from '@/utils/data/services'
import { SectionCurve } from '@/components/ui/SectionCurve'
import { SectionLabel } from '@/components/ui/SectionLabel'

const PREVIEW_COUNT = 6

export const Services = () => {
    const services = useMemo(() => SERVICES.slice(0, PREVIEW_COUNT), [])
    const refs = useMemo(() => services.map(() => createRef<HTMLLIElement>()), [services])

    return (
        <section id="servicios" data-section="home-services" className="relative bg-fourth py-15 lg:py-20">
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

                        <LinkButton href="/servicios">Conocer más</LinkButton>
                    </Reveal>

                    <Reveal variants={fadeUpScale} className='w-full lg:w-[50%] xl:w-[60%]'>
                        <ul role="list" className="flex w-full flex-col gap-5 ">
                            {services.map((service, i) => (
                                <ServiceCard
                                    key={service.slug}
                                    service={service}
                                    index={i}
                                    cardRef={refs[i]}
                                    nextRef={refs[i + 1]}
                                />
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </div>
            <SectionCurve fill="fill-thrird" direction='bottom' />
        </section>
    )
}
