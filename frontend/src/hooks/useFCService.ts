import { useState } from 'react'
import { useActionStatus } from './ui/useActionStatus'
import { createFCService } from '@/actions/fcService/create-fcService-action'
import { updateFCService } from '@/actions/fcService/update-fcService-action'
import { updateFCServiceImages } from '@/actions/fcService/update-fcService-images-action'
import { deleteFCService } from '@/actions/fcService/delete-fcService-action'
import { TFCService } from '@/schemas/fcService/fcService.schemas'
import { TCreateFCServiceForm, TUpdateFCServiceForm, TUpdateTFCServiceImagesForm } from '@/schemas/fcService/fcService.form.schemas'

export const useFCService = () => {
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

    const handleCreateFCService = async (data: TCreateFCServiceForm) => {
        if (createStatus.loading) return

        setErrorCreate(null)
        setSuccessCreate(null)

        createStatus.startLoading()

        const res = await createFCService(data)

        createStatus.stopLoading()

        if (res.error) return setErrorCreate(res.error)

        if (res.success) setSuccessCreate(res.success)
    }

    const handleUpdateFCService = async (id: TFCService['_id'], data: TUpdateFCServiceForm) => {
        if (updateStatus.loading) return

        setErrorUpdate(null)
        setSuccessUpdate(null)

        updateStatus.startLoading()

        const res = await updateFCService(id, data)

        updateStatus.stopLoading()

        if (res.error) return setErrorUpdate(res.error)

        if (res.success) setSuccessUpdate(res.success)
    }

    const handleUpdateFCServiceImage = async (id: TFCService['_id'], data: TUpdateTFCServiceImagesForm) => {
        if (imageStatus.loading) return

        setErrorImage(null)
        setSuccessImage(null)

        imageStatus.startLoading()

        const res = await updateFCServiceImages(id, data)

        imageStatus.stopLoading()

        if (res.error) return setErrorImage(res.error)

        if (res.success) setSuccessImage(res.success)
    }

    const handleDeleteFCService = async (id: TFCService['_id']) => {
        if (deleteStatus.loading) return

        setErrorDelete(null)
        setSuccessDelete(null)

        deleteStatus.startLoading()

        const res = await deleteFCService(id)

        deleteStatus.stopLoading()

        if (res.error) return setErrorDelete(res.error)

        if (res.success) setSuccessDelete(res.success)
    }

    return {
        createFCService: {
            handleCreateFCService,
            loading: createStatus.loading,
            error: errorCreate,
            success: successCreate
        },

        updateFCService: {
            handleUpdateFCService,
            loading: updateStatus.loading,
            error: errorUpdate,
            success: successUpdate
        },

        updateFCServiceImage: {
            handleUpdateFCServiceImage,
            loading: imageStatus.loading,
            error: errorImage,
            success: successImage
        },

        deleteFCService: {
            handleDeleteFCService,
            loading: deleteStatus.loading,
            error: errorDelete,
            success: successDelete
        }
    }
}