import type { Metadata } from 'next';
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';
import { Hero } from '@/components/contact/Hero'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos para cotizar tu proyecto. WhatsApp, correo o visítanos en Guadalajara. Respondemos rápido.',
  alternates: { canonical: '/contacto' },
  openGraph: { ...SHARED_OPEN_GRAPH, url: '/contacto', title: 'Contacto | FullColor Guadalajara', description: 'Contáctanos para cotizar. WhatsApp, correo o visítanos en Guadalajara.' },
  twitter: { ...SHARED_TWITTER, title: 'Contacto | FullColor Guadalajara', description: 'Contáctanos para cotizar. WhatsApp, correo o visítanos en Guadalajara.' },
};
import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import { MARQUEE_CONTACTO } from '@/utils/data/marquee'
import { WhatsAppLines } from '@/components/contact/whatsAppLines/WhatsAppLines'
import { Process } from '@/components/contact/process/Process'
import { ContactInfo } from '@/components/contact/form/ContactInfo'
import ImgBanner from '@/assets/media/backgrounds/bg1.webp'
import { Social } from '@/components/contact/social/Social'

export default function ContactPage() {
  return (
    <>
      <Hero />
      <MarqueeBanner image={ImgBanner} items={MARQUEE_CONTACTO} />
      <Process />
      <Social />
      <WhatsAppLines />
      <ContactInfo />
    </>
  )
}
