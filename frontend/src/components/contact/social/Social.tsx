import { Reveal } from '../../ui/Reveal'
import { SectionTitle } from '../../ui/SectionTitle'
import { SectionLabel } from '../../ui/SectionLabel'
import { SocialItem } from './SocialItem'
import { fadeUp } from '@/utils/motion/reveal'
import { CONTACT_SOCIAL_ITEMS } from '@/utils/data/contact'

export const Social = () => {
    return (
        <section id="contact-social" data-section="contact-social" className="bg-thrird py-15 lg:py-20">
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-15">

                    <Reveal variants={fadeUp} className="flex w-full flex-col divide-y divide-fourth/30 lg:w-[50%] xl:w-[60%]">
                        {CONTACT_SOCIAL_ITEMS.map((item) => (
                            <SocialItem key={item.label} socialItem={item} />
                        ))}
                    </Reveal>

                    <Reveal variants={fadeUp} className="flex w-full flex-col gap-5 lg:w-[50%] xl:w-[40%]">
                        <div className="flex flex-col gap-2.5">
                            <SectionLabel>Síguenos</SectionLabel>
                            <SectionTitle as="h2" lead="Encuéntranos" rotating="en línea" />
                        </div>

                        <p className="text-fourth/75 text-base lg:text-lg">
                            Compartimos lo que hacemos: trabajos terminados, procesos del taller y novedades.
                            Síguenos para no perderte nada.
                        </p>
                    </Reveal>

                </div>
            </div>
        </section>
    )
}
