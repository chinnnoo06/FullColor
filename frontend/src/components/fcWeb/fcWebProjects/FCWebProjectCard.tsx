import Image from 'next/image'
import Link from 'next/link'
import { TFCWebProject } from '@/schemas/fcWebProject/fcWebProject.schemas'
import { SpanButton } from '@/components/ui/buttons/SpanButton'
import { FC_WEB_TECHNOLOGIES_MAP } from '@/utils/data/web'

type TFCWebProjectCardProps = { fcWebProject: TFCWebProject }

const MAX_TECHS = 4

export const FCWebProjectCard = ({ fcWebProject }: TFCWebProjectCardProps) => {
    const image = fcWebProject.images[0]
    const visibleTechs = fcWebProject.technologies.slice(0, MAX_TECHS)
    const extraTechs = fcWebProject.technologies.length - MAX_TECHS

    return (
        <Link
            href={`/web/${fcWebProject.slug}`}
            className="group border-fourth/30 hover:border-primary/30 flex flex-col overflow-hidden rounded-xl border transition-colors duration-300"
        >
            <div className="relative aspect-video w-full overflow-hidden bg-fourth/5">
                {image && (
                    <Image
                        src={`${process.env.NEXT_PUBLIC_FC_WEB_PROJECTS_IMAGE_URL}/${image}`}
                        alt={fcWebProject.name}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center"
                    />
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute inset-5 flex translate-y-2 items-center justify-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <SpanButton>Ver Proyecto</SpanButton>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 p-5">
                {fcWebProject.technologies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2.5">
                        {visibleTechs.map((tech) => {
                            const { icon: Icon, color, label } = FC_WEB_TECHNOLOGIES_MAP[tech]
                            return (
                                <span key={tech} className="border-fourth/30 text-fourth/75 inline-flex items-center gap-2.5 rounded-lg border px-2.5 py-1.5 text-xs lg:text-sm">
                                    <Icon aria-hidden="true" className="size-4 shrink-0 lg:size-4.5" style={{ color }} />
                                    {label}
                                </span>
                            )
                        })}
                        {extraTechs > 0 && (
                            <span className="font-barlow text-fourth/75 text-xs lg:text-sm">
                                +{extraTechs}
                            </span>
                        )}
                    </div>
                )}

                <h3 className="font-barlow text-fourth group-hover:text-primary transition-colors duration-300 text-xl lg:text-2xl font-bold uppercase line-clamp-2">
                    {fcWebProject.name}
                </h3>

                <p className="text-fourth/75 line-clamp-3 text-base lg:text-lg">
                    {fcWebProject.excerpt}
                </p>
            </div>
        </Link>
    )
}
