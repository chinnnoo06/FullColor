import Link from 'next/link'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import type { TPagination } from '@/schemas/common/common.response.schemas'
import { usePagination } from '@/hooks/ui/usePagination'

type TPublicPaginationProps = {
    pagination: TPagination
    basePath: string
    anchor?: string
}

const PAGE_ACTIVE =
    'inline-flex size-10 items-center justify-center rounded-xl bg-primary font-barlow text-sm font-bold text-thrird lg:size-11 lg:text-base'

const PAGE_INACTIVE =
    'border-fourth/30 text-fourth/75 hover:border-primary hover:text-primary inline-flex size-10 items-center justify-center rounded-xl border font-barlow text-sm transition-colors duration-300 lg:size-11 lg:text-base'

const NAV_ACTIVE =
    'border-fourth/30 text-fourth hover:border-primary hover:bg-primary hover:text-thrird inline-flex items-center gap-1.5 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors duration-300 lg:text-base'

const NAV_DISABLED =
    'border-fourth/15 text-fourth/30 inline-flex items-center gap-1.5 rounded-xl border px-5 py-2.5 text-sm font-medium lg:text-base'

const ELLIPSIS = 'text-fourth/40 font-barlow flex size-10 items-center justify-center text-sm lg:size-11 lg:text-base'

export const PublicPagination = ({ pagination, basePath, anchor }: TPublicPaginationProps) => {
    const {
        page,
        totalPages,
        total,
        hasNextPage,
        hasPrevPage,
        href,
        pageRange,
        showStart,
        showStartEllipsis,
        showEnd,
        showEndEllipsis,
    } = usePagination({ pagination, basePath, anchor })

    return (
        <nav aria-label="Paginación" className="flex flex-col items-center gap-5">

            <div className="flex flex-wrap items-center justify-center gap-2.5">
                {hasPrevPage ? (
                    <Link href={href(page - 1)} className={NAV_ACTIVE}>
                        <FiChevronLeft aria-hidden="true" className="size-4 lg:size-4.5" />
                        <span className="hidden sm:inline">Anterior</span>
                    </Link>
                ) : (
                    <span aria-disabled="true" className={NAV_DISABLED}>
                        <FiChevronLeft aria-hidden="true" className="size-4 lg:size-4.5" />
                        <span className="hidden sm:inline">Anterior</span>
                    </span>
                )}

                <div className="flex items-center gap-2.5">
                    {showStart && (
                        <Link href={href(1)} className={PAGE_INACTIVE} aria-label="Página 1">1</Link>
                    )}
                    {showStartEllipsis && <span className={ELLIPSIS} aria-hidden="true">···</span>}

                    {pageRange.map((p) =>
                        p === page ? (
                            <span key={p} aria-current="page" className={PAGE_ACTIVE}>{p}</span>
                        ) : (
                            <Link key={p} href={href(p)} className={PAGE_INACTIVE} aria-label={`Página ${p}`}>{p}</Link>
                        )
                    )}

                    {showEndEllipsis && <span className={ELLIPSIS} aria-hidden="true">···</span>}
                    {showEnd && (
                        <Link href={href(totalPages)} className={PAGE_INACTIVE} aria-label={`Página ${totalPages}`}>{totalPages}</Link>
                    )}
                </div>

                {hasNextPage ? (
                    <Link href={href(page + 1)} className={NAV_ACTIVE}>
                        <span className="hidden sm:inline">Siguiente</span>
                        <FiChevronRight aria-hidden="true" className="size-4 lg:size-4.5" />
                    </Link>
                ) : (
                    <span aria-disabled="true" className={NAV_DISABLED}>
                        <span className="hidden sm:inline">Siguiente</span>
                        <FiChevronRight aria-hidden="true" className="size-4 lg:size-4.5" />
                    </span>
                )}
            </div>

            <p className="text-fourth/75 text-sm lg:text-base">
                {total} resultado{total !== 1 ? 's' : ''} · Página {page} de {totalPages}
            </p>

        </nav>
    )
}
