import { useState } from 'react'
import { useActionStatus } from './ui/useActionStatus'

import { createFCWebProject } from '@/actions/fcWebProject/create-fcWebProject-action'
import { updateFCWebProject } from '@/actions/fcWebProject/update-fcWebProject-action'
import { updateFCWebProjectImages } from '@/actions/fcWebProject/update-fcWebProject-images-action'
import { deleteFCWebProject } from '@/actions/fcWebProject/delete-fcWebProject-action'
import { TFCWebProject } from '@/schemas/fcWebProject/fcWebProject.schemas'
import { TCreateFCWebProjectForm, TUpdateFCWebProjectForm, TUpdateFCWebProjectImagesForm } from '@/schemas/fcWebProject/fcWebProject.form.schemas'

export const useFCWebProject = () => {
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

    const handleCreateFCWebProject = async (data: TCreateFCWebProjectForm) => {
        if (createStatus.loading) return

        setErrorCreate(null)
        setSuccessCreate(null)

        createStatus.startLoading()

        const res = await createFCWebProject(data)

        createStatus.stopLoading()

        if (res.error) return setErrorCreate(res.error)

        if (res.success) setSuccessCreate(res.success)
    }

    const handleUpdateFCWebProject = async (id: TFCWebProject['_id'], data: TUpdateFCWebProjectForm) => {
        if (updateStatus.loading) return

        setErrorUpdate(null)
        setSuccessUpdate(null)

        updateStatus.startLoading()

        const res = await updateFCWebProject(id, data)

        updateStatus.stopLoading()

        if (res.error) return setErrorUpdate(res.error)

        if (res.success) setSuccessUpdate(res.success)
    }

    const handleUpdateFCWebProjectImage = async (id: TFCWebProject['_id'], data: TUpdateFCWebProjectImagesForm) => {
        if (imageStatus.loading) return

        setErrorImage(null)
        setSuccessImage(null)

        imageStatus.startLoading()

        const res = await updateFCWebProjectImages(id, data)

        imageStatus.stopLoading()

        if (res.error) return setErrorImage(res.error)

        if (res.success) setSuccessImage(res.success)
    }

    const handleDeleteFCWebProject = async (id: TFCWebProject['_id']) => {
        if (deleteStatus.loading) return

        setErrorDelete(null)
        setSuccessDelete(null)

        deleteStatus.startLoading()

        const res = await deleteFCWebProject(id)

        deleteStatus.stopLoading()

        if (res.error) return setErrorDelete(res.error)

        if (res.success) setSuccessDelete(res.success)
    }

    return {
        createFCWebProject: {
            handleCreateFCWebProject,
            loading: createStatus.loading,
            error: errorCreate,
            success: successCreate
        },

        updateFCWebProject: {
            handleUpdateFCWebProject,
            loading: updateStatus.loading,
            error: errorUpdate,
            success: successUpdate
        },

        updateFCWebProjectImage: {
            handleUpdateFCWebProjectImage,
            loading: imageStatus.loading,
            error: errorImage,
            success: successImage
        },

        deleteFCWebProject: {
            handleDeleteFCWebProject,
            loading: deleteStatus.loading,
            error: errorDelete,
            success: successDelete
        }
    }
}
