'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { DeleteButton } from '@/components/ui/buttons/DeleteButton';
import { useFCService } from '@/hooks/useFCService';
import { ModalTrigger } from '@/components/ui/ModalTrigger';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

type TDeleteFCServiceButtonProps = {
    id: string;
    name: string;
};

export const DeleteFCServiceButton = ({ id, name }: TDeleteFCServiceButtonProps) => {
    const { deleteFCService } = useFCService();

    useEffect(() => {
        if (deleteFCService.error) toast.error(deleteFCService.error);
        if (deleteFCService.success) toast.success(deleteFCService.success);
    }, [deleteFCService.error, deleteFCService.success]);

    return (
        <ModalTrigger
            renderTrigger={(onOpen) => (
                <DeleteButton onClick={onOpen} label={`Eliminar el servicio ${name}`} />
            )}
        >
            {(onClose, isOpen) => (
                <ConfirmationModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onConfirm={async () => {
                        await deleteFCService.handleDeleteFCService(id);
                        onClose();
                    }}
                    loading={deleteFCService.loading}
                    title="Eliminar servicio"
                    context={`Se eliminará el servicio ${name} y sus imágenes. Esta acción no se puede deshacer.`}
                />
            )}
        </ModalTrigger>
    );
};
