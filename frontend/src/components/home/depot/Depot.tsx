import Image from 'next/image'
import { Reveal } from '../../ui/Reveal'
import { SectionTitle } from '../../ui/SectionTitle'
import { LinkButton } from '../../ui/buttons/LinkButton'
import { ProductSlider } from './ProductSlider'
import { fadeUp, fadeUpScale } from '@/utils/motion/reveal'
import { PRODUCTS } from '@/utils/data/products'
import ImgMain from '@/assets/media/img19.webp'
import ImgDetail from '@/assets/media/img20.webp'
import { BulletHex } from '@/components/ui/BulletHex'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const Depot = () => {
    return (
        <section id="depot" data-section="home-depot" className="relative bg-thrird py-15 lg:py-20">
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-15">

                    <Reveal variants={fadeUpScale} className="relative w-full pr-10 pb-10 lg:w-[50%] xl:w-[40%] max-w-xl mx-auto">
                        <div className="relative h-100 w-full overflow-hidden rounded-xl sm:h-120 md:h-140 lg:h-150">
                            <Image
                                src={ImgMain}
                                alt="Tazas blancas para sublimar en el taller de FullColor Depot"
                                fill
                                placeholder="blur"
                                sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 50vw, 100vw"
                                className="object-cover object-center"
                            />
                        </div>

                        <div className="border-thrird absolute right-0 bottom-0 w-[40%] lg:w-[55%] overflow-hidden rounded-xl border-5 shadow-lg shadow-black/30">
                            <Image
                                src={ImgDetail}
                                alt="Playeras lisas premium de FullColor Depot en varios colores"
                                placeholder="blur"
                                sizes="(min-width: 1024px) 22vw, 55vw"
                                className="h-auto w-full"
                            />
                        </div>
                    </Reveal>

                    <Reveal variants={fadeUp} className="flex w-full flex-col gap-5 lg:w-[50%] xl:w-[60%]">
                        <div className="flex flex-col gap-2.5">
                            <SectionLabel>FullColor Depot</SectionLabel>

                            <SectionTitle as="h2" lead="Crea, personaliza y" rotating="emprende" />
                        </div>

                        <p className="text-fourth/75 text-base lg:text-lg">
                            Un espacio creado para emprendedores y negocios. Aquí encontrarás productos para
                            personalizar, materiales y artículos seleccionados para crear tus propios diseños,
                            desarrollar nuevos productos o impulsar tu negocio.
                        </p>

                        <div className="flex flex-col gap-2.5">
                            <span className="font-beyno text-secondary text-sm lg:text-base font-semibold tracking-[0.3em] uppercase">
                                Catalogo actual
                            </span>

                            <ProductSlider products={PRODUCTS} />
                        </div>

                        <p className="font-barlow text-fourth flex items-center gap-2.5 text-lg font-medium italic lg:text-xl">
                            <BulletHex />
                            Tú pones la idea, nosotros ponemos las herramientas.
                        </p>

                        <div className="flex w-full flex-col gap-5 small:flex-row small:flex-wrap small:items-center">
                            <LinkButton href="/depot" width="responsive">Ver Catálogo</LinkButton>

                            <LinkButton href="/contacto" variant="secondary" width="responsive">Pedir Cotización</LinkButton>
                        </div>
                    </Reveal>

                </div>
            </div>
        </section>
    )
}
