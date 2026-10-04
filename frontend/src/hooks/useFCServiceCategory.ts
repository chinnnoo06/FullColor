import { useState } from 'react'
import { useActionStatus } from './ui/useActionStatus'
import { createFCServiceCategory } from '@/actions/fcServiceCategory/create-fcServiceCategory-action'
import { updateFCServiceCategory } from '@/actions/fcServiceCategory/update-fcServiceCategory-action'
import { updateFCServiceCategoryImage } from '@/actions/fcServiceCategory/update-fcServiceCategory-image-action'
import { deleteFCServiceCategory } from '@/actions/fcServiceCategory/delete-fcServiceCategory-action'
import { TFCServiceCategory } from '@/schemas/fcServiceCategory/fcServiceCategory.schemas'
import { TCreateFCServiceCategoryForm, TUpdateFCServiceCategoryForm, TUpdateFCServiceCategoryImageForm } from '@/schemas/fcServiceCategory/fcServiceCategory.form.schemas'

export const useFCServiceCategory = () => {
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

    const handleCreateFCServiceCategory = async (data: TCreateFCServiceCategoryForm) => {
        if (createStatus.loading) return

        setErrorCreate(null)
        setSuccessCreate(null)

        createStatus.startLoading()

        const res = await createFCServiceCategory(data)

        createStatus.stopLoading()

        if (res.error) return setErrorCreate(res.error)

        if (res.success) setSuccessCreate(res.success)
    }

    const handleUpdateFCServiceCategory = async (id: TFCServiceCategory['_id'], data: TUpdateFCServiceCategoryForm) => {
        if (updateStatus.loading) return

        setErrorUpdate(null)
        setSuccessUpdate(null)

        updateStatus.startLoading()

        const res = await updateFCServiceCategory(id, data)

        updateStatus.stopLoading()

        if (res.error) return setErrorUpdate(res.error)

        if (res.success) setSuccessUpdate(res.success)
    }

    const handleUpdateFCServiceCategoryImage = async (id: TFCServiceCategory['_id'], data: TUpdateFCServiceCategoryImageForm) => {
        if (imageStatus.loading) return

        setErrorImage(null)
        setSuccessImage(null)

        imageStatus.startLoading()

        const res = await updateFCServiceCategoryImage(id, data)

        imageStatus.stopLoading()

        if (res.error) return setErrorImage(res.error)

        if (res.success) setSuccessImage(res.success)
    }

    const handleDeleteFCServiceCategory = async (id: TFCServiceCategory['_id']) => {
        if (deleteStatus.loading) return

        setErrorDelete(null)
        setSuccessDelete(null)

        deleteStatus.startLoading()

        const res = await deleteFCServiceCategory(id)

        deleteStatus.stopLoading()

        if (res.error) return setErrorDelete(res.error)

        if (res.success) setSuccessDelete(res.success)
    }

    return {
        createFCServiceCategory: {
            handleCreateFCServiceCategory,
            loading: createStatus.loading,
            error: errorCreate,
            success: successCreate
        },

        updateFCServiceCategory: {
            handleUpdateFCServiceCategory,
            loading: updateStatus.loading,
            error: errorUpdate,
            success: successUpdate
        },

        updateFCServiceCategoryImage: {
            handleUpdateFCServiceCategoryImage,
            loading: imageStatus.loading,
            error: errorImage,
            success: successImage
        },

        deleteFCServiceCategory: {
            handleDeleteFCServiceCategory,
            loading: deleteStatus.loading,
            error: errorDelete,
            success: successDelete
        }
    }
}
