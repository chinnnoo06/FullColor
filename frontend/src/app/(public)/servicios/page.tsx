import { redirect } from 'next/navigation'
import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import ImgBanner from '@/assets/media/backgrounds/bg1.webp'
import { Hero } from '@/components/fcServices/Hero'
import { getFCServicesService } from '@/services/server/fcService.service'
import { getFCServiceCategoriesService } from '@/services/server/fcServiceCategory.service'
import { FCServicesCatalog } from '@/components/fcServices/fcServicesCatalog/FCServicesCatalog'

export default async function ServicesPage({ searchParams }: { searchParams: Promise<{ page?: string; categoria?: string }> }) {
  const { page, categoria } = await searchParams;

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const [fcServiceCategories, data] = await Promise.all([
    getFCServiceCategoriesService(),
    getFCServicesService(current, categoria),
  ]);

  if (data === null) {
    redirect('/servicios');
  }

  if (data.pagination.totalPages > 0 && current > data.pagination.totalPages) {
    redirect(categoria ? `/servicios?categoria=${categoria}` : '/servicios');
  }

  return (
    <>
      <Hero />
      <MarqueeBanner image={ImgBanner} />
      <FCServicesCatalog fcServiceCategories={fcServiceCategories} fcServices={data.fcServices} pagination={data.pagination} currentCategory={categoria} />
    </>
  )
}
