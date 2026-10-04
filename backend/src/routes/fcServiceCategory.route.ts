import { Router } from "express";
import { auth } from "../middlewares/auth";
import { handleInputErrors, validateImagesFormat } from "../middlewares/reqValidation";
import { FCServiceCategoryController } from "../controllers/fcServiceCategory.controller";
import { fcServiceCategoryUploads } from "../middlewares/uploads";
import { validateFCServiceCategoryInput, validateFCServiceCategoryExists } from "../middlewares/fcServiceCategory";
import { converToWebP } from "../middlewares/convertToWebp";

const router: Router = Router();

router.get("/",
    FCServiceCategoryController.getFCServiceCategories
)

router.post("/",
    auth,
    fcServiceCategoryUploads.fields([{ name: "fcServiceCategoryImage", maxCount: 1 }]),
    validateImagesFormat,
    validateFCServiceCategoryInput,
    handleInputErrors,
    converToWebP,
    FCServiceCategoryController.createFCServiceCategory
)

router.get("/:id",
    auth,
    validateFCServiceCategoryExists,
    FCServiceCategoryController.getFCServiceCategory
)

router.patch("/:id",
    auth,
    validateFCServiceCategoryExists,
    validateFCServiceCategoryInput,
    handleInputErrors,
    FCServiceCategoryController.updateFCServiceCategory
)

router.delete("/:id",
    auth,
    validateFCServiceCategoryExists,
    FCServiceCategoryController.deleteFCServiceCategory
)

router.patch("/:id/image",
    auth,
    validateFCServiceCategoryExists,
    fcServiceCategoryUploads.fields([{ name: "fcServiceCategoryImage", maxCount: 1 }]),
    validateImagesFormat,
    converToWebP,
    FCServiceCategoryController.updateFCServiceCategoryImage
)

export default router;
