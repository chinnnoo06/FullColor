import { Table } from '@/components/ui/table/Table';
import { TableEmpty } from '@/components/ui/table/TableEmpty';
import { TableHead } from '@/components/ui/table/TableHead';
import { TableRow } from '@/components/ui/table/TableRow';
import { TFCService } from '@/schemas/fcService/fcService.schemas';
import { ImagesCell } from '@/components/ui/table/ImagesCell';
import { TextCell } from '@/components/ui/table/TextCell';
import { ImagesButton } from '@/components/ui/buttons/ImagesButton';
import { EditButton } from '@/components/ui/buttons/EditButton';
import { DeleteFCServiceButton } from './DeleteFCServiceButton';

const COLUMNS = ['Imágenes', 'Nombre', 'Categoría', 'Descripción', 'Acciones'] as const;

export const FCServicesTable = ({ fcServices }: { fcServices: TFCService[] }) => {
    if (fcServices.length === 0) {
        return <TableEmpty>Todavía no hay servicios. Crea el primero desde el botón de arriba.</TableEmpty>;
    }

    return (
        <Table minWidth="min-w-200">
            <TableHead columns={COLUMNS} />

            <tbody className="text-fourth/75">
                {fcServices.map((fcService) => (
                    <TableRow key={fcService._id}>

                        <td className="p-5 text-sm lg:text-base align-top">
                            <ImagesCell images={fcService.images} name={fcService.name} baseUrl={process.env.NEXT_PUBLIC_FC_SERVICES_IMAGE_URL!} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top text-fourth font-medium whitespace-nowrap">
                            {fcService.name}
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top whitespace-nowrap">
                            {fcService.category.name}
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top">
                            <TextCell text={fcService.description} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top text-right whitespace-nowrap">
                            <span className="inline-flex items-center gap-2.5">
                                <ImagesButton
                                    href={`/admin/fullcolor-servicios/${fcService._id}/imagenes`}
                                    label={`Actualizar las imágenes de ${fcService.name}`}
                                />

                                <EditButton
                                    href={`/admin/fullcolor-servicios/${fcService._id}/editar`}
                                    label={`Editar el servicio ${fcService.name}`}
                                />

                                <DeleteFCServiceButton id={fcService._id} name={fcService.name} />
                            </span>
                        </td>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    );
}
