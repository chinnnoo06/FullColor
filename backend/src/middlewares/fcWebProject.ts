import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { TFCWebProjectDocument, FCWebTechnology } from "../types/fcWebProject/fcWebProject.types";
import { fcWebProjectRepository } from "../repositories/fcWebProject.repository";
import { HttpError } from "../utils/error";
import { TMongoIdParams, TSlugParams } from "../types/common/common.dtos";
import { sanitizeFCWebProjectContent, fcWebProjectContentToText } from "../utils/fcWebProjectContent";

declare global {
    namespace Express {
        interface Request {
            FCWebProject?: TFCWebProjectDocument
        }
    }
}

export const validateFCWebProjectInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("name").notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name must be 100 characters or less").run(req)
    await body("excerpt").notEmpty().withMessage("Excerpt is required").isLength({ max: 300 }).withMessage("Excerpt must be 300 characters or less").run(req)
    await body("technologies").isArray().withMessage("Technologies must be an array")
        .custom((values: string[]) => {
            const valid = Object.values(FCWebTechnology)
            const invalid = values.filter(v => !valid.includes(v as FCWebTechnology))
            if (invalid.length > 0) throw new Error(`Invalid technologies: ${invalid.join(", ")}`)
            return true
        }).run(req)
    await body("seo.metaTitle").notEmpty().withMessage("Meta title is required").isLength({ max: 60 }).withMessage("Meta title must be 60 characters or less").run(req)
    await body("seo.metaDescription").notEmpty().withMessage("Meta description is required").isLength({ max: 160 }).withMessage("Meta description must be 160 characters or less").run(req)
    await body("content")
        .isString().withMessage("Content must be an HTML string")
        .bail()
        .customSanitizer((html: string) => sanitizeFCWebProjectContent(html))
        .custom((html: string) => {
            if (fcWebProjectContentToText(html).length === 0) {
                throw new Error("Content cannot be empty")
            }
            return true
        })
        .run(req)
    next()
}

export const validateFCWebProjectExists = async (req: Request<TMongoIdParams>, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const fcWebProject = await fcWebProjectRepository.findById(id)

        if (!fcWebProject) {
            throw new HttpError(404, "Web project not found")
        }

        req.FCWebProject = fcWebProject

        next()
    } catch (error) {
        next(error)
    }
}

export const validateFCWebProjectExistsBySlug = async (req: Request<TSlugParams>, res: Response, next: NextFunction) => {
    const { slug } = req.params

    try {
        const fcWebProject = await fcWebProjectRepository.findBySlug(slug.trim().toLowerCase())

        if (!fcWebProject) {
            throw new HttpError(404, "Web project not found")
        }

        req.FCWebProject = fcWebProject

        next()
    } catch (error) {
        next(error)
    }
}
