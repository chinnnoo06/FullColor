import { Table } from '@/components/ui/table/Table';
import { TableEmpty } from '@/components/ui/table/TableEmpty';
import { TableHead } from '@/components/ui/table/TableHead';
import { TableRow } from '@/components/ui/table/TableRow';
import { ImagesButton } from '@/components/ui/buttons/ImagesButton';
import { EditButton } from '@/components/ui/buttons/EditButton';
import { TFCDepotProduct } from '@/schemas/fcDepotProduct/fcDepotProduct.schemas';
import { ImagesCell } from '@/components/ui/table/ImagesCell';
import { TextCell } from '@/components/ui/table/TextCell';
import { ColorsCell } from './ColorsCell';
import { DeleteFCDepotProductButton } from './DeleteFCDepotProductButton';

const COLUMNS = ['Imágenes', 'Nombre', 'Descripción', 'Colores', 'Precios', 'Acciones'] as const;

export const FCDepotProductsTable = ({ fcDepotProducts }: { fcDepotProducts: TFCDepotProduct[] }) => {
    if (fcDepotProducts.length === 0) {
        return <TableEmpty>Todavía no hay productos. Crea el primero desde el botón de arriba.</TableEmpty>;
    }

    return (
        <Table minWidth="min-w-200">
            <TableHead columns={COLUMNS} />

            <tbody className="text-fourth/75">
                {fcDepotProducts.map((fcDepotProduct) => (
                    <TableRow key={fcDepotProduct._id}>
                        <td className="p-5 text-sm lg:text-base align-top">
                            <ImagesCell images={fcDepotProduct.images} name={fcDepotProduct.name} baseUrl={process.env.NEXT_PUBLIC_FC_DEPOT_PRODUCTS_IMAGE_URL!} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top text-fourth font-medium whitespace-nowrap">
                            {fcDepotProduct.name}
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top">
                            <TextCell text={fcDepotProduct.description} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top">
                            <ColorsCell colors={fcDepotProduct.colors} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top whitespace-nowrap">
                            <div className="flex flex-col gap-1.5">
                                <span>Menudeo: <span className="text-fourth font-medium">${fcDepotProduct.retailPrice}</span></span>
                                {fcDepotProduct.midWholesalePrice != null && (
                                    <span>M.Mayoreo: <span className="text-fourth font-medium">${fcDepotProduct.midWholesalePrice}</span></span>
                                )}
                                {fcDepotProduct.wholesalePrice != null && (
                                    <span>Mayoreo: <span className="text-fourth font-medium">${fcDepotProduct.wholesalePrice}</span></span>
                                )}
                            </div>
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top text-right whitespace-nowrap">
                            <span className="inline-flex items-center gap-2.5">
                                <ImagesButton
                                    href={`/admin/fullcolor-depot-productos/${fcDepotProduct._id}/imagenes`}
                                    label={`Actualizar las imágenes de ${fcDepotProduct.name}`}
                                />

                                <EditButton
                                    href={`/admin/fullcolor-depot-productos/${fcDepotProduct._id}/editar`}
                                    label={`Editar el producto ${fcDepotProduct.name}`}
                                />

                                <DeleteFCDepotProductButton id={fcDepotProduct._id} name={fcDepotProduct.name} />
                            </span>
                        </td>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    );
};
