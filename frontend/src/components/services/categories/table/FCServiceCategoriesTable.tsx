import { Table } from '@/components/ui/table/Table';
import { TableEmpty } from '@/components/ui/table/TableEmpty';
import { TableHead } from '@/components/ui/table/TableHead';
import { TableRow } from '@/components/ui/table/TableRow';
import { TFCServiceCategory } from '@/schemas/fcServiceCategory/fcServiceCategory.schemas';
import { TextCell } from '@/components/ui/table/TextCell';
import { ImageCell } from '@/components/ui/table/ImageCell';
import { ImagesButton } from '@/components/ui/buttons/ImagesButton';
import { EditButton } from '@/components/ui/buttons/EditButton';
import { DeleteFCServiceCategoryButton } from './DeleteFCServiceCategoryButton';

const COLUMNS = ['Imagen', 'Nombre', 'Descripción', 'Acciones'] as const;

export const FCServiceCategoriesTable = ({ fcServiceCategories }: { fcServiceCategories: TFCServiceCategory[] }) => {
    if (fcServiceCategories.length === 0) {
        return <TableEmpty>Todavía no hay categorías. Crea la primera desde el botón de arriba.</TableEmpty>;
    }

    return (
        <Table minWidth="min-w-150">
            <TableHead columns={COLUMNS} />

            <tbody className="text-fourth/75">
                {fcServiceCategories.map((category) => (
                    <TableRow key={category._id}>
                        <td className="p-5 text-sm lg:text-base align-top">
                            <ImageCell image={category.image} name={category.name} baseUrl={process.env.NEXT_PUBLIC_FC_SERVICE_CATEGORIES_IMAGE_URL!} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top text-fourth font-medium whitespace-nowrap">
                            {category.name}
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top">
                            <TextCell text={category.description} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top text-right whitespace-nowrap">
                            <span className="inline-flex items-center gap-2.5">
                                <ImagesButton
                                    href={`/admin/fullcolor-categorias-servicios/${category._id}/imagen`}
                                    label={`Actualizar la imagen de ${category.name}`}
                                />

                                <EditButton
                                    href={`/admin/fullcolor-categorias-servicios/${category._id}/editar`}
                                    label={`Editar la categoría ${category.name}`}
                                />

                                <DeleteFCServiceCategoryButton id={category._id} name={category.name} />
                            </span>
                        </td>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    );
}
