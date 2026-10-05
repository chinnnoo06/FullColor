import { LinkButton } from '@/components/ui/buttons/LinkButton'
import { TFCDepotProduct } from '@/schemas/fcDepotProduct/fcDepotProduct.schemas'

const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(price)

export const FCDepotProductInfo = ({ fcDepotProduct }: { fcDepotProduct: TFCDepotProduct }) => {
    const cotizarHref = `/contacto?line=depot-web&subject=${encodeURIComponent(`Cotización del producto: ${fcDepotProduct.name}`)}#contacto-formulario`

    return (
        <div className='flex flex-col gap-5 lg:gap-10'>
            <div className="flex flex-col gap-5">
                <h1 className="font-barlow text-fourth text-3xl font-bold uppercase lg:text-4xl xl:text-5xl">
                    {fcDepotProduct.name}
                </h1>

                <p className="text-fourth/75 text-base lg:text-lg">
                    {fcDepotProduct.description}
                </p>
            </div>

            {fcDepotProduct.colors.length > 0 && (
                <div className="flex flex-col gap-2.5">
                    <span className="font-barlow text-fourth/75 text-xs lg:text-sm tracking-[0.15em] uppercase">
                        Colores disponibles
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                        {fcDepotProduct.colors.map((color) => (
                            <div key={color.hex} className="flex items-center gap-1.5">
                                <span
                                    title={color.name}
                                    className="size-4 shrink-0 rounded-full border border-fourth/30 lg:size-4.5"
                                    style={{ backgroundColor: color.hex }}
                                />
                                <span className="font-barlow text-fourth/75 text-xs lg:text-sm">
                                    {color.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-2.5">
                <span className="font-barlow text-fourth/75 text-xs lg:text-sm tracking-[0.15em] uppercase">
                    Precios
                </span>
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-baseline gap-2.5">
                        <span className="font-barlow text-fourth/75 text-sm lg:text-base">Menudeo</span>
                        <span className="font-barlow text-primary text-2xl font-bold lg:text-3xl">
                            {formatPrice(fcDepotProduct.retailPrice)}
                            <span className="text-fourth/75 ml-1.5 text-sm font-normal lg:text-base">MXN</span>
                        </span>
                    </div>

                    {fcDepotProduct.midWholesalePrice != null && (
                        <div className="flex items-baseline gap-2.5">
                            <span className="font-barlow text-fourth/75 text-sm lg:text-base">Medio mayoreo</span>
                            <span className="font-barlow text-fourth text-xl font-semibold lg:text-2xl">
                                {formatPrice(fcDepotProduct.midWholesalePrice)}
                                <span className="text-fourth/75 ml-1.5 text-sm font-normal lg:text-base">MXN</span>
                            </span>
                        </div>
                    )}

                    {fcDepotProduct.wholesalePrice != null && (
                        <div className="flex items-baseline gap-2.5">
                            <span className="font-barlow text-fourth/75 text-sm lg:text-base">Mayoreo</span>
                            <span className="font-barlow text-fourth text-xl font-semibold lg:text-2xl">
                                {formatPrice(fcDepotProduct.wholesalePrice)}
                                <span className="text-fourth/75 ml-1.5 text-sm font-normal lg:text-base">MXN</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <LinkButton href={cotizarHref} variant="secondary" width="responsive">
                Cotizar Ahora
            </LinkButton>
        </div>
    )
}
