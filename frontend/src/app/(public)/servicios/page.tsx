import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import ImgBanner from '@/assets/media/backgrounds/bg1.webp'
import { Hero } from '@/components/services/Hero'

export default function ServicesPage() {
  return (
    <>
      <Hero />
      <MarqueeBanner image={ImgBanner} />

    </>
  )
}