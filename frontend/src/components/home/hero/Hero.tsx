import Image from 'next/image'
import { RevealOnLoad } from '../../ui/Reveal'
import { fadeUp, fadeUpScale } from '@/utils/motion/reveal'
import ImgBadge from '@/assets/media/img2.webp'
import { LinkButton } from '../../ui/buttons/LinkButton'
import { HeroSlider } from './HeroSlider'
import { BulletHex } from '@/components/ui/BulletHex'

const HERO_SERVICE_LABELS = [
    'Impresión',
    'Personalización',
    'Corte y grabado láser',
    'Publicidad y displays',
    'Páginas web',
] as const

export const Hero = () => {
    return (
        <section data-section="home-hero" className="bg-thrird pt-15 lg:pt-20 flex flex-col gap-15 lg:gap-20">
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-15 items-center">
                    <RevealOnLoad variants={fadeUp} className="flex flex-col gap-5 w-full lg:w-[60%]">
                        <h1 className="font-barlow text-fourth text-[2.5rem] small:text-[2.75rem] md:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] 2xl:text-[5rem] leading-[1.05] font-bold tracking-[-0.02em] uppercase text-balance ">
                            Soluciones para hacer <span className="text-gradient-brand italic">crecer tu negocio</span>
                        </h1>

                        <p className='text-fourth/75 text-base lg:text-lg'>
                            Ayudamos a empresas y a emprendedores a resolver sus necesidades de 
                            impresión, personalización, publicidad y cominicación visual.
                        </p>

                        <ul role="list" aria-label="Servicios" className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                            {HERO_SERVICE_LABELS.map((service) => (
                                <li
                                    key={service}
                                    className="font-barlow text-fourth/75 flex items-center gap-2.5 text-sm tracking-[0.15em] uppercase lg:text-base"
                                >
                                    <BulletHex />
                                    {service}
                                </li>
                            ))}
                        </ul>

                        <div className="flex w-full flex-col gap-5 small:flex-row small:flex-wrap small:items-center">
                            <LinkButton href="/contacto" width="responsive">Cotiza tu proyecto</LinkButton>

                            <LinkButton href="/servicios" variant="secondary" width="responsive">Ver servicios</LinkButton>
                        </div>
                    </RevealOnLoad>

                    <RevealOnLoad variants={fadeUpScale} className="flex w-full justify-center lg:w-[40%]">
                        <Image
                            src={ImgBadge}
                            alt="Sello de Full Color, impresos y promocionales"
                            priority
                            sizes="(min-width: 1024px) 40vw, 80vw"
                            className="h-auto w-full max-w-md"
                        />
                    </RevealOnLoad>

                </div>
            </div>

            <RevealOnLoad variants={fadeUp}>
                <HeroSlider />
            </RevealOnLoad>

        </section>
    )
}
