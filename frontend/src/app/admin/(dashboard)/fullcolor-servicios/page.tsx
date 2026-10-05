import { FCServicesTable } from '@/components/fcServices/table/FCServicesTable';
import { LinkButton } from '@/components/ui/buttons/LinkButton'
import { Pagination } from '@/components/ui/Pagination';
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { getFCServicesService } from '@/services/server/fcService.service';
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation';

const BASE_PATH = '/admin/fullcolor-servicios';

export const metadata: Metadata = { title: 'Servicios de FC' }

export default async function AdminFCServicesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;


  const data = await getFCServicesService(current);

  if (!data) notFound();

  if (data.pagination.totalPages > 0 && current > data.pagination.totalPages) {
    redirect(BASE_PATH);
  }

  return (
    <section className="flex flex-col gap-10 lg:gap-15">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <SectionLabel>Administra los servicios de FullColor</SectionLabel>
          <SectionTitle lead="Nuestros" rotating="Servicios" as='h1' />
        </div>

        <div className="flex items-center">
          <LinkButton href="/admin/fullcolor-servicios/crear">Crear Servicio</LinkButton>
        </div>
      </div>

      <FCServicesTable fcServices={data.fcServices} />

      <Pagination pagination={data.pagination} basePath={BASE_PATH} />
    </section>
  )
}
