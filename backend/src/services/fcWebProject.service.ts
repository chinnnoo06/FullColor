import fs from "fs";
import path from "path";

import { HttpError } from "../utils/error";
import { fcWebProjectRepository } from "../repositories/fcWebProject.repository";
import { TFCWebProjectDto } from "../types/fcWebProject/fcWebProject.dtos";
import { TFCWebProjectDocument } from "../types/fcWebProject/fcWebProject.types";
import { TMulterFiles } from "../types/multer/multer.types";
import { deleteAllUploadedFiles } from "../utils/deleteFiles";
import { buildSlug } from "../utils/slug";
import { UPLOADS_PATH } from "../config/env";

const imagesDir = path.resolve(UPLOADS_PATH, "fcWebProjects");
const FC_WEB_PROJECTS_PER_PAGE = 9

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

export const fcWebProjectService = {

    async createFCWebProject(data: TFCWebProjectDto, files?: TMulterFiles) {
        try {
            const slug = buildSlug(data.name)

            const slugTaken = await fcWebProjectRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A web project with that name already exists")
            }

            const images = files?.fcWebProjectImages?.map(file => file.filename) ?? []

            if (images.length === 0) {
                throw new HttpError(400, "At least one image is required for the web project")
            }

            return await fcWebProjectRepository.create({ ...data, slug, images })
        } catch (error) {
            deleteAllUploadedFiles(files)
            throw error
        }
    },

    async updateFCWebProject(fcWebProject: TFCWebProjectDocument, data: TFCWebProjectDto) {
        const slug = buildSlug(data.name)

        if (slug !== fcWebProject.slug) {
            const slugTaken = await fcWebProjectRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A web project with that name already exists")
            }

            fcWebProject.slug = slug
        }

        fcWebProject.name = data.name
        fcWebProject.excerpt = data.excerpt
        fcWebProject.content = data.content
        fcWebProject.technologies = data.technologies
        fcWebProject.seo = data.seo

        await fcWebProject.save()
    },

    async updateFCWebProjectImages(fcWebProject: TFCWebProjectDocument, files?: TMulterFiles) {
        try {
            const images = files?.fcWebProjectImages?.map(file => file.filename) ?? []

            if (images.length === 0) {
                throw new HttpError(400, "At least one image is required for the web project")
            }

            const oldImages = [...fcWebProject.images]

            fcWebProject.images = images
            await fcWebProject.save()

            deleteImagesFromDisk(oldImages)
        } catch (error) {
            deleteAllUploadedFiles(files)
            throw error
        }
    },

    async deleteFCWebProject(fcWebProject: TFCWebProjectDocument) {
        await fcWebProject.deleteOne()

        deleteImagesFromDisk(fcWebProject.images)
    },

    async getFCWebProjects(page: number) {
        const result = await fcWebProjectRepository.findPaginated(page, FC_WEB_PROJECTS_PER_PAGE)

        return {
            fcWebProjects: result.docs,
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
