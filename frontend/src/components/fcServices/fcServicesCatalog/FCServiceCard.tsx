import Image from 'next/image'
import { TFCService } from '@/schemas/fcService/fcService.schemas'
import Link from 'next/link'

type TFCServiceCardProps = { fcService: TFCService }

export const FCServiceCard = ({ fcService }: TFCServiceCardProps) => {
    const image = fcService.images[0]
    const href = `/contacto?line=principal&subject=${encodeURIComponent(`Cotización del servicio: ${fcService.name}`)}#contacto-formulario`

    return (
        <Link href={href} className="group border-fourth/30 hover:border-primary/30 flex flex-col sm:flex-row xl:flex-col 2xl:flex-row items-center gap-5 rounded-xl border p-5 lg:p-10 transition-colors duration-300">
            {image && (
                <div className="relative size-50 shrink-0 overflow-hidden rounded-lg lg:size-60">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_FC_SERVICES_IMAGE_URL}/${image}`}
                        alt={fcService.name}
                        fill
                        sizes="(min-width: 1024px) 240px, 220px"
                        className="object-cover object-center"
                    />
                </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                <span className="text-primary font-barlow text-xs lg:text-sm tracking-[0.15em] font-semibold uppercase">
                    {fcService.category.name}
                </span>

                <h3 className="font-barlow text-fourth group-hover:text-primary transition-colors duration-300 text-2xl lg:text-3xl font-bold uppercase">
                    {fcService.name}
                </h3>

                <p className="text-fourth/75 text-base lg:text-lg">
                    {fcService.description}
                </p>

            </div>
        </Link>
    )
}
