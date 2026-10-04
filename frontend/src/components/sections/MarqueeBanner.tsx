import type { StaticImageData } from 'next/image'
import { Marquee } from '@/components/ui/Marquee'
import { Banner } from './Banner'

type TMarqueeBannerProps = {
  image: StaticImageData
  imageClassName?: string
}

const HEX_BULLET = '[clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]'

const WORK_BANNER_ITEMS = [
    'Playeras', 'Serigrafía', 'DTF', 'Sublimación', 'Termos', 'Tazas',
    'Lonas', 'Vinil', 'Corte láser', 'Grabado láser', 'Etiquetas', 'Stickers',
    'Imanes', 'Botones', 'Llaveros', 'Lanyards', 'Tarjetas PVC',
    'Tarjetas de presentación', 'Volantes', 'Impresión UV', 'Impresión offset',
    'Canvas', 'Microperforado', 'Coroplast', 'Displays', 'Banderas',
    'Caballetes', 'Cajas', 'Páginas web',
] as const

export const MarqueeBanner = ({  image, imageClassName }: TMarqueeBannerProps) => {
  return (
    <div>
      <Marquee duration={90} gap={20} className="bg-primary text-thrird py-5">
        {WORK_BANNER_ITEMS.map((item) => (
          <span
            key={item}
            className="font-barlow flex items-center gap-5 text-sm font-semibold tracking-[0.15em] whitespace-nowrap uppercase lg:text-base"
          >
            {item}
            <span className={`bg-thrird size-2 shrink-0 ${HEX_BULLET}`} />
          </span>
        ))}
      </Marquee>

      <Banner image={image} className={imageClassName} />
    </div>
  )
}
