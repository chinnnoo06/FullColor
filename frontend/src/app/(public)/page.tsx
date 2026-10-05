import { Hero } from '@/components/home/hero/Hero'
import { About } from '@/components/home/About'
import { Services } from '@/components/home/services/Services'
import { Depot } from '@/components/home/depot/Depot'
import { Web } from '@/components/home/web/Web'
import { Cta } from '@/components/sections/Cta'
import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import ImgBanner from '@/assets/media/backgrounds/bg1.webp'
import { ContactSection } from '@/components/contact/ContactSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <MarqueeBanner image={ImgBanner} />
      <Services />
      <Depot />
      <Web />
      <Cta />
      <ContactSection id="contacto" dataSection="home-contact" showMoreLink />
    </>
  )
}
