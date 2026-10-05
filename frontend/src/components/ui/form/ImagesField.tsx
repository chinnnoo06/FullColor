'use client';

import { useEffect, useMemo } from 'react';
import { FiImage, FiX } from 'react-icons/fi';
import { SpanError } from './SpanError';
import { Label } from './Label';

type TImagesFieldProps = {
    images: File[];
    onChange: (images: File[]) => void;
    error?: string;
    max?: number;
    title: string
};

export const ImagesField = ({ images, onChange, error, max = 5, title }: TImagesFieldProps) => {
    const previews = useMemo(() => images.map((image) => URL.createObjectURL(image)), [images]);

    useEffect(() => {
        return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }, [previews]);

    const onSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const picked = Array.from(event.target.files ?? []);

        onChange([...images, ...picked].slice(0, max));
        event.target.value = '';
    };

    const removeAt = (index: number) => onChange(images.filter((_, i) => i !== index));

    const full = images.length >= max;

    return (
        <div className="form-group">
            <Label htmlFor="images">{title}</Label>

            <div className="flex flex-col gap-5">
                <label
                    htmlFor="images"
                    aria-disabled={full}
                    className={`border-primary/30 text-fourth/75 flex flex-col items-center justify-center gap-2.5 rounded-lg border border-dashed px-5 py-10 text-center text-xs transition-colors duration-300 lg:text-sm ${full
                        ? 'cursor-not-allowed opacity-50'
                        : 'hover:border-primary cursor-pointer'
                        }`}
                >
                    <FiImage aria-hidden="true" className="size-5 lg:size-6" />
                    {full
                        ? `Máximo ${max} imágenes`
                        : `Haz clic para elegir imágenes (${images.length} de ${max}) · JPG, PNG o WebP`}
                </label>

                <input
                    id="images"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    disabled={full}
                    onChange={onSelect}
                    className="sr-only"
                />

                {previews.length > 0 && (
                    <ul role="list" className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                        {previews.map((preview, i) => (
                            <li key={preview} className="group relative">
                                <img
                                    src={preview}
                                    alt={`Vista previa ${i + 1}: ${images[i].name}`}
                                    className="border-primary/30 aspect-square w-full rounded-lg border object-cover"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeAt(i)}
                                    aria-label={`Quitar ${images[i].name}`}
                                    className="bg-primary text-fourth absolute -top-2 -right-2 inline-flex cursor-pointer items-center justify-center rounded-full p-1.5 transition-colors duration-300 hover:bg-secondary"
                                >
                                    <FiX aria-hidden="true" className="size-4 lg:size-4.5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <SpanError message={error} />
        </div>
    );
};
