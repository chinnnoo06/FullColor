import { Router } from "express";
import { param, query } from "express-validator";
import { auth } from "../middlewares/auth";
import { handleInputErrors, validateImagesFormat, parseJsonFields } from "../middlewares/reqValidation";
import { validateFCWebProjectInput, validateFCWebProjectExists, validateFCWebProjectExistsBySlug } from "../middlewares/fcWebProject";
import { FCWebProjectController } from "../controllers/fcWebProject.controller";
import { fcWebProjectUploads } from "../middlewares/uploads";
import { converToWebP } from "../middlewares/convertToWebp";

const router: Router = Router();

router.get("/",
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be an integer greater than 0'),
    handleInputErrors,
    FCWebProjectController.getFCWebProjects
)

router.post("/",
    auth,
    fcWebProjectUploads.fields([
        { name: "fcWebProjectImages", maxCount: 5 },
    ]),
    validateImagesFormat,
    parseJsonFields(["seo", "technologies"]),
    validateFCWebProjectInput,
    handleInputErrors,
    converToWebP,
    FCWebProjectController.createFCWebProject
)

router.patch("/:id",
    auth,
    param('id').isMongoId().withMessage('Invalid Id'),
    handleInputErrors,
    validateFCWebProjectExists,
    validateFCWebProjectInput,
    handleInputErrors,
    FCWebProjectController.updateFCWebProject
)

router.delete("/:id",
    auth,
    param('id').isMongoId().withMessage('Invalid Id'),
    handleInputErrors,
    validateFCWebProjectExists,
    FCWebProjectController.deleteFCWebProject
)

router.patch("/:id/images",
    auth,
    param('id').isMongoId().withMessage('Invalid Id'),
    handleInputErrors,
    validateFCWebProjectExists,
    fcWebProjectUploads.fields([
        { name: "fcWebProjectImages", maxCount: 5 },
    ]),
    validateImagesFormat,
    converToWebP,
    FCWebProjectController.updateFCWebProjectImages
)

router.get("/id/:id",
    auth,
    param('id').isMongoId().withMessage('Invalid Id'),
    handleInputErrors,
    validateFCWebProjectExists,
    FCWebProjectController.getFCWebProject
)

router.get("/:slug",
    param('slug').notEmpty().withMessage('Slug is required'),
    handleInputErrors,
    validateFCWebProjectExistsBySlug,
    FCWebProjectController.getFCWebProject
)

export default router;
