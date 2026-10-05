import Image from 'next/image'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { SectionLabel } from '../ui/SectionLabel'
import { LinkButton } from '../ui/buttons/LinkButton'
import { fadeUp, fadeUpScale } from '@/utils/motion/reveal'
import ImgAbout from '@/assets/media/img1.webp'

export const About = () => {
    return (
        <section id="home-about" data-section="home-about" className="bg-thrird py-15 lg:py-20">
            
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-15 lg:items-center">
                    <Reveal variants={fadeUp} className="flex w-full flex-col gap-5 lg:w-[50%] xl:w-[60%]">
                        <div className="flex flex-col gap-2.5">
                            <SectionLabel>Nosotros</SectionLabel>

                            <SectionTitle as="h2" lead="Creamos para" rotating="crecer" />
                        </div>

                        <p className="text-fourth/75 text-base lg:text-lg">
                            En FullColor somos un equipo apasionado por las artes gráficas y la personalización.
                            Con más de 15 años de experiencia, transformamos tus ideas en productos de alta
                            calidad, cuidando cada detalle desde el diseño hasta el acabado final.
                        </p>

                        <figure className=" border-secondary flex flex-col gap-2.5 border-l-2 pl-5">
                            <figcaption className="font-beyno text-secondary text-sm lg:text-base font-semibold tracking-[0.3em] uppercase">
                                Nuestra mision
                            </figcaption>
                            <blockquote className="font-barlow text-fourth/75 text-lg leading-snug lg:text-xl">
                                “Brindar soluciones integrales de impresión y diseño que destaquen la identidad de
                                nuestros clientes, ofreciendo un servicio rápido, innovador y con acabados
                                excepcionales.”
                            </blockquote>
                        </figure>

                        <LinkButton href="/contacto">Cotiza Tu Proyecto</LinkButton>
                    </Reveal>

                    <div className="w-full lg:w-[50%] xl:w-[40%]">
                        <Reveal variants={fadeUpScale} className="mx-auto w-full max-w-xl overflow-hidden rounded-xl">
                            <Image
                                src={ImgAbout}
                                alt="Sello de Full Color, impresos y promocionales, sobre un patrón hexagonal"
                                sizes="(min-width: 1280px) calc(40vw - 60px), (min-width: 1024px) calc(50vw - 60px), 576px"
                                quality={90}
                                placeholder="blur"
                                className="aspect-4/3 w-full object-cover lg:aspect-auto lg:h-110"
                            />
                        </Reveal>

                    </div>

                </div>
            </div>
        </section>
    )
}
