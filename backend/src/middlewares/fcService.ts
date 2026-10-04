import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { TFCServiceDocument } from "../types/fcService/fcService.types";
import { fcServiceRepository } from "../repositories/fcService.repository";
import { HttpError } from "../utils/error";
import { TMongoIdParams } from "../types/common/common.dtos";

declare global {
    namespace Express {
        interface Request {
            FCService?: TFCServiceDocument
        }
    }
}

export const validateFCServiceInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("name").notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name must be 100 characters or less").run(req)
    await body("description").notEmpty().withMessage("Description is required").isLength({ max: 500 }).withMessage("Description must be 500 characters or less").run(req)
    await body("category").notEmpty().withMessage("Category is required").isMongoId().withMessage("Invalid category id").run(req)
    next()
}

export const validateFCServiceExists = async (req: Request<TMongoIdParams>, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const fcService = await fcServiceRepository.findById(id)

        if (!fcService) {
            throw new HttpError(404, "Service not found")
        }

        req.FCService = fcService

        next()
    } catch (error) {
        next(error)
    }
}
