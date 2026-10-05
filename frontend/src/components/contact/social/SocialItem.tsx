import { TContactSocialItem } from '@/types/content.types'

export const SocialItem = ({ socialItem }: {socialItem: TContactSocialItem}) => (
    <a
        href={socialItem.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-5 py-5 first:pt-0 last:pb-0 hover:opacity-80 transition-opacity duration-300"
    >
        <socialItem.icon className="size-6 lg:size-8 text-primary shrink-0" />

        <div className="flex flex-col gap-2.5">
            <h3 className="font-barlow text-fourth group-hover:text-primary transition-colors duration-300 text-2xl lg:text-3xl font-bold uppercase">{socialItem.label}</h3>
            <span className="text-fourth text-sm lg:text-base">{socialItem.handle}</span>
            <p className="text-fourth/75 text-sm lg:text-base">{socialItem.detail}</p>
        </div>
    </a>
)
