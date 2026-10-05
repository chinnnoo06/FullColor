import type { TPagination } from '@/schemas/common/common.response.schemas'

type TUsePaginationProps = {
    pagination: TPagination
    basePath: string
    anchor?: string
}

export const usePagination = ({ pagination, basePath, anchor }: TUsePaginationProps) => {
    const { page, totalPages, total, hasNextPage, hasPrevPage } = pagination
    const sep = basePath.includes('?') ? '&' : '?'

    const href = (n: number) => `${basePath}${sep}page=${n}${anchor ? `#${anchor}` : ''}`

    const pageRange: number[] = (() => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
        if (page <= 3) return [1, 2, 3, 4, 5]
        if (page >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        return [page - 2, page - 1, page, page + 1, page + 2]
    })()

    const showStart = pageRange[0] > 1
    const showStartEllipsis = pageRange[0] > 2
    const showEnd = pageRange[pageRange.length - 1] < totalPages
    const showEndEllipsis = pageRange[pageRange.length - 1] < totalPages - 1

    return {
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
    }
}
