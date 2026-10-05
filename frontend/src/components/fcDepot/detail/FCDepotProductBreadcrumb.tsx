'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaChevronRight, FaHouse } from 'react-icons/fa6'
import { getDepotOrigin } from '@/utils/fcDepotCatalogOrigin'

type TFCDepotProductBreadcrumbProps = {
    productName: string
}

export const FCDepotProductBreadcrumb = ({ productName }: TFCDepotProductBreadcrumbProps) => {
    const [catalogHref, setCatalogHref] = useState('/depot#depot-catalogo')

    useEffect(() => {
        const origin = getDepotOrigin()
        if (origin?.page && origin.page > 1) {
            setCatalogHref(`/depot?page=${origin.page}#depot-catalogo`)
        }
    }, [])

    const items = [
        { label: 'Inicio', href: '/', icon: true },
        { label: 'Catálogo', href: catalogHref },
        { label: productName },
    ]

    return (
        <nav aria-label="Ruta de navegación">
            <ol className="border-primary/30 from-primary/5 to-primary/10 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border bg-linear-to-r px-5 py-2.5">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1
                    return (
                        <li key={item.label} className="flex min-w-0 items-center gap-2">
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="text-fourth/60 hover:text-primary flex items-center gap-1.5 whitespace-nowrap text-xs transition-colors duration-200 lg:text-sm"
                                >
                                    {'icon' in item && item.icon && <FaHouse className="size-4 lg:size-4.5" aria-hidden="true" />}
                                    {item.label}
                                </Link>
                            ) : (
                                <span aria-current="page" className="text-primary truncate text-xs font-semibold lg:text-sm">
                                    {item.label}
                                </span>
                            )}
                            {!isLast && (
                                <FaChevronRight className="text-primary/40 size-4 shrink-0 lg:size-4.5" aria-hidden="true" />
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
