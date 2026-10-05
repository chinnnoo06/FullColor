import { notFound } from 'next/navigation'
import { RevealOnLoad } from '@/components/ui/Reveal'
import { fadeUp } from '@/utils/motion/reveal'
import { getFCWebProjectBySlugService } from '@/services/server/fcWebProject.service'
import { FCWebProjectBreadcrumb } from '@/components/fcWeb/detail/FCWebProjectBreadcrumb'
import { FCWebProjectBody } from '@/components/fcWeb/detail/FCWebProjectBody'
import { FCWebProjectInfo } from '@/components/fcWeb/detail/FCWebProjectInfo'

export default async function FCWebProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const fcWebProject = await getFCWebProjectBySlugService(slug)

    if (!fcWebProject) notFound()

    return (
        <section id="web-proyecto-detalle" data-section="web-proyecto-detalle" className="bg-thrird py-15 lg:py-20">
            <div className="mx-auto w-full max-w-7xl px-5 lg:px-15">
                <div className="flex flex-col gap-10">

                    <FCWebProjectBreadcrumb projectName={fcWebProject.name} />

                    <FCWebProjectInfo fcWebProject={fcWebProject} />

                    <RevealOnLoad variants={fadeUp}>
                        <FCWebProjectBody fcWebProject={fcWebProject} />
                    </RevealOnLoad>

                </div>
            </div>
        </section>
    )
}
