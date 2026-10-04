import type { NextFunction, Request, Response } from "express"
import { TMulterFiles } from "../types/multer/multer.types";
import { TFCWebProjectDto } from "../types/fcWebProject/fcWebProject.dtos";
import { fcWebProjectService } from "../services/fcWebProject.service";
import { TRequestWithFCWebProject } from "../types/express/fcWebProject";
import { TPaginationQuery } from "../types/common/common.dtos";

export class FCWebProjectController {

    static createFCWebProject = async (req: Request<{}, {}, TFCWebProjectDto>, res: Response, next: NextFunction) => {
        const data = req.body;
        const files = req.files as TMulterFiles;

        try {
            await fcWebProjectService.createFCWebProject(data, files)

            return res.status(201).json({
                status: "success",
                message: "Web project created successfully"
            });

        } catch (error) {
            console.error("Error creating the web project:", error);
            next(error)
        }
    }

    static updateFCWebProject = async (req: TRequestWithFCWebProject<{}, unknown, TFCWebProjectDto>, res: Response, next: NextFunction) => {
        const data = req.body;

        try {
            await fcWebProjectService.updateFCWebProject(req.FCWebProject, data)

            return res.status(200).json({
                status: "success",
                message: "Web project updated successfully"
            });

        } catch (error) {
            console.error("Error updating the web project:", error);
            next(error)
        }
    }

    static deleteFCWebProject = async (req: TRequestWithFCWebProject, res: Response, next: NextFunction) => {
        try {
            await fcWebProjectService.deleteFCWebProject(req.FCWebProject)

            return res.status(200).json({
                status: "success",
                message: "Web project deleted successfully"
            });

        } catch (error) {
            console.error("Error deleting the web project:", error);
            next(error)
        }
    }

    static updateFCWebProjectImages = async (req: TRequestWithFCWebProject, res: Response, next: NextFunction) => {
        const files = req.files as TMulterFiles;

        try {
            await fcWebProjectService.updateFCWebProjectImages(req.FCWebProject, files)

            return res.status(200).json({
                status: "success",
                message: "Web project images updated successfully"
            });

        } catch (error) {
            console.error("Error updating the web project images:", error);
            next(error)
        }
    }

    static getFCWebProject = async (req: TRequestWithFCWebProject, res: Response, next: NextFunction) => {
        return res.status(200).json({
            status: "success",
            fcWebProject: req.FCWebProject
        });
    }

    static getFCWebProjects = async (req: Request<{}, {}, {}, TPaginationQuery>, res: Response, next: NextFunction) => {
        const page = Number(req.query.page ?? 1)

        try {
            const { fcWebProjects, pagination } = await fcWebProjectService.getFCWebProjects(page)

            return res.status(200).json({
                status: "success",
                fcWebProjects,
                pagination
            });

        } catch (error) {
            console.error("Error retrieving web projects:", error);
            next(error)
        }
    }
}
