import { TFCDepotProduct } from '@/schemas/fcDepotProduct/fcDepotProduct.schemas';

type TColor = TFCDepotProduct['colors'][number];

export const ColorsCell = ({ colors }: { colors: TColor[] }) => {
    if (colors.length === 0) {
        return <span className="text-fourth/75 text-xs lg:text-sm">Sin colores</span>;
    }

    return (
        <ul role="list" className="flex flex-wrap gap-2.5">
            {colors.map((color) => (
                <li key={color.hex} title={color.name} className="flex items-center gap-1.5">
                    <span
                        className={`size-4 lg:size-4.5 shrink-0 rounded-full border border-white/30 bg-[${color.hex}]`}
                        aria-hidden="true"
                    />
                    <span className="text-fourth/75 text-xs lg:text-sm whitespace-nowrap">{color.name}</span>
                </li>
            ))}
        </ul>
    );
};
