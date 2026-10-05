'use client';

import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/form/Label';
import { SpanError } from '@/components/ui/form/SpanError';

const FCWebProjectEditor = dynamic(
    () => import('./FCWebProjectEditor').then((m) => m.FCWebProjectEditor),
    {
        ssr: false,
        loading: () => (
            <div aria-busy="true" className="border-secondary/30 h-100 w-full animate-pulse rounded-lg border bg-white" />
        ),
    }
);

type TFCWebProjectEditorFieldProps = {
    value: string;
    onChange: (html: string) => void;
    error?: string;
};

export const FCWebProjectEditorField = ({ value, onChange, error }: TFCWebProjectEditorFieldProps) => {
    return (
        <div className="form-group">
            <Label htmlFor="content">Contenido</Label>
            <div className="overflow-hidden rounded-lg transition-all duration-300 ">
                <FCWebProjectEditor id="content" value={value} onChange={onChange} />
            </div>
            <SpanError message={error} />
        </div>
    );
};
