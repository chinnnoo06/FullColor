'use client'

import { motion } from 'framer-motion'
import { Reveal } from '../../ui/Reveal'
import { SectionTitle } from '../../ui/SectionTitle'
import { LinkButton } from '../../ui/buttons/LinkButton'
import { FeatureScroller } from './FeatureScroller'
import { useHorizontalScroll } from '@/hooks/ui/useHorizontalScroll'
import { fadeUp } from '@/utils/motion/reveal'
import { WEB_FEATURES, WEB_BUSINESS_TYPES } from '@/utils/data/web'
import { SectionCurve } from '@/components/ui/SectionCurve'
import { BulletHex } from '@/components/ui/BulletHex'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const FCWeb = () => {
    const { reduced, outerRef, viewportRef, trackRef, x, progress, distance, top } = useHorizontalScroll()

    return (
        <section id="home-web" data-section="home-web" className="relative bg-fourth py-15 lg:py-20">
            <SectionCurve fill="fill-thrird" />
            <div className="flex flex-col gap-10 lg:gap-15">
                <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                    <Reveal variants={fadeUp} className="flex flex-col gap-5 w-full lg:w-2/3">
                        <div className="flex w-full flex-col gap-2.5">
                            <SectionLabel tone="secondary">FullColor Web</SectionLabel>

                            <SectionTitle as="h2" tone="light" lead="Tu negocio" rotating="en internet" />
                        </div>

                        <p className="text-thrird/75 text-base lg:text-lg">
                            Creamos la página web de tu negocio para que llegue a más clientes. Una web
                            informativa, profesional y efectiva, adaptada al giro de tu empresa y totalmente
                            personalizable.
                        </p>

                        <ul role="list" aria-label="Se adapta a tu giro" className="flex flex-wrap gap-2.5">
                            {WEB_BUSINESS_TYPES.map((type) => (
                                <li
                                    key={type}
                                    className="border-thrird/30 text-thrird/75 flex items-center gap-2.5 rounded-xl border px-2.5 py-2.5 font-barlow text-xs tracking-[0.15em] uppercase lg:text-sm"
                                >
                                    <BulletHex />
                                    {type}
                                </li>
                            ))}
                        </ul>

                        <div className="flex w-full flex-col gap-5 small:flex-row small:flex-wrap small:items-center">
                            <LinkButton href="/web" width="responsive">Conocer Más</LinkButton>

                            <LinkButton href="/contacto" variant="secondary" width="responsive">Cotizar Mi Web</LinkButton>
                        </div>
                    </Reveal>
                </div>

                <div ref={outerRef}>
                    <Reveal variants={fadeUp}>
                        <div
                            ref={viewportRef}
                            className={`flex flex-col gap-10 ${reduced ? 'overflow-x-auto' : 'sticky overflow-hidden'}`}
                            style={{ top }}
                        >
                            <FeatureScroller features={WEB_FEATURES} trackRef={trackRef} x={reduced ? 0 : x} />

                            {!reduced && (
                                <div aria-hidden="true" className="bg-thrird/30 mx-auto h-2 w-40 overflow-hidden rounded-xl">
                                    <motion.div style={{ scaleX: progress }} className="bg-primary h-full w-full origin-left" />
                                </div>
                            )}
                        </div>

                        <div aria-hidden="true" style={{ height: distance }} />
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
