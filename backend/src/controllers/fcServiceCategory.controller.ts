import type { NextFunction, Request, Response } from "express"
import { TMulterFiles } from "../types/multer/multer.types";
import { TFCServiceCategoryDto } from "../types/fcServiceCategory/fcServiceCategory.dtos";
import { fcServiceCategoryService } from "../services/fcServiceCategory.service";
import { TRequestWithFCServiceCategory } from "../types/express/fcServiceCategory";

export class FCServiceCategoryController {

    static createFCServiceCategory = async (req: TRequestWithFCServiceCategory<{}, unknown, TFCServiceCategoryDto>, res: Response, next: NextFunction) => {
        const data = req.body;
        const files = req.files as TMulterFiles;

        try {
            await fcServiceCategoryService.createFCServiceCategory(data, files)

            return res.status(201).json({
                status: "success",
                message: "Category created successfully"
            });

        } catch (error) {
            console.error("Error creating the FCServiceCategory:", error);
            next(error)
        }
    }

    static updateFCServiceCategory = async (req: TRequestWithFCServiceCategory<{}, unknown, TFCServiceCategoryDto>, res: Response, next: NextFunction) => {
        const data = req.body;

        try {
            await fcServiceCategoryService.updateFCServiceCategory(req.FCServiceCategory, data)

            return res.status(200).json({
                status: "success",
                message: "Category updated successfully"
            });

        } catch (error) {
            console.error("Error updating the FCServiceCategory:", error);
            next(error)
        }
    }

    static updateFCServiceCategoryImage = async (req: TRequestWithFCServiceCategory, res: Response, next: NextFunction) => {
        const files = req.files as TMulterFiles;

        try {
            await fcServiceCategoryService.updateFCServiceCategoryImage(req.FCServiceCategory, files)

            return res.status(200).json({
                status: "success",
                message: "Category image updated successfully"
            });

        } catch (error) {
            console.error("Error updating the FCServiceCategory image:", error);
            next(error)
        }
    }

    static deleteFCServiceCategory = async (req: TRequestWithFCServiceCategory, res: Response, next: NextFunction) => {
        try {
            await fcServiceCategoryService.deleteFCServiceCategory(req.FCServiceCategory)

            return res.status(200).json({
                status: "success",
                message: "Category deleted successfully"
            });

        } catch (error) {
            console.error("Error deleting the FCServiceCategory:", error);
            next(error)
        }
    }

    static getFCServiceCategory = async (req: TRequestWithFCServiceCategory, res: Response, next: NextFunction) => {
        return res.status(200).json({
            status: "success",
            fcServiceCategory: req.FCServiceCategory
        });
    }

    static getFCServiceCategories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fcServiceCategories = await fcServiceCategoryService.getFCServiceCategories()

            return res.status(200).json({
                status: "success",
                fcServiceCategories
            });

        } catch (error) {
            console.error("Error retrieving FCServiceCategories:", error);
            next(error)
        }
    }

}
