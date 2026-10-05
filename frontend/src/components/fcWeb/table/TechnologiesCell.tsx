import { FC_WEB_TECHNOLOGIES_MAP, TFCWebTechnology } from '@/utils/data/web';

export const TechnologiesCell = ({ technologies }: { technologies: TFCWebTechnology[] }) => {
    if (technologies.length === 0) {
        return <span className="text-fourth/75 text-xs lg:text-sm">Sin tecnologías</span>;
    }

    return (
        <ul role="list" className="flex flex-wrap gap-2.5">
            {technologies.map((tech) => {
                const { icon: Icon, color, label } = FC_WEB_TECHNOLOGIES_MAP[tech];
                return (
                    <li key={tech} title={label}>
                        <Icon aria-label={label} style={{ color }} className="size-4 lg:size-4.5 shrink-0" />
                    </li>
                );
            })}
        </ul>
    );
};
