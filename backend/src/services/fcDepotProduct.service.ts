import fs from "fs";
import path from "path";

import { HttpError } from "../utils/error";
import { fcDepotProductRepository } from "../repositories/fcDepotProduct.repository";
import { TFCDepotProductDocument } from "../types/fcDepotProduct/fcDepotProduct.types";
import { TMulterFiles } from "../types/multer/multer.types";
import { deleteAllUploadedFiles } from "../utils/deleteFiles";
import { buildSlug } from "../utils/slug";
import { UPLOADS_PATH } from "../config/env";
import { TFCDepotProductDto } from "../types/fcDepotProduct/fcDepotProduct.dtos";

const imagesDir = path.resolve(UPLOADS_PATH, "fcDepotProducts");
const FC_DEPOT_PRODUCTS_PER_PAGE = 12

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

export const fcDepotProductService = {

    async createFCDepotProduct(data: TFCDepotProductDto, files?: TMulterFiles) {
        try {
            const slug = buildSlug(data.name)

            const slugTaken = await fcDepotProductRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A product with that name already exists");
            }

            const images = files?.fcDepotProductImages?.map(file => file.filename) ?? []

            if (images.length === 0) {
                throw new HttpError(400, "At least one image is required for the product");
            }

            return await fcDepotProductRepository.create({ ...data, slug, images })
        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    },

    async updateFCDepotProduct(fcDepotProduct: TFCDepotProductDocument, data: TFCDepotProductDto) {
        const slug = buildSlug(data.name)

        if (slug !== fcDepotProduct.slug) {
            const slugTaken = await fcDepotProductRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A product with that name already exists");
            }

            fcDepotProduct.slug = slug
        }

        fcDepotProduct.name = data.name
        fcDepotProduct.description = data.description
        fcDepotProduct.colors = data.colors
        fcDepotProduct.retailPrice = data.retailPrice
        fcDepotProduct.midWholesalePrice = data.midWholesalePrice ?? null
        fcDepotProduct.wholesalePrice = data.wholesalePrice ?? null

        await fcDepotProduct.save()
    },

    async deleteFCDepotProduct(fcDepotProduct: TFCDepotProductDocument) {
        await fcDepotProduct.deleteOne()

        deleteImagesFromDisk(fcDepotProduct.images)
    },

    async updateFCDepotProductImages(fcDepotProduct: TFCDepotProductDocument, files?: TMulterFiles) {
        try {
            const images = files?.fcDepotProductImages?.map(file => file.filename) ?? []

            if (images.length === 0) {
                throw new HttpError(400, "At least one image is required for the product");
            }

            const oldImages = [...fcDepotProduct.images]

            fcDepotProduct.images = images
            await fcDepotProduct.save()

            deleteImagesFromDisk(oldImages)
        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    },

    async getFCDepotProductById(fcDepotProduct: TFCDepotProductDocument) {
        return fcDepotProduct
    },

    async getFCDepotProducts(page: number) {
        const result = await fcDepotProductRepository.findPaginated(page, FC_DEPOT_PRODUCTS_PER_PAGE)

        return {
            fcDepotProducts: result.docs,
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
