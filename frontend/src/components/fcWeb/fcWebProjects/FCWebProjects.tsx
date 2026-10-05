import { PublicPagination } from '@/components/ui/PublicPagination'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { TPagination } from '@/schemas/common/common.response.schemas'
import { TFCWebProject } from '@/schemas/fcWebProject/fcWebProject.schemas'
import { FCWebProjectCard } from './FCWebProjectCard'

type TFCWebProjectsProps = {
    fcWebProjects: TFCWebProject[]
    pagination: TPagination
}

export const FCWebProjects = ({ pagination, fcWebProjects }: TFCWebProjectsProps) => {
    return (
        <section id="web-proyectos" data-section="web-proyectos" className="scroll-mt-15 lg:scroll-mt-20 bg-thrird py-15 lg:py-20">
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <div className="flex flex-col gap-10 lg:gap-15">

                    <div className="flex flex-col gap-2.5">
                        <SectionLabel>Proyectos</SectionLabel>
                        <SectionTitle as="h2" lead="Nuestros" rotating="proyectos" />
                    </div>

                    {fcWebProjects.length === 0 ? (
                        <p className="text-fourth/75 text-base lg:text-lg">
                            No hay proyectos disponibles todavía.
                        </p>
                    ) : (
                        <ul role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {fcWebProjects.map((project) => (
                                <li key={project._id}>
                                    <FCWebProjectCard fcWebProject={project} />
                                </li>
                            ))}
                        </ul>
                    )}

                    <PublicPagination pagination={pagination} basePath="/web" anchor="web-proyectos" />
                </div>
            </div>
        </section>
    )
}
