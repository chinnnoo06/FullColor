import { FCDepotProductsTable } from '@/components/fcDepot/table/FCDepotProductsTable';
import { LinkButton } from '@/components/ui/buttons/LinkButton'
import { Pagination } from '@/components/ui/Pagination';
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { getFCDepotProductsService } from '@/services/server/fcDepotProduct.service';
import type { Metadata } from 'next'
import { redirect } from 'next/navigation';

const BASE_PATH = '/admin/fullcolor-depot-productos';

export const metadata: Metadata = { title: 'Productos de FC Depot' }

export default async function AdminFCDepotProductsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const { fcDepotProducts, pagination } = await getFCDepotProductsService(current);

  if (pagination.totalPages > 0 && current > pagination.totalPages) {
    redirect(BASE_PATH);
  }

  return (
    <section className="flex flex-col gap-10 lg:gap-15">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <SectionLabel>Administra los productos de FC Depot</SectionLabel>
          <SectionTitle lead="Nuestros" rotating="Productos" as='h1' />
        </div>

        <div className="flex items-center">
          <LinkButton href="/admin/fullcolor-depot-productos/crear">Crear Producto</LinkButton>
        </div>
      </div>

      <FCDepotProductsTable fcDepotProducts={fcDepotProducts} />

      <Pagination pagination={pagination} basePath={BASE_PATH} />
    </section>
  )
}
