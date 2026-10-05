import { Router } from "express";
import { auth } from "../middlewares/auth";
import { handleInputErrors, validateImagesFormat } from "../middlewares/reqValidation";
import { FCServiceController } from "../controllers/fcService.controller";
import { fcServicesUploads } from "../middlewares/uploads";
import { validateFCServiceInput, validateFCServiceExists } from "../middlewares/fcService";
import { validateFCServiceCategorySlugQuery } from "../middlewares/fcServiceCategory";
import { converToWebP } from "../middlewares/convertToWebp";
import { query } from "express-validator";

const router: Router = Router();

router.get("/",
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be an integer greater than 0'),
    query('category').optional().isString().withMessage('Invalid category slug'),
    handleInputErrors,
    validateFCServiceCategorySlugQuery,
    FCServiceController.getFCServices
)

router.post("/",
    auth,
    fcServicesUploads.fields([
        { name: "fcServiceImages", maxCount: 5 },
    ]),
    validateImagesFormat,
    validateFCServiceInput,
    handleInputErrors,
    converToWebP,
    FCServiceController.createFCService
)

router.get("/:id",
    auth,
    validateFCServiceExists,
    FCServiceController.getFCService
)

router.patch("/:id",
    auth,
    validateFCServiceExists,
    validateFCServiceInput,
    handleInputErrors,
    FCServiceController.updateFCService
)

router.delete("/:id",
    auth,
    validateFCServiceExists,
    FCServiceController.deleteFCService
)

router.patch("/:id/images",
    auth,
    validateFCServiceExists,
    fcServicesUploads.fields([
        { name: "fcServiceImages", maxCount: 5 },
    ]),
    validateImagesFormat,
    converToWebP,
    FCServiceController.updateFCServiceImages
)

export default router;
