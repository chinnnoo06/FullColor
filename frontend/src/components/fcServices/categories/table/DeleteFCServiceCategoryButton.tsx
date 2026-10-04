'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { DeleteButton } from '@/components/ui/buttons/DeleteButton';
import { useFCServiceCategory } from '@/hooks/useFCServiceCategory';
import { ModalTrigger } from '@/components/ui/ModalTrigger';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

type TDeleteFCServiceCategoryButtonProps = {
    id: string;
    name: string;
};

export const DeleteFCServiceCategoryButton = ({ id, name }: TDeleteFCServiceCategoryButtonProps) => {
    const { deleteFCServiceCategory } = useFCServiceCategory();

    useEffect(() => {
        if (deleteFCServiceCategory.error) toast.error(deleteFCServiceCategory.error);
        if (deleteFCServiceCategory.success) toast.success(deleteFCServiceCategory.success);
    }, [deleteFCServiceCategory.error, deleteFCServiceCategory.success]);

    return (
        <ModalTrigger
            renderTrigger={(onOpen) => (
                <DeleteButton onClick={onOpen} label={`Eliminar la categoría ${name}`} />
            )}
        >
            {(onClose, isOpen) => (
                <ConfirmationModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onConfirm={async () => {
                        await deleteFCServiceCategory.handleDeleteFCServiceCategory(id);
                        onClose();
                    }}
                    loading={deleteFCServiceCategory.loading}
                    title="Eliminar categoría"
                    context={`Se eliminará la categoría ${name} y su imagen. Esta acción no se puede deshacer.`}
                />
            )}
        </ModalTrigger>
    );
};
