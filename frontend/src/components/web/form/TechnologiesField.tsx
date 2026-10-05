'use client';

import { FC_WEB_TECHNOLOGIES, FC_WEB_TECHNOLOGIES_MAP, TFCWebTechnology } from '@/utils/data/web';
import { SpanError } from '@/components/ui/form/SpanError';
import { Label } from '@/components/ui/form/Label';

type TTechnologiesFieldProps = {
    value: TFCWebTechnology[];
    onChange: (next: TFCWebTechnology[]) => void;
    error?: string;
};

export const TechnologiesField = ({ value, onChange, error }: TTechnologiesFieldProps) => {
    const toggle = (tech: TFCWebTechnology) => {
        if (value.includes(tech)) {
            onChange(value.filter((t) => t !== tech))
        } else {
            onChange([...value, tech])
        }
    }

    return (
        <div className="form-group">
            <Label htmlFor='technologies'>Tecnologías</Label>

            <div className="flex flex-wrap gap-2.5">
                {FC_WEB_TECHNOLOGIES.map((tech) => {
                    const { icon: Icon, color, label } = FC_WEB_TECHNOLOGIES_MAP[tech]
                    const selected = value.includes(tech)

                    return (
                        <button
                            key={tech}
                            type="button"
                            onClick={() => toggle(tech)}
                            aria-pressed={selected}
                            className={`flex items-center gap-2.5 rounded-lg border px-5 py-2.5 text-sm lg:text-base font-medium transition-colors duration-300 cursor-pointer ${
                                selected
                                    ? 'border-primary  text-primary'
                                    : 'border-fourth/30 text-fourth/75 hover:border-secondary hover:text-secondary'
                            }`}
                        >
                            <Icon className="size-4 lg:size-4.5" style={{ color }} />
                            {label}
                        </button>
                    )
                })}
            </div>

            <SpanError message={error} />
        </div>
    );
};
