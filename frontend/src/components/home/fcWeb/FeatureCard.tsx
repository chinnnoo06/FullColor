import Image from 'next/image'
import { TWebFeature } from '@/types/content.types'
type TFeatureCardProps = {
    feature: TWebFeature
    index: number
}

const CARD = 'h-[45svh] w-[70vw] shrink-0 rounded-xl sm:w-[50vw] lg:h-90 lg:w-110'

export const FeatureCard = ({ feature, index }: TFeatureCardProps) => (
    <>
        <div className={`bg-thrird relative overflow-hidden ${CARD}`}>
            <Image
                src={feature.image}
                alt={feature.title}
                fill
                sizes="(min-width: 1024px) 440px, 70vw"
                className="object-cover object-center"
            />
        </div>

        <div className={`border-primary bg-thrird flex items-stretch overflow-hidden border ${CARD}`}>
            <span className="bg-primary w-1 shrink-0" />

            <div className="flex flex-1 flex-col justify-center gap-2.5 p-5 lg:p-10">
                <span className="text-primary font-barlow text-xs lg:text-sm tracking-[0.15em] font-semibold">
                    0{index + 1}
                </span>

                <h3 className="font-barlow text-fourth text-2xl font-bold uppercase lg:text-3xl">
                    {feature.title}
                </h3>
                <p className="text-fourth/75 text-base lg:text-lg">
                    {feature.detail}
                </p>
            </div>
        </div>
    </>
)
