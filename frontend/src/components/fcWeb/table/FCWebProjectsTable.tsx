import { Table } from '@/components/ui/table/Table';
import { TableEmpty } from '@/components/ui/table/TableEmpty';
import { TableHead } from '@/components/ui/table/TableHead';
import { TableRow } from '@/components/ui/table/TableRow';
import { ImagesButton } from '@/components/ui/buttons/ImagesButton';
import { EditButton } from '@/components/ui/buttons/EditButton';
import { TFCWebProject } from '@/schemas/fcWebProject/fcWebProject.schemas';
import { ImagesCell } from '@/components/ui/table/ImagesCell';
import { TextCell } from '@/components/ui/table/TextCell';
import { TechnologiesCell } from './TechnologiesCell';
import { DeleteFCWebProjectButton } from './DeleteFCWebProjectButton';

const COLUMNS = ['Imágenes', 'Nombre', 'Excerpt', 'Tecnologías', 'Acciones'] as const;

export const FCWebProjectsTable = ({ fcWebProjects }: { fcWebProjects: TFCWebProject[] }) => {
    if (fcWebProjects.length === 0) {
        return <TableEmpty>Todavía no hay proyectos. Crea el primero desde el botón de arriba.</TableEmpty>;
    }

    return (
        <Table minWidth="min-w-200">
            <TableHead columns={COLUMNS} />

            <tbody className="text-fourth/75">
                {fcWebProjects.map((fcWebProject) => (
                    <TableRow key={fcWebProject._id}>
                        <td className="p-5 text-sm lg:text-base align-top">
                            <ImagesCell images={fcWebProject.images} name={fcWebProject.name} baseUrl={process.env.NEXT_PUBLIC_FC_WEB_PROJECTS_IMAGE_URL!} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top text-fourth font-medium whitespace-nowrap">
                            {fcWebProject.name}
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top">
                            <TextCell text={fcWebProject.excerpt} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top">
                            <TechnologiesCell technologies={fcWebProject.technologies} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top text-right whitespace-nowrap">
                            <span className="inline-flex items-center gap-2.5">
                                <ImagesButton
                                    href={`/admin/fullcolor-web-projectos/${fcWebProject._id}/imagenes`}
                                    label={`Actualizar las imágenes de ${fcWebProject.name}`}
                                />

                                <EditButton
                                    href={`/admin/fullcolor-web-projectos/${fcWebProject._id}/editar`}
                                    label={`Editar el proyecto ${fcWebProject.name}`}
                                />

                                <DeleteFCWebProjectButton id={fcWebProject._id} name={fcWebProject.name} />
                            </span>
                        </td>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    );
};
