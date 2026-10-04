'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useFCDepotProduct } from '@/hooks/useFCDepotProduct';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { ModalTrigger } from '@/components/ui/ModalTrigger';
import { DeleteButton } from '@/components/ui/buttons/DeleteButton';

type TDeleteFCDepotProductButtonProps = {
    id: string;
    name: string;
};

export const DeleteFCDepotProductButton = ({ id, name }: TDeleteFCDepotProductButtonProps) => {
    const { deleteFCDepotProduct } = useFCDepotProduct();

    useEffect(() => {
        if (deleteFCDepotProduct.error) toast.error(deleteFCDepotProduct.error);
        if (deleteFCDepotProduct.success) toast.success(deleteFCDepotProduct.success);
    }, [deleteFCDepotProduct.error, deleteFCDepotProduct.success]);

    return (
        <ModalTrigger
            renderTrigger={(onOpen) => (
                <DeleteButton onClick={onOpen} label={`Eliminar el producto ${name}`} />
            )}
        >
            {(onClose, isOpen) => (
                <ConfirmationModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onConfirm={async () => {
                        await deleteFCDepotProduct.handleDeleteFCDepotProduct(id);
                        onClose();
                    }}
                    loading={deleteFCDepotProduct.loading}
                    title="Eliminar producto"
                    context={`Se eliminará el producto ${name} y sus imágenes. Esta acción no se puede deshacer.`}
                />
            )}
        </ModalTrigger>
    );
};
