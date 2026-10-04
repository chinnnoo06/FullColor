import { useState } from 'react'
import { useActionStatus } from './ui/useActionStatus'

import { createFCDepotProduct } from '@/actions/fcDepotProduct/create-fcDepotProduct-action'
import { updateFCDepotProduct } from '@/actions/fcDepotProduct/update-fcDepotProduct-action'
import { updateFCDepotProductImages } from '@/actions/fcDepotProduct/update-fcDepotProduct-images-action'
import { deleteFCDepotProduct } from '@/actions/fcDepotProduct/delete-fcDepotProduct-action'
import { TFCDepotProduct } from '@/schemas/fcDepotProduct/fcDepotProduct.schemas'
import { TCreateFCDepotProductForm, TUpdateFCDepotProductForm, TUpdateFCDepotProductImagesForm } from '@/schemas/fcDepotProduct/fcDepotProduct.form.schemas'

export const useFCDepotProduct = () => {
    const createStatus = useActionStatus()
    const updateStatus = useActionStatus()
    const imageStatus = useActionStatus()
    const deleteStatus = useActionStatus()

    const [errorCreate, setErrorCreate] = useState<string | null>(null)
    const [successCreate, setSuccessCreate] = useState<string | null>(null)

    const [errorUpdate, setErrorUpdate] = useState<string | null>(null)
    const [successUpdate, setSuccessUpdate] = useState<string | null>(null)

    const [errorImage, setErrorImage] = useState<string | null>(null)
    const [successImage, setSuccessImage] = useState<string | null>(null)

    const [errorDelete, setErrorDelete] = useState<string | null>(null)
    const [successDelete, setSuccessDelete] = useState<string | null>(null)

    const handleCreateFCDepotProduct = async (data: TCreateFCDepotProductForm) => {
        if (createStatus.loading) return

        setErrorCreate(null)
        setSuccessCreate(null)

        createStatus.startLoading()

        const res = await createFCDepotProduct(data)

        createStatus.stopLoading()

        if (res.error) return setErrorCreate(res.error)

        if (res.success) setSuccessCreate(res.success)
    }

    const handleUpdateFCDepotProduct = async (id: TFCDepotProduct['_id'], data: TUpdateFCDepotProductForm) => {
        if (updateStatus.loading) return

        setErrorUpdate(null)
        setSuccessUpdate(null)

        updateStatus.startLoading()

        const res = await updateFCDepotProduct(id, data)

        updateStatus.stopLoading()

        if (res.error) return setErrorUpdate(res.error)

        if (res.success) setSuccessUpdate(res.success)
    }

    const handleUpdateFCDepotProductImage = async (id: TFCDepotProduct['_id'], data: TUpdateFCDepotProductImagesForm) => {
        if (imageStatus.loading) return

        setErrorImage(null)
        setSuccessImage(null)

        imageStatus.startLoading()

        const res = await updateFCDepotProductImages(id, data)

        imageStatus.stopLoading()

        if (res.error) return setErrorImage(res.error)

        if (res.success) setSuccessImage(res.success)
    }

    const handleDeleteFCDepotProduct = async (id: TFCDepotProduct['_id']) => {
        if (deleteStatus.loading) return

        setErrorDelete(null)
        setSuccessDelete(null)

        deleteStatus.startLoading()

        const res = await deleteFCDepotProduct(id)

        deleteStatus.stopLoading()

        if (res.error) return setErrorDelete(res.error)

        if (res.success) setSuccessDelete(res.success)
    }

    return {
        createFCDepotProduct: {
            handleCreateFCDepotProduct,
            loading: createStatus.loading,
            error: errorCreate,
            success: successCreate
        },

        updateFCDepotProduct: {
            handleUpdateFCDepotProduct,
            loading: updateStatus.loading,
            error: errorUpdate,
            success: successUpdate
        },

        updateFCDepotProductImage: {
            handleUpdateFCDepotProductImage,
            loading: imageStatus.loading,
            error: errorImage,
            success: successImage
        },

        deleteFCDepotProduct: {
            handleDeleteFCDepotProduct,
            loading: deleteStatus.loading,
            error: errorDelete,
            success: successDelete
        }
    }
}
