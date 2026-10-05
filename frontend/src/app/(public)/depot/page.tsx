import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import ImgBanner from '@/assets/media/backgrounds/bg1.webp'
import { Hero } from '@/components/depot/Hero'

export default function DepotPage() {
  return (
    <>
      <Hero />
      <MarqueeBanner image={ImgBanner} />

    </>
  )
}