import { redirect } from 'next/navigation'
import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import ImgBanner from '@/assets/media/backgrounds/bg1.webp'
import { Hero } from '@/components/fcDepot/Hero'
import { getFCDepotProductsService } from '@/services/server/fcDepotProduct.service'

export default async function DepotPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const { fcDepotProducts, pagination } = await getFCDepotProductsService(current);

  if (pagination.totalPages > 0 && current > pagination.totalPages) {
    redirect('/depot');
  }

  return (
    <>
      <Hero />
      <MarqueeBanner image={ImgBanner} />
    </>
  )
}
