import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { NAV_LINKS, LEGAL_LINKS } from '@/utils/data/navigation'
import { SocialButtons } from '@/components/ui/buttons/SocialButtons'
import { CONTACT } from '@/utils/data/contact'
import { BulletHex } from '@/components/ui/BulletHex'
import { SectionLabel } from '@/components/ui/SectionLabel'

const CONTACT_LINKS = [
  ...CONTACT.whatsappLines.map((line) => ({ label: line.label, value: line.display, href: line.url, external: true })),
  { label: 'Correo', value: CONTACT.email.address, href: CONTACT.email.href, external: false },
] as const

const LINK_CLASS =
  'text-fourth/75 hover:text-secondary inline-flex items-center gap-2.5 text-base transition-colors duration-300 lg:text-lg'

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-thrird text-fourth relative before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-linear-to-r before:from-primary before:via-secondary before:to-primary">
      <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15 py-15 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-15">

          <div className="flex w-full flex-col gap-5 items-center text-center lg:items-start lg:text-start lg:w-[30%]">
            <Link href="/" aria-label="Ir al inicio" className="w-15 lg:w-20">
              <Logo sizes="80px" />
            </Link>

            <p className="font-barlow text-xl leading-none font-semibold uppercase lg:text-2xl">
              Creamos para <span className="text-primary italic">crecer</span>.
            </p>

            <p className="text-fourth/75 max-w-md text-sm lg:text-base">
              Impresos y promocionales para empresas, emprendedores y proyectos personales.
              Tú pones la idea, nosotros ponemos las herramientas.
            </p>

            <SocialButtons />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:w-[70%] lg:justify-end gap-10 lg:gap-15">
            <nav aria-label="Navegación del pie" className="flex flex-col items-center text-center lg:items-start lg:text-start gap-5">
              <SectionLabel>Navegacion</SectionLabel>
              <ul role="list" className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={LINK_CLASS}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col items-center text-center lg:items-start lg:text-start gap-5">
              <SectionLabel>Contacto</SectionLabel>
              <ul role="list" className="flex flex-col gap-2.5">
                {CONTACT_LINKS.map((item) => (
                  <li key={item.href} className="flex flex-col">
                    <span className="text-fourth/75 text-[0.6875rem] tracking-[0.3em] uppercase">{item.label}</span>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="font-barlow text-fourth hover:text-secondary text-base font-medium transition-colors duration-300 lg:text-lg"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
              <SectionLabel>Ubicación</SectionLabel>
              <div className="h-60 w-full overflow-hidden rounded-xl lg:h-full lg:min-h-60">
                <iframe
                  title="Ubicación de FullColor"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.796661590525!2d-103.33582899999999!3d20.67785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b1bcc01d458b%3A0xf2e0389c091c99d4!2sImprenta%20Full%20color%2C%20Lona%20Impresa%2C%20Corte%20y%20Grabado%20Laser%20Tazas%20Personalizada%2C%20Impresion%20digital%2C%20DTF%20Textil!5e0!3m2!1ses!2smx!4v1791166019639!5m2!1ses!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="origin"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="border-fourth/30 mt-15 flex flex-col gap-2.5 border-t pt-5 text-sm sm:flex-row sm:items-center sm:justify-between lg:mt-20 lg:text-base">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
            <p className="text-fourth/75">
              © {year} FullColor. Todos los derechos reservados.
            </p>
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-fourth/75 hover:text-secondary transition-colors duration-300">
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/web" className="text-fourth/75 hover:text-secondary inline-flex items-center gap-2.5 transition-colors duration-300">
            <BulletHex />
            Powered by FullColor Web
          </Link>
        </div>
      </div>
    </footer>
  )
}
