import { Hero } from '@/components/contact/Hero'
import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import { WhatsAppLines } from '@/components/contact/whatsAppLines/WhatsAppLines'
import { Process } from '@/components/contact/process/Process'
import { ContactSection } from '@/components/contact/ContactSection'
import ImgBanner from '@/assets/media/backgrounds/bg1.webp'
import { Social } from '@/components/contact/social/Social'

export default function ContactPage() {
  return (
    <>
      <Hero />
      <MarqueeBanner image={ImgBanner} />
      <Process />
      <Social />
      <WhatsAppLines />
      <ContactSection />
    </>
  )
}
