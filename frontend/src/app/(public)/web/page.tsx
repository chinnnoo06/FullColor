import { redirect } from 'next/navigation'
import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import ImgBanner from '@/assets/media/backgrounds/bg1.webp'
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
      <MarqueeBanner image={ImgBanner} />
      <FCWebProjects fcWebProjects={fcWebProjects} pagination={pagination} />
    </>
  )
}
