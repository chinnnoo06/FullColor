import Image from 'next/image'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { SectionLabel } from '../ui/SectionLabel'
import { LinkButton } from '../ui/buttons/LinkButton'
import { fadeBlur } from '@/utils/motion/reveal'
import { CONTACT_WHATSAPP } from '@/utils/data/contact'
import ImgCta from '@/assets/media/backgrounds/bg2.webp'

export const Cta = () => {
    return (
        <section id="inicio-cta" data-section="inicio-cta" className="bg-thrird ">
            <Reveal variants={fadeBlur} className='flex items-center justify-center min-h-[60svh] lg:min-h-[clamp(640px,100dvh,900px)] relative overflow-hidden py-15 lg:py-20'>
                <Image
                    src={ImgCta}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="100vw"
                    className="object-cover object-bottom"
                />
                <div aria-hidden="true" className="from-thrird/90 via-thrird/75 to-thrird/60 absolute inset-0 bg-linear-to-r" />

                <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-15">
                    <div className="flex w-full flex-col justify-center gap-5">
                        <div className="flex flex-col gap-2.5">
                            <SectionLabel>¿Listo para empezar?</SectionLabel>

                            <SectionTitle as="h2" lead="Hablemos de tu" size='hero' rotating="proyecto" />
                        </div>

                        <p className="text-fourth/75 max-w-xl text-base lg:text-lg">
                            Cuéntanos qué necesitas: impresión, personalización, publicidad o tu página web.
                            Te respondemos por WhatsApp y te cotizamos sin compromiso.
                        </p>

                        <div className="flex w-full flex-col gap-5 small:flex-row small:flex-wrap small:items-center">
                            <LinkButton href={CONTACT_WHATSAPP.url} width="responsive">Cotizar Por WhatsApp</LinkButton>

                            <LinkButton href="/contacto" variant="secondary" width="responsive">Ir A Contacto</LinkButton>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    )
}
