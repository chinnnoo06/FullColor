import Link from 'next/link'
import { LEGAL_LINKS } from '@/utils/data/navigation'
import { BulletHex } from '@/components/ui/BulletHex'

export const FooterBottomBar = () => {
  const year = new Date().getFullYear()

  return (
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
  )
}
