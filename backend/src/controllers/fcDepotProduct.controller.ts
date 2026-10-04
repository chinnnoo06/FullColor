import type { NextFunction, Request, Response } from "express"
import { TMulterFiles } from "../types/multer/multer.types";
import { TFCDepotProductDto } from "../types/fcDepotProduct/fcDepotProduct.dtos";
import { fcDepotProductService } from "../services/fcDepotProduct.service";
import { TRequestWithFCDepotProduct } from "../types/express/fcDepotProduct";
import { TPaginationQuery } from "../types/common/common.dtos";

export class FCDepotProductController {

    static createFCDepotProduct = async (req: TRequestWithFCDepotProduct<{}, unknown, TFCDepotProductDto>, res: Response, next: NextFunction) => {
        const data = req.body;
        const files = req.files as TMulterFiles;

        try {
            await fcDepotProductService.createFCDepotProduct(data, files)

            return res.status(201).json({
                status: "success",
                message: "Product created successfully"
            });

        } catch (error) {
            console.error("Error creating the product:", error);
            next(error)
        }
    }

    static updateFCDepotProduct = async (req: TRequestWithFCDepotProduct<{}, unknown, TFCDepotProductDto>, res: Response, next: NextFunction) => {
        const data = req.body;

        try {
            await fcDepotProductService.updateFCDepotProduct(req.FCDepotProduct, data)

            return res.status(200).json({
                status: "success",
                message: "Product updated successfully"
            });

        } catch (error) {
            console.error("Error updating the product:", error);
            next(error)
        }
    }

    static deleteFCDepotProduct = async (req: TRequestWithFCDepotProduct, res: Response, next: NextFunction) => {
        try {
            await fcDepotProductService.deleteFCDepotProduct(req.FCDepotProduct)

            return res.status(200).json({
                status: "success",
                message: "Product deleted successfully"
            });

        } catch (error) {
            console.error("Error deleting the product:", error);
            next(error)
        }
    }

    static updateFCDepotProductImages = async (req: TRequestWithFCDepotProduct, res: Response, next: NextFunction) => {
        const files = req.files as TMulterFiles;

        try {
            await fcDepotProductService.updateFCDepotProductImages(req.FCDepotProduct, files)

            return res.status(200).json({
                status: "success",
                message: "Product images updated successfully"
            });

        } catch (error) {
            console.error("Error updating the product images:", error);
            next(error)
        }
    }

    static getFCDepotProduct = async (req: TRequestWithFCDepotProduct, res: Response, next: NextFunction) => {
        return res.status(200).json({
            status: "success",
            fcDepotProduct: req.FCDepotProduct
        });
    }

    static getFCDepotProducts = async (req: Request<{}, {}, {}, TPaginationQuery>, res: Response, next: NextFunction) => {
        const page = Number(req.query.page ?? 1)

        try {
            const { fcDepotProducts, pagination } = await fcDepotProductService.getFCDepotProducts(page)

            return res.status(200).json({
                status: "success",
                fcDepotProducts,
                pagination
            });

        } catch (error) {
            console.error("Error retrieving products:", error);
            next(error)
        }
    }
}
