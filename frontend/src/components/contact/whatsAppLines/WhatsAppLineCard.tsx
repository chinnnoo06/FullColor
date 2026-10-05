import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa6'
import { TWhatsAppLineCard } from '@/types/content.types'
import { staggerItem } from '@/utils/motion/reveal'

type TWhatsAppLineCardProps = {
    line: TWhatsAppLineCard,
    index: number
}

export const WhatsAppLineCard = ({ line, index }: TWhatsAppLineCardProps) => {

    return (
        <motion.a variants={staggerItem} href={line.url} target="_blank" rel="noopener noreferrer" className="group bg-thrird flex flex-col sm:flex-row sm:items-stretch lg:flex-col xl:flex-row xl:items-stretch overflow-hidden rounded-xl shadow-lg ">
            <div className="relative h-50 w-full sm:w-90 sm:h-65 lg:w-full lg:h-50 xl:w-90 xl:h-65 shrink-0 sm:order-2 lg:order-1 xl:order-2">
                <Image
                    src={line.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 260px, 100vw"
                    className="object-cover object-center"
                />
            </div>

            <div className="flex flex-1 items-stretch sm:order-1 lg:order-2 xl:order-1">
                <span className="bg-primary/30 group-hover:bg-primary transition-colors duration-300 w-1 shrink-0" />

                <div className="flex flex-1 flex-col justify-center gap-2.5 p-5 lg:p-10">
                    <span className="text-primary font-barlow text-xs lg:text-sm tracking-[0.15em] font-semibold">
                        0{index + 1}
                    </span>

                    <h3 className="font-barlow text-fourth group-hover:text-primary transition-colors duration-300 text-2xl lg:text-3xl font-bold uppercase">
                        {line.label}
                    </h3>

                    <span className="flex items-center gap-2.5 text-fourth/75 text-sm lg:text-base">
                        <FaWhatsapp className="size-4 lg:size-4.5 shrink-0 text-primary" />
                        {line.display}
                    </span>
                </div>
            </div>
        </motion.a>
    )
}
