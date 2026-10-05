'use client'

import { useCallback, useEffect, useRef, type RefObject } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { TContactProcessStep } from '@/types/content.types'
import { stackCardRange, stackCardScaleAt, stackCardTop, type TStackRange } from '@/utils/motion/stack'
import { staggerItem } from '@/utils/motion/reveal'

export type TProcessCardRef = RefObject<HTMLLIElement | null>

type TProcessCardProps = TContactProcessStep & {
    index: number
    cardRef: TProcessCardRef
    nextRef?: TProcessCardRef
}

export const ProcessCard = ({ step, title, detail, index, cardRef, nextRef }: TProcessCardProps) => {
    const reduced = useReducedMotion()
    const { scrollY } = useScroll()
    const range = useRef<TStackRange | null>(null)

    const measure = useCallback(() => {
        const card = cardRef.current
        const next = nextRef?.current
        range.current = card && next ? stackCardRange(index, card, next) : null
    }, [cardRef, nextRef, index])

    useEffect(() => {
        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [measure])

    const scale = useTransform(scrollY, (y) => stackCardScaleAt(y, range.current))

    return (
        <motion.li
            ref={cardRef}
            variants={staggerItem}
            style={{ top: stackCardTop(index), scale: reduced ? 1 : scale }}
            className="sticky origin-top list-none"
        >
            <div className="flex items-stretch overflow-hidden rounded-xl bg-thrird">
                <span className="bg-primary w-1 shrink-0" />

                <div className="flex flex-1 flex-col justify-center gap-2.5 p-5 lg:p-10">
                    <span className="text-primary font-barlow text-xs lg:text-sm tracking-[0.15em] font-semibold">
                        {step}
                    </span>

                    <h3 className="font-barlow text-fourth font-bold uppercase text-2xl lg:text-3xl">
                        {title}
                    </h3>

                    <p className="text-fourth/75 text-base lg:text-lg">
                        {detail}
                    </p>
                </div>
            </div>
        </motion.li>
    )
}
