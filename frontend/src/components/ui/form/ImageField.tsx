'use client';

import { useEffect, useMemo } from 'react';
import { FiImage, FiX } from 'react-icons/fi';
import { SpanError } from './SpanError';
import { Label } from './Label';

type TImageFieldProps = {
    image: File | null;
    onChange: (image: File | null) => void;
    error?: string;
    id?: string;
    label?: string;
    hint?: string;
};

export const ImageField = ({ image, onChange, error, id = 'image', label = 'Imagen destacada', hint }: TImageFieldProps) => {
    const preview = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const onSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.files?.[0] ?? null);
        event.target.value = '';
    };

    return (
        <div className="form-group">
            <Label htmlFor={id}>{label}</Label>

            <div className="flex flex-col gap-5">
                <label
                    htmlFor={id}
                    className="border-primary/30 text-fourth/75 hover:border-primary flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-lg border border-dashed px-5 py-10 text-center text-xs transition-colors duration-300 lg:text-sm"
                >
                    <FiImage aria-hidden="true" className="size-5 lg:size-6" />
                    {image ? 'Haz clic para cambiar la imagen' : 'Haz clic para elegir una imagen'} · JPG, PNG o WebP
                </label>

                <input id={id} type="file" accept="image/jpeg,image/png,image/webp" onChange={onSelect} className="sr-only" />

                {hint && <p className="text-fourth/75 text-xs lg:text-sm">{hint}</p>}

                {preview && image && (
                    <ul role="list" className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                        <li className="group relative">
                            <img
                                src={preview}
                                alt={`Vista previa: ${image.name}`}
                                className="border-primary/30 aspect-square w-full rounded-lg border object-cover"
                            />

                            <button
                                type="button"
                                onClick={() => onChange(null)}
                                aria-label={`Quitar ${image.name}`}
                                className="bg-primary text-fourth absolute -top-2 -right-2 inline-flex cursor-pointer items-center justify-center rounded-full p-1.5 transition-colors duration-300 hover:bg-secondary"
                            >
                                <FiX aria-hidden="true" className="size-4 lg:size-4.5" />
                            </button>
                        </li>
                    </ul>
                )}
            </div>

            <SpanError message={error} />
        </div>
    );
};
