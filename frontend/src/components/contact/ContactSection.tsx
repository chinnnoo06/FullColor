import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { SectionLabel } from '../ui/SectionLabel'
import { LinkButton } from '../ui/buttons/LinkButton'
import { ContactForm } from './ContactForm'
import { fadeUp, fadeUpScale } from '@/utils/motion/reveal'
import { CONTACT } from '@/utils/data/contact'

type TContactSectionProps = {
    id?: string
    dataSection?: string
    showMoreLink?: boolean
}

export const ContactSection = ({ id, dataSection = 'contact-form', showMoreLink = false }: TContactSectionProps) => {
    return (
        <section id={id} data-section={dataSection} className="bg-thrird py-15 lg:py-20">
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-15">

                    <Reveal variants={fadeUpScale} className="order-2 lg:order-1 w-full lg:w-[50%] xl:w-[60%]">
                        <ContactForm />
                    </Reveal>

                    <Reveal variants={fadeUp} className="order-1 lg:order-2 flex w-full flex-col gap-5 lg:w-[50%] xl:w-[40%]">
                        <div className="flex flex-col gap-2.5">
                            <SectionLabel>Contacto</SectionLabel>
                            <SectionTitle as="h2" lead="Ponte en" rotating="contacto" />
                        </div>

                        <p className="text-fourth/75 text-base lg:text-lg">
                            Llena el formulario, elige la línea que corresponde a lo que necesitas y te
                            abrimos WhatsApp con el mensaje listo.
                        </p>

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col">
                                <span className="font-barlow text-fourth/75 text-xs lg:text-sm tracking-[0.15em] uppercase">Correo</span>
                                <a
                                    href={CONTACT.email.href}
                                    className="font-barlow text-fourth hover:text-secondary text-lg font-medium transition-colors duration-300 lg:text-xl"
                                >
                                    {CONTACT.email.address}
                                </a>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-barlow text-fourth/75 text-xs lg:text-sm tracking-[0.15em] uppercase">Ubicación</span>
                                <a
                                    href={CONTACT.address.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-barlow text-fourth hover:text-secondary text-lg font-medium transition-colors duration-300 lg:text-xl"
                                >
                                    {CONTACT.address.display}
                                </a>
                            </div>
                        </div>

                        {showMoreLink && (
                            <LinkButton href="/contacto" variant="secondary">Más Formas De Contacto</LinkButton>
                        )}
                    </Reveal>

                </div>
            </div>
        </section>
    )
}
