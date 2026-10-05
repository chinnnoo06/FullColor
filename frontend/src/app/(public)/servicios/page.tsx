import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import ImgBanner from '@/assets/media/backgrounds/bg1.webp'
import { Hero } from '@/components/services/Hero'

export default async function ServicesPage({ searchParams }: { searchParams: Promise<{ page?: string; categoria?: string }> }) {
  const { page, categoria } = await searchParams;

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  return (
    <>
      <Hero />
      <MarqueeBanner image={ImgBanner} />

    </>
  )
}