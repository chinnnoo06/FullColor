import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { TFCServiceCategoryDocument } from "../types/fcServiceCategory/fcServiceCategory.types";
import { fcServiceCategoryRepository } from "../repositories/fcServiceCategory.repository";
import { HttpError } from "../utils/error";
import { TMongoIdParams } from "../types/common/common.dtos";

declare global {
    namespace Express {
        interface Request {
            FCServiceCategory?: TFCServiceCategoryDocument
        }
    }
}

export const validateFCServiceCategoryInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("name").notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name must be 100 characters or less").run(req)
    await body("description").notEmpty().withMessage("Description is required").isLength({ max: 500 }).withMessage("Description must be 500 characters or less").run(req)
    next()
}

export const validateFCServiceCategorySlugQuery = async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.query.category as string | undefined

    if (!slug) return next()

    try {
        const fcServiceCategory = await fcServiceCategoryRepository.findBySlug(slug)

        if (!fcServiceCategory) {
            throw new HttpError(404, "Category not found")
        }

        req.FCServiceCategory = fcServiceCategory

        next()
    } catch (error) {
        next(error)
    }
}

export const validateFCServiceCategoryExists = async (req: Request<TMongoIdParams>, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const fcServiceCategory = await fcServiceCategoryRepository.findById(id)

        if (!fcServiceCategory) {
            throw new HttpError(404, "Category not found")
        }

        req.FCServiceCategory = fcServiceCategory

        next()
    } catch (error) {
        next(error)
    }
}
