import type { NextFunction, Request, Response } from "express"
import { TMulterFiles } from "../types/multer/multer.types";
import { TFCServiceDto, TGetFCServicesQuery } from "../types/fcService/fcService.dtos";
import { fcServiceService } from "../services/fcService.service";
import { TRequestWithFCService } from "../types/express/fcService";

export class FCServiceController {

    static createFCService = async (req: TRequestWithFCService<{}, unknown, TFCServiceDto>, res: Response, next: NextFunction) => {
        const data = req.body;
        const files = req.files as TMulterFiles;

        try {
            await fcServiceService.createFCService(data, files)

            return res.status(201).json({
                status: "success",
                message: "FCService created successfully"
            });

        } catch (error) {
            console.error("Error creating the FCService:", error);
            next(error)
        }
    }

    static updateFCService = async (req: TRequestWithFCService<{}, unknown, TFCServiceDto>, res: Response, next: NextFunction) => {
        const data = req.body;

        try {
            await fcServiceService.updateFCService(req.FCService, data)

            return res.status(200).json({
                status: "success",
                message: "FCService updated successfully"
            });

        } catch (error) {
            console.error("Error updating the FCService:", error);
            next(error)
        }
    }

    static deleteFCService = async (req: TRequestWithFCService, res: Response, next: NextFunction) => {
        try {
            await fcServiceService.deleteFCService(req.FCService)

            return res.status(200).json({
                status: "success",
                message: "FCService deleted successfully"
            });

        } catch (error) {
            console.error("Error deleting the FCService:", error);
            next(error)
        }
    }

    static updateFCServiceImages = async (req: TRequestWithFCService, res: Response, next: NextFunction) => {
        const files = req.files as TMulterFiles;

        try {
            await fcServiceService.updateFCServiceImages(req.FCService, files)

            return res.status(200).json({
                status: "success",
                message: "FCService images updated successfully"
            });

        } catch (error) {
            console.error("Error updating the FCService images:", error);
            next(error)
        }
    }

    static getFCService = async (req: TRequestWithFCService, res: Response, next: NextFunction) => {
        try {
            const fcService = await fcServiceService.getFCService(req.FCService._id.toString())

            return res.status(200).json({
                status: "success",
                fcService
            });
        } catch (error) {
            next(error)
        }
    }

    static getFCServices = async (req: Request<{}, {}, {}, TGetFCServicesQuery>, res: Response, next: NextFunction) => {
        const page = Number(req.query.page ?? 1)
        const category = req.query.category

        try {
            const { fcServices, pagination } = await fcServiceService.getFCServices(page, category)

            return res.status(200).json({
                status: "success",
                fcServices,
                pagination
            });

        } catch (error) {
            console.error("Error retrieving FCServices:", error);
            next(error)
        }
    }
}
