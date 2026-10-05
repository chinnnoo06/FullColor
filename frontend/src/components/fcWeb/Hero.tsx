import { RevealOnLoad } from '../ui/Reveal'
import { LinkButton } from '../ui/buttons/LinkButton'
import { fadeUp } from '@/utils/motion/reveal'

export const Hero = () => {
    return (
        <section id="web-hero" data-section="web-hero" className="bg-thrird py-15 lg:py-20 flex flex-col gap-15 lg:gap-20">
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <RevealOnLoad variants={fadeUp} className="flex flex-col items-center justify-center text-center gap-5 w-full ">
                    <h1 className="font-barlow text-fourth text-[2.5rem] small:text-[2.75rem] md:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] 2xl:text-[5rem] leading-[1.05] font-bold tracking-[-0.02em] uppercase text-balance ">
                        Tu presencia <span className="text-gradient-brand italic">en línea</span>
                    </h1>

                    <p className='text-fourth/75 text-base lg:text-lg max-w-4xl'>
                        Diseñamos y desarrollamos sitios web rápidos, modernos y a medida. De la idea al lanzamiento, sin complicaciones.
                    </p>

                    <LinkButton href="/contacto" variant="primary">Solicitar Propuesta</LinkButton>
                </RevealOnLoad>
            </div>

        </section>
    )
}
