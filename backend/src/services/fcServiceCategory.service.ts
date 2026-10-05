import fs from "fs";
import path from "path";

import { HttpError } from "../utils/error";
import { fcServiceCategoryRepository } from "../repositories/fcServiceCategory.repository";
import { TFCServiceCategoryDocument } from "../types/fcServiceCategory/fcServiceCategory.types";
import { TFCServiceCategoryDto } from "../types/fcServiceCategory/fcServiceCategory.dtos";
import { TMulterFiles } from "../types/multer/multer.types";
import { deleteAllUploadedFiles } from "../utils/deleteFiles";
import { buildSlug } from "../utils/slug";
import { UPLOADS_PATH } from "../config/env";

const imagesDir = path.resolve(UPLOADS_PATH, "fcServiceCategories");

const deleteImageFromDisk = (name: string) => {
    const filePath = path.join(imagesDir, name)

    try {
        fs.unlinkSync(filePath)
        console.log(`File deleted: ${name}`);
    } catch (err) {
        console.error(`Error deleting ${name}`)
    }
}

export const fcServiceCategoryService = {

    async createFCServiceCategory(data: TFCServiceCategoryDto, files?: TMulterFiles) {
        try {
            const slug = buildSlug(data.name)

            const slugTaken = await fcServiceCategoryRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A category with that name already exists")
            }

            const image = files?.fcServiceCategoryImage?.[0]?.filename

            if (!image) {
                throw new HttpError(400, "An image is required for the category")
            }

            return await fcServiceCategoryRepository.create({ ...data, slug, image })
        } catch (error) {
            deleteAllUploadedFiles(files)
            throw error
        }
    },

    async updateFCServiceCategory(fcServiceCategory: TFCServiceCategoryDocument, data: TFCServiceCategoryDto) {
        const slug = buildSlug(data.name)

        if (slug !== fcServiceCategory.slug) {
            const slugTaken = await fcServiceCategoryRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A category with that name already exists")
            }

            fcServiceCategory.slug = slug
        }

        fcServiceCategory.name = data.name
        fcServiceCategory.description = data.description

        await fcServiceCategory.save()
    },

    async updateFCServiceCategoryImage(fcServiceCategory: TFCServiceCategoryDocument, files?: TMulterFiles) {
        try {
            const image = files?.fcServiceCategoryImage?.[0]?.filename

            if (!image) {
                throw new HttpError(400, "An image is required for the category")
            }

            const oldImage = fcServiceCategory.image

            fcServiceCategory.image = image
            await fcServiceCategory.save()

            deleteImageFromDisk(oldImage)
        } catch (error) {
            deleteAllUploadedFiles(files)
            throw error
        }
    },

    async deleteFCServiceCategory(fcServiceCategory: TFCServiceCategoryDocument) {
        await fcServiceCategory.deleteOne()

        deleteImageFromDisk(fcServiceCategory.image)
    },

    async getFCServiceCategories() {
        return fcServiceCategoryRepository.findAll()
    },

}
