import fs from "fs";
import path from "path";

import { Types } from "mongoose";
import { HttpError } from "../utils/error";
import { fcServiceRepository } from "../repositories/fcService.repository";
import { TFCServiceDto } from "../types/fcService/fcService.dtos";
import { TFCServiceDocument } from "../types/fcService/fcService.types";
import { TMulterFiles } from "../types/multer/multer.types";
import { deleteAllUploadedFiles } from "../utils/deleteFiles";
import { UPLOADS_PATH } from "../config/env";

const imagesDir = path.resolve(UPLOADS_PATH, "fcServices");
const FC_SERVICES_PER_PAGE = 6

const deleteImagesFromDisk = (names: string[]) => {
    names.forEach(name => {
        const filePath = path.join(imagesDir, name)

        try {
            fs.unlinkSync(filePath)
            console.log(`File deleted: ${name}`);
        } catch (err) {
            console.error(`Error deleting ${name}`)
        }
    })
}

export const fcServiceService = {

    async createFCService(data: TFCServiceDto, files?: TMulterFiles) {
        try {
            const images = files?.fcServiceImages?.map(file => file.filename) ?? []

            if (images.length === 0) {
                throw new HttpError(400, "At least one image is required for the FCService");
            }

            return await fcServiceRepository.create({ ...data, images, category: data.category as unknown as Types.ObjectId })
        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    },

    async updateFCService(fcService: TFCServiceDocument, data: TFCServiceDto) {
        fcService.name = data.name
        fcService.description = data.description
        fcService.category = data.category as unknown as Types.ObjectId

        await fcService.save()
    },

    async deleteFCService(fcService: TFCServiceDocument) {
        await fcService.deleteOne()

        deleteImagesFromDisk(fcService.images)
    },

    async updateFCServiceImages(fcService: TFCServiceDocument, files?: TMulterFiles) {
        try {
            const images = files?.fcServiceImages?.map(file => file.filename) ?? []

            if (images.length === 0) {
                throw new HttpError(400, "At least one image is required for the FCService");
            }

            const oldImages = [...fcService.images]

            fcService.images = images
            await fcService.save()

            deleteImagesFromDisk(oldImages)
        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    },

    async getFCService(id: string) {
        return fcServiceRepository.findByIdPopulated(id)
    },

    async getFCServices(page: number, categoryId?: string) {
        const filter = categoryId ? { category: categoryId } : {}
        const result = await fcServiceRepository.findPaginated(page, FC_SERVICES_PER_PAGE, filter)

        return {
            fcServices: result.docs,
            pagination: {
                page: result.page,
                limit: result.limit,
                total: result.totalDocs,
                totalPages: result.totalPages,
                hasNextPage: result.hasNextPage,
                hasPrevPage: result.hasPrevPage
            }
        }
    },

}
