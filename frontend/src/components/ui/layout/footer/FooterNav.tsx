import Link from 'next/link'
import { NAV_LINKS } from '@/utils/data/navigation'
import { SectionLabel } from '@/components/ui/SectionLabel'

const LINK_CLASS =
  'text-fourth/75 hover:text-secondary inline-flex items-center gap-2.5 text-base transition-colors duration-300 lg:text-lg'

export const FooterNav = () => (
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
)
