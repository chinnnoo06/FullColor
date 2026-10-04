import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { TMulterFiles } from "../types/multer/multer.types";
import { deleteAllUploadedFiles } from "../utils/deleteFiles";
import { HttpError } from "../utils/error";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        deleteAllUploadedFiles(req.files as TMulterFiles | undefined);
        return next(new HttpError(400, errors.array().map(e => e.msg).join(", ")));
    }

    next();
};

const IMAGE_MAX_SIZE = 10 * 1024 * 1024;

export const validateImagesFormat = (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as TMulterFiles | undefined;
    const imagesFiles: Express.Multer.File[] = Object.values(files ?? {}).flatMap(f => f ?? []);

    if (imagesFiles.length === 0) {
        deleteAllUploadedFiles(files);
        return next(new HttpError(400, "At least one image is required"));
    }

    const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    const invalidFile = imagesFiles.find(f => !allowedFormats.includes(f.mimetype));
    if (invalidFile) {
        deleteAllUploadedFiles(files);
        return next(new HttpError(400, "One or more files have an invalid format, it must be (jpeg, jpg, png, webp)."));
    }

    const oversized = imagesFiles.find(f => f.size > IMAGE_MAX_SIZE);
    if (oversized) {
        deleteAllUploadedFiles(files);
        return next(new HttpError(400, "One or more images exceed the 10 MB limit."));
    }

    next();
};

export const parseJsonFields = (fields: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            fields.forEach(field => {
                const value = req.body[field];
                if (typeof value === "string") req.body[field] = JSON.parse(value);
            });
            next();
        } catch {
            deleteAllUploadedFiles(req.files as TMulterFiles | undefined);
            return next(new HttpError(400, `These fields must be valid JSON: ${fields.join(", ")}`));
        }
    };
