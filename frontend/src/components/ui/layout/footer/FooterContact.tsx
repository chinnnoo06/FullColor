import { CONTACT } from '@/utils/data/contact'
import { SectionLabel } from '@/components/ui/SectionLabel'

const CONTACT_LINKS = [
  ...CONTACT.whatsappLines.map((line) => ({ label: line.label, value: line.display, href: line.url, external: true })),
  { label: 'Correo', value: CONTACT.email.address, href: CONTACT.email.href, external: false },
] as const

export const FooterContact = () => (
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
)
