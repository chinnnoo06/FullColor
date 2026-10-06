import type { Metadata } from 'next';
import { notFound } from 'next/navigation'
import { RevealOnLoad } from '@/components/ui/Reveal'
import { fadeUp } from '@/utils/motion/reveal'
import { getFCWebProjectBySlugService } from '@/services/server/fcWebProject.service'
import { FCWebProjectBreadcrumb } from '@/components/fcWeb/detail/FCWebProjectBreadcrumb'
import { FCWebProjectBody } from '@/components/fcWeb/detail/FCWebProjectBody'
import { FCWebProjectInfo } from '@/components/fcWeb/detail/FCWebProjectInfo'
import { WebProjectStructuredData } from '@/components/seo/WebProjectStructuredData'

const IMAGE_URL = process.env.NEXT_PUBLIC_FC_WEB_PROJECTS_IMAGE_URL!;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await getFCWebProjectBySlugService(slug);

    if (!project) return { title: 'Proyecto no encontrado' };

    const projectUrl = `/web/${slug}`;
    const imageUrl = project.images[0] ? `${IMAGE_URL}/${project.images[0]}` : undefined;

    return {
        title: project.seo.metaTitle,
        description: project.seo.metaDescription,
        alternates: { canonical: projectUrl },
        openGraph: {
            url: projectUrl,
            title: project.seo.metaTitle,
            description: project.seo.metaDescription,
            ...(imageUrl && { images: [{ url: imageUrl, alt: project.name }] }),
        },
    };
}

export default async function FCWebProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const fcWebProject = await getFCWebProjectBySlugService(slug)

    if (!fcWebProject) notFound()

    return (
        <section id="web-proyecto-detalle" data-section="web-proyecto-detalle" className="bg-thrird py-15 lg:py-20">
            <WebProjectStructuredData project={fcWebProject} imageUrl={IMAGE_URL} />
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
