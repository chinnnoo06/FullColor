import { FCServicesTable } from '@/components/fcServices/table/FCServicesTable';
import { LinkButton } from '@/components/ui/buttons/LinkButton'
import { Pagination } from '@/components/ui/Pagination';
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { getFCServicesService } from '@/services/server/fcServices.service';
import type { Metadata } from 'next'
import { redirect } from 'next/navigation';

const BASE_PATH = '/admin/fullcolor-servicios';

export const metadata: Metadata = { title: 'Servicios de FC' }

export default async function AdminFCServicesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const { page } = await searchParams;

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const { fcServices, pagination } = await getFCServicesService(current);

  if (pagination.totalPages > 0 && current > pagination.totalPages) {
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

       <FCServicesTable fcServices={fcServices} />

      <Pagination pagination={pagination} basePath={BASE_PATH} />
    </section>
  )
}
