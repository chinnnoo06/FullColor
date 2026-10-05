import { LinkButton } from '@/components/ui/buttons/LinkButton'
import { FCWebProjectContent } from '@/components/fcWeb/FCWebProjectContent'
import { FC_WEB_TECHNOLOGIES_MAP } from '@/utils/data/web'
import { TFCWebProject } from '@/schemas/fcWebProject/fcWebProject.schemas'

const LABEL = 'text-primary text-xs font-semibold uppercase lg:text-sm'
const VALUE = 'text-fourth/75 text-sm lg:text-base'
const TILE = ' text-thrird flex size-10 shrink-0 items-center justify-center rounded-xl lg:size-12'

export const FCWebProjectBody = ({ fcWebProject }: { fcWebProject: TFCWebProject }) => {
    return (
        <div className="flex flex-col gap-10 lg:flex-row">
            <aside className="flex lg:sticky lg:top-24 lg:w-80 lg:shrink-0 lg:self-start">
                <div className="border-primary/30 bg-primary/5 flex w-full flex-col gap-5 rounded-xl border p-5 lg:p-10">
                    <p className="font-barlow text-fourth text-2xl font-bold uppercase lg:text-3xl">
                        Sobre este proyecto
                    </p>

                    {fcWebProject.technologies.length > 0 && (
                        <ul className="flex flex-col gap-5">
                            {fcWebProject.technologies.map((tech) => {
                                const { icon: Icon, color, label } = FC_WEB_TECHNOLOGIES_MAP[tech]
                                return (
                                    <li key={tech} className="flex items-center gap-5">
                                        <span className={TILE}>
                                            <Icon aria-hidden="true" className="size-4 lg:size-4.5" style={{ color }} />
                                        </span>
                                        <div className="flex flex-col gap-0.5">
                                            <span className={LABEL}>Tecnología</span>
                                            <span className={VALUE}>{label}</span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    )}

                    <div className="border-primary/30 flex flex-col items-start gap-5 border-t pt-5 lg:pt-10">
                        {fcWebProject.href && (
                            <LinkButton href={fcWebProject.href} width='full'>Ver Proyecto</LinkButton>
                        )}
                        <LinkButton href="/web#web-proyectos" variant="thrird" width='full'>Volver a proyectos</LinkButton>
                    </div>
                </div>
            </aside>

            <article className="min-w-0 flex-1">
                <FCWebProjectContent html={fcWebProject.content} />
            </article>
        </div>
    )
}
