'use client'

import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactFormSchema, TContactForm } from '@/schemas/contact/contact.form.schemas'
import { CONTACT } from '@/utils/data/contact'
import { FormSection } from '@/components/ui/form/FormSection'
import { FormSectionTitle } from '@/components/ui/form/FormSectionTitle'
import { Label } from '@/components/ui/form/Label'
import { Input } from '@/components/ui/form/Input'
import { Select } from '@/components/ui/form/Select'
import { Textarea } from '@/components/ui/form/Textarea'
import { SpanError } from '@/components/ui/form/SpanError'
import { Button } from '@/components/ui/buttons/Button'

export const ContactForm = () => {
    const searchParams = useSearchParams()
    const defaultLine = (searchParams.get('line') ?? '') as TContactForm['line']
    const defaultSubject = searchParams.get('subject') ?? ''

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TContactForm>({
        resolver: zodResolver(ContactFormSchema),
        defaultValues: { name: '', subject: defaultSubject, details: '', line: defaultLine },
    })

    const onSubmit = (data: TContactForm) => {
        const subject = `*${data.subject}*`
        const greeting = `Hola buen día, soy ${data.name}, visité el sitio web de FullColor y me interesa cotizar.`
        const details = data.details

        const encodedMessage = encodeURIComponent(`${subject}\n\n${greeting}\n\n${details}`);

        const line = CONTACT.whatsappLines.find((item) => item.key === data.line)
        if (!line) return

        const url = `https://wa.me/${line.number}?text=${encodedMessage}`

        window.open(url, '_blank', 'noopener,noreferrer')

        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <FormSection>
                <FormSectionTitle>Envíanos un mensaje</FormSectionTitle>

                <div className="flex flex-col gap-5 sm:flex-row lg:flex-col xl:flex-row">
                    <div className="w-full">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" placeholder="Tu nombre" autoComplete="name" {...register('name')} />
                        <SpanError message={errors.name?.message} />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="line">¿Con quién quieres hablar?</Label>
                        <Select id="line" defaultValue="" {...register('line')}>
                            <option value="" disabled>
                                Elige una línea
                            </option>
                            {CONTACT.whatsappLines.map((line) => (
                                <option key={line.key} value={line.key}>
                                    {line.label}
                                </option>
                            ))}
                        </Select>
                        <SpanError message={errors.line?.message} />
                    </div>
                </div>

                <div>
                    <Label htmlFor="subject">Asunto</Label>
                    <Input id="subject" placeholder="Ej. Cotización de 50 playeras" {...register('subject')} />
                    <SpanError message={errors.subject?.message} />
                </div>

                <div>
                    <Label htmlFor="details">Detalles</Label>
                    <Textarea
                        id="details"
                        rows={5}
                        placeholder="Cuéntanos qué necesitas: producto, cantidad, medidas, fecha de entrega…"
                        {...register('details')}
                    />
                    <SpanError message={errors.details?.message} />
                </div>
            </FormSection>

            <Button type="submit" width="responsive">
                Enviar Por WhatsApp
            </Button>
        </form>
    )
}
