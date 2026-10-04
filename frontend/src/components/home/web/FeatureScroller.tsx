'use client'

import type { RefObject } from 'react'
import { motion, type MotionValue } from 'framer-motion'
import { TWebFeature } from '@/types/content.types'
import { FeatureCard } from './FeatureCard'

type TFeatureScrollerProps = {
    features: TWebFeature[]
    trackRef: RefObject<HTMLDivElement | null>
    x: MotionValue<number> | number
}

export const FeatureScroller = ({ features, trackRef, x }: TFeatureScrollerProps) => {
    return (
        <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-5 px-[max(--spacing(5),calc((100vw-1700px)/2+(--spacing(5))))] lg:px-[max(--spacing(15),calc((100vw-1700px)/2+(--spacing(15))))]"
        >
            {features.map((feature, i) => (
                <FeatureCard key={feature.title} feature={feature} index={i} />
            ))}
        </motion.div>
    )
}
