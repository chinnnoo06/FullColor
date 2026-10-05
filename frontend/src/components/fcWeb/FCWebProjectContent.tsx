const PROSE = [
    'text-fourth/75 text-base lg:text-lg flex flex-col gap-5',
    '[&_h2]:font-barlow [&_h2]:text-fourth [&_h2]:text-2xl [&_h2]:lg:text-3xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:mt-10',
    '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4',
    '[&_strong]:text-fourth [&_strong]:font-semibold',
    '[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:mb-2.5',
    '[&_blockquote]:border-primary [&_blockquote]:border-l-4 [&_blockquote]:pl-5 [&_blockquote]:text-primary [&_blockquote]:font-medium',
    '[&_img]:rounded-xl [&_img]:w-full [&_img]:aspect-4/3 [&_img]:object-cover [&_img]:max-h-[440px]',
    '[&_hr]:border-fourth/30',
    '[&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_th]:text-fourth [&_th]:font-semibold [&_th]:border-b [&_th]:border-fourth/30 [&_th]:p-2.5 [&_td]:border-b [&_td]:border-fourth/30 [&_td]:p-2.5',
].join(' ')

export const FCWebProjectContent = ({ html }: { html: string }) => {
    return <div className={PROSE} dangerouslySetInnerHTML={{ __html: html }} />
}
