import { Reveal } from '../../ui/Reveal'
import { SectionTitle } from '../../ui/SectionTitle'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { LinkButton } from '../../ui/buttons/LinkButton'
import { ContactForm } from './ContactForm'
import { fadeUp, fadeUpScale } from '@/utils/motion/reveal'
import { CONTACT } from '@/utils/data/contact'
import { SocialButtons } from '@/components/ui/buttons/SocialButtons'

export const Contact = () => {
    return (
        <section id="contacto" data-section="home-contact" className="bg-thrird py-15 lg:py-20">
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-15">

                    <Reveal variants={fadeUp} className="flex w-full flex-col gap-5 lg:w-[50%] xl:w-[40%]">
                        <div className="flex flex-col gap-2.5">
                            <SectionLabel>Contacto</SectionLabel>

                            <SectionTitle as="h2" lead="Ponte en" rotating="contacto" />
                        </div>

                        <p className="text-fourth/75 text-base lg:text-lg">
                            Llena el formulario, elige la línea que corresponde a lo que necesitas y te
                            abrimos WhatsApp con el mensaje listo. También puedes escribirnos por correo.
                        </p>

                        <div className="flex flex-col">
                            <span className="font-barlow text-fourth/75 text-xs lg:text-sm tracking-[0.15em] uppercase">Correo</span>
                            <a
                                href={CONTACT.email.href}
                                className="font-barlow text-fourth hover:text-secondary text-lg font-medium transition-colors duration-300 lg:text-xl"
                            >
                                {CONTACT.email.address}
                            </a>
                        </div>

                        <SocialButtons />

                        <LinkButton href="/contacto" variant="secondary">Más formas de contacto</LinkButton>
                    </Reveal>

                    <Reveal variants={fadeUpScale} className="w-full lg:w-[50%] xl:w-[60%]">
                        <ContactForm />
                    </Reveal>

                </div>
            </div>
        </section>
    )
}
