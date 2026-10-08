import type { Metadata } from 'next';
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'FullColor Web',
  description: 'Portafolio de páginas web diseñadas para negocios locales en Guadalajara. Sitios modernos, rápidos y hechos a medida.',
  alternates: { canonical: '/web' },
  openGraph: {
    url: '/web',
    title: 'FullColor Web | Portafolio de proyectos',
    description: 'Portafolio de páginas web para negocios locales en Guadalajara.',
  },
};
import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import { MARQUEE_WEB } from '@/utils/data/marquee'
import ImgBanner from '@/assets/media/img30.webp'
import { Hero } from '@/components/fcWeb/Hero'
import { FCWebProjects } from '@/components/fcWeb/fcWebProjects/FCWebProjects'
import { getFCWebProjectsService } from '@/services/server/fcWebProject.service'

export default async function WebPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const { fcWebProjects, pagination } = await getFCWebProjectsService(current);

  if (pagination.totalPages > 0 && current > pagination.totalPages) {
    redirect('/web');
  }

  return (
    <>
      <Hero />
      <MarqueeBanner image={ImgBanner} items={MARQUEE_WEB} marqueeClassName="bg-blue-600 text-fourth" bulletClassName="fill-fourth" />
      <FCWebProjects fcWebProjects={fcWebProjects} pagination={pagination} />
    </>
  )
}
