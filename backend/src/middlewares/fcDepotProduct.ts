import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { TFCDepotProductDocument } from "../types/fcDepotProduct/fcDepotProduct.types";
import { fcDepotProductRepository } from "../repositories/fcDepotProduct.repository";
import { HttpError } from "../utils/error";
import { TMongoIdParams, TSlugParams } from "../types/common/common.dtos";

declare global {
    namespace Express {
        interface Request {
            FCDepotProduct?: TFCDepotProductDocument
        }
    }
}

export const validateFCDepotProductInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("name").notEmpty().withMessage("Name is required")
        .isLength({ max: 100 }).withMessage("Name must be 100 characters or less").run(req)
    await body("description").notEmpty().withMessage("Description is required")
        .isLength({ max: 500 }).withMessage("Description must be 500 characters or less").run(req)
    await body("colors").isArray().withMessage("Colors must be an array").run(req)
    await body("colors.*.name").notEmpty().withMessage("Color name is required")
        .isLength({ max: 50 }).withMessage("Color name must be 50 characters or less").run(req)
    await body("colors.*.hex").notEmpty().withMessage("Color hex is required").matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/).withMessage("Color hex must be a valid hex color").run(req)
    await body("seo.metaTitle").notEmpty().withMessage("Meta title is required")
        .isLength({ max: 60 }).withMessage("Meta title must be 60 characters or less").run(req)
    await body("seo.metaDescription").notEmpty().withMessage("Meta description is required")
        .isLength({ max: 160 }).withMessage("Meta description must be 160 characters or less").run(req)
    await body("retailPrice").isFloat({ min: 0 }).withMessage("Retail price is required and must be a positive number").run(req)
    await body("midWholesalePrice").optional({ nullable: true }).isFloat({ min: 0 }).withMessage("Mid wholesale price must be a positive number").run(req)
    await body("wholesalePrice").optional({ nullable: true }).isFloat({ min: 0 }).withMessage("Wholesale price must be a positive number").run(req)
    next()
}

export const validateFCDepotProductExists = async (req: Request<TMongoIdParams>, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const fcDepotProduct = await fcDepotProductRepository.findById(id)

        if (!fcDepotProduct) {
            throw new HttpError(404, "Product not found")
        }

        req.FCDepotProduct = fcDepotProduct

        next()
    } catch (error) {
        next(error)
    }
}

export const validateFCDepotProductExistsBySlug = async (req: Request<TSlugParams>, res: Response, next: NextFunction) => {
    const { slug } = req.params

    try {
        const fcDepotProduct = await fcDepotProductRepository.findBySlug(slug)

        if (!fcDepotProduct) {
            throw new HttpError(404, "Product not found")
        }

        req.FCDepotProduct = fcDepotProduct

        next()
    } catch (error) {
        next(error)
    }
}
