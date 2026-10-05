'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { stackCardRange, stackCardScaleAt, stackCardTop, type TStackRange } from '@/utils/motion/stack'
import { staggerItem } from '@/utils/motion/reveal'
import { TFCServiceCategory } from '@/schemas/fcServiceCategory/fcServiceCategory.schemas'
import { type TServiceCardRef } from './types'

type TServiceCardProps = {
    fcServiceCategory: TFCServiceCategory
    index: number
    cardRef: TServiceCardRef
    nextRef?: TServiceCardRef
}

export const FCServiceCategoryCard = ({ fcServiceCategory, index, cardRef, nextRef }: TServiceCardProps) => {
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
            className="sticky origin-top"
        >
            <div className="bg-thrird flex flex-col sm:flex-row sm:items-stretch lg:flex-col xl:flex-row xl:items-stretch overflow-hidden rounded-xl shadow-lg ">
                <div className="relative h-50 w-full sm:w-90 sm:h-65 lg:w-full lg:h-50 xl:w-90 xl:h-65 shrink-0 sm:order-2 lg:order-1 xl:order-2">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_FC_SERVICE_CATEGORIES_IMAGE_URL}/${fcServiceCategory.image}`}
                        alt={fcServiceCategory.name}
                        fill
                        sizes="(min-width: 1024px) 260px, 100vw"
                        className="object-cover object-center"
                    />
                </div>

                <div className="flex flex-1 items-stretch sm:order-1 lg:order-2 xl:order-1">
                    <span className="bg-primary w-1 shrink-0" />

                    <div className="flex flex-1 flex-col justify-center gap-2.5 p-5 lg:p-10">
                        <span className="text-primary font-barlow text-xs lg:text-sm tracking-[0.15em] font-semibold">
                            0{index + 1}
                        </span>

                        <h3 className="font-barlow text-fourth text-2xl lg:text-3xl font-bold uppercase">
                            {fcServiceCategory.name}
                        </h3>

                        <p className="text-fourth/75 text-base lg:text-lg">
                            {fcServiceCategory.description}
                        </p>
                    </div>
                </div>
            </div>
        </motion.li>
    )
}
