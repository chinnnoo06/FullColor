import { FCWebProjectsTable } from '@/components/web/table/FCWebProjectsTable';
import { LinkButton } from '@/components/ui/buttons/LinkButton'
import { Pagination } from '@/components/ui/Pagination';
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { getFCWebProjectsService } from '@/services/server/fcWebProject.service';
import type { Metadata } from 'next'
import { redirect } from 'next/navigation';

const BASE_PATH = '/admin/fullcolor-web-projectos';

export const metadata: Metadata = { title: 'Proyectos de FC Web' }

export default async function AdminFCWebProjectsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const { page } = await searchParams;

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const { fcWebProjects, pagination } = await getFCWebProjectsService(current);

  if (pagination.totalPages > 0 && current > pagination.totalPages) {
    redirect(BASE_PATH);
  }

  return (
    <section className="flex flex-col gap-10 lg:gap-15">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <SectionLabel>Administra los proyectos de FC Web</SectionLabel>
          <SectionTitle lead="Nuestros" rotating="Proyectos" as='h1' />
        </div>

        <div className="flex items-center">
          <LinkButton href="/admin/fullcolor-web-projectos/crear">Crear Proyecto</LinkButton>
        </div>
      </div>

      <FCWebProjectsTable fcWebProjects={fcWebProjects} />

      <Pagination pagination={pagination} basePath={BASE_PATH} />
    </section>
  )
}
