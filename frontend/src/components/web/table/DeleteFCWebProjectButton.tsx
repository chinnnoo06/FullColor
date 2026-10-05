'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useFCWebProject } from '@/hooks/useFCWebProject';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { ModalTrigger } from '@/components/ui/ModalTrigger';
import { DeleteButton } from '@/components/ui/buttons/DeleteButton';

type TDeleteFCWebProjectButtonProps = {
    id: string;
    name: string;
};

export const DeleteFCWebProjectButton = ({ id, name }: TDeleteFCWebProjectButtonProps) => {
    const { deleteFCWebProject } = useFCWebProject();

    useEffect(() => {
        if (deleteFCWebProject.error) toast.error(deleteFCWebProject.error);
        if (deleteFCWebProject.success) toast.success(deleteFCWebProject.success);
    }, [deleteFCWebProject.error, deleteFCWebProject.success]);

    return (
        <ModalTrigger
            renderTrigger={(onOpen) => (
                <DeleteButton onClick={onOpen} label={`Eliminar el proyecto ${name}`} />
            )}
        >
            {(onClose, isOpen) => (
                <ConfirmationModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onConfirm={async () => {
                        await deleteFCWebProject.handleDeleteFCWebProject(id);
                        onClose();
                    }}
                    loading={deleteFCWebProject.loading}
                    title="Eliminar proyecto"
                    context={`Se eliminará el proyecto ${name} y sus imágenes. Esta acción no se puede deshacer.`}
                />
            )}
        </ModalTrigger>
    );
};
