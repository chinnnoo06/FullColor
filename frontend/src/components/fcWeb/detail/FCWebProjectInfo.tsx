import { RevealOnLoad } from '@/components/ui/Reveal'
import { fadeBlur, fadeUpScale } from '@/utils/motion/reveal'
import { FC_WEB_TECHNOLOGIES_MAP } from '@/utils/data/web'
import { TFCWebProject } from '@/schemas/fcWebProject/fcWebProject.schemas'
import { FCWebProjectCarousel } from './FCWebProjectCarousel'

export const FCWebProjectInfo = ({ fcWebProject }: { fcWebProject: TFCWebProject }) => {
    return (
        <div className="flex flex-col gap-10">
            <RevealOnLoad variants={fadeBlur} className="flex flex-col gap-5">
                <h1 className="font-barlow text-fourth text-3xl font-bold uppercase leading-tight lg:text-4xl xl:text-5xl">
                    {fcWebProject.name}
                </h1>

                {fcWebProject.technologies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2.5">
                        {fcWebProject.technologies.map((tech) => {
                            const { icon: Icon, color, label } = FC_WEB_TECHNOLOGIES_MAP[tech]
                            return (
                                <span key={tech} className="border-fourth/30 text-fourth/75 inline-flex items-center gap-2.5 rounded-lg border px-2.5 py-1.5 text-xs lg:text-sm">
                                    <Icon aria-hidden="true" className="size-4 shrink-0 lg:size-4.5" style={{ color }} />
                                    {label}
                                </span>
                            )
                        })}
                    </div>
                )}

                <p className="text-fourth/75 max-w-4xl text-base lg:text-lg">
                    {fcWebProject.excerpt}
                </p>
            </RevealOnLoad>

            {fcWebProject.images.length > 0 && (
                <RevealOnLoad variants={fadeUpScale}>
                    <FCWebProjectCarousel
                        images={fcWebProject.images}
                        name={fcWebProject.name}
                    />
                </RevealOnLoad>
            )}
        </div>
    )
}
