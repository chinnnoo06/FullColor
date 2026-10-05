import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import ImgBanner from '@/assets/media/backgrounds/bg1.webp'
import { Hero } from '@/components/web/Hero'

export default function WebPage() {
  return (
    <>
      <Hero />
      <MarqueeBanner image={ImgBanner} />

    </>
  )
}