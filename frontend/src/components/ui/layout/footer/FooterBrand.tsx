import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { SocialButtons } from '@/components/ui/buttons/SocialButtons'

export const FooterBrand = () => (
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
)
