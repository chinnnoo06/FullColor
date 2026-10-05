import Link from 'next/link'
import { TFCServiceCategory } from '@/schemas/fcServiceCategory/fcServiceCategory.schemas'

type TFCServiceCategorySelectorProps = {
    categories: TFCServiceCategory[]
    currentSlug?: string
}

const ACTIVE = 'shrink-0 rounded-xl bg-primary px-5 py-2.5 font-barlow text-sm lg:text-base text-thrird'
const INACTIVE = 'border-fourth/30 text-fourth/75 hover:border-secondary hover:text-secondary shrink-0 rounded-xl border px-5 py-2.5 font-barlow text-sm lg:text-base transition-colors duration-300'

export const FCServiceCategorySelector = ({ categories, currentSlug }: TFCServiceCategorySelectorProps) => {
    return (
        <div role="list" aria-label="Filtrar por categoría" className="flex snap-x gap-2.5 overflow-x-auto pb-2.5 lg:flex-wrap lg:overflow-visible lg:pb-0">
            <Link href="/servicios#services-catalog" className={!currentSlug ? ACTIVE : INACTIVE}>
                Todos
            </Link>

            {categories.map((category) => (
                <Link
                    key={category.slug}
                    href={`/servicios?categoria=${category.slug}#services-catalog`}
                    className={currentSlug === category.slug ? ACTIVE : INACTIVE}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    )
}
