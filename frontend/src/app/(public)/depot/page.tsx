import type { Metadata } from 'next';
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'FullColor Depot',
  description: 'Catálogo de artículos personalizables con tu marca. Termos, tazas, playeras, bolsas y más desde Guadalajara. Cotiza al instante.',
  alternates: { canonical: '/depot' },
  openGraph: {
    url: '/depot',
    title: 'FullColor Depot | Artículos personalizables',
    description: 'Catálogo de artículos personalizables con tu marca desde Guadalajara.',
  },
};
import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import { MARQUEE_DEPOT } from '@/utils/data/marquee'
import ImgBanner from '@/assets/media/img28.webp'
import { Hero } from '@/components/fcDepot/Hero'
import { FCDepotCatalog } from '@/components/fcDepot/fcDepotCatalog/FCDepotCatalog'
import { ScrollToDepotProduct } from '@/components/fcDepot/fcDepotCatalog/ScrollToDepotProduct'
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
      <ScrollToDepotProduct />
      <Hero />
      <MarqueeBanner image={ImgBanner} items={MARQUEE_DEPOT} marqueeClassName="bg-linear-to-r from-primary to-blue-600 text-fourth" bulletClassName="fill-fourth" />
      <FCDepotCatalog fcDepotProducts={fcDepotProducts} pagination={pagination} />
    </>
  )
}
