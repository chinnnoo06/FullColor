import { RevealOnLoad } from '../ui/Reveal'
import { LinkButton } from '../ui/buttons/LinkButton'
import { fadeUp } from '@/utils/motion/reveal'

export const Hero = () => {
    return (
        <section id="servicios-hero" data-section="servicios-hero" className="bg-thrird py-15 lg:py-20 flex flex-col gap-15 lg:gap-20">
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <RevealOnLoad variants={fadeUp} className="flex flex-col items-center justify-center text-center gap-5 w-full ">
                    <h1 className="font-barlow text-fourth text-[2.5rem] small:text-[2.75rem] md:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] 2xl:text-[5rem] leading-[1.05] font-bold tracking-[-0.02em] uppercase text-balance ">
                        Todo lo que <span className="text-gradient-brand italic">necesitas</span>
                    </h1>

                    <p className='text-fourth/75 text-base lg:text-lg max-w-4xl'>
                        Impresión, personalización, publicidad y web en un solo lugar. Explora cada servicio y elige lo que mejor se adapta a tu negocio.
                    </p>

                    <LinkButton href="/contacto" variant="primary">Cotizar Ahora</LinkButton>
                </RevealOnLoad>
            </div>

        </section>
    )
}
