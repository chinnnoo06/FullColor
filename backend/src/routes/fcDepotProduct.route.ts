import { Router } from "express";
import { auth } from "../middlewares/auth";
import { handleInputErrors, validateImagesFormat, parseJsonFields } from "../middlewares/reqValidation";
import { FCDepotProductController } from "../controllers/fcDepotProduct.controller";
import { fcDepotProductUploads } from "../middlewares/uploads";
import { validateFCDepotProductInput, validateFCDepotProductExists, validateFCDepotProductExistsBySlug } from "../middlewares/fcDepotProduct";
import { converToWebP } from "../middlewares/convertToWebp";
import { param, query } from "express-validator";

const router: Router = Router();

router.get("/",
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be an integer greater than 0'),
    handleInputErrors,
    FCDepotProductController.getFCDepotProducts
)

router.post("/",
    auth,
    fcDepotProductUploads.fields([
        { name: "fcDepotProductImages", maxCount: 5 },
    ]),
    validateImagesFormat,
    parseJsonFields(["seo", "colors"]),
    validateFCDepotProductInput,
    handleInputErrors,
    converToWebP,
    FCDepotProductController.createFCDepotProduct
)

router.get("/id/:id",
    auth,
    param('id').isMongoId().withMessage('Invalid Id'),
    handleInputErrors,
    validateFCDepotProductExists,
    FCDepotProductController.getFCDepotProduct
)

router.get("/:slug",
    param('slug').notEmpty().withMessage('Slug is required'),
    handleInputErrors,
    validateFCDepotProductExistsBySlug,
    FCDepotProductController.getFCDepotProduct
)

router.patch("/:id",
    auth,
    validateFCDepotProductExists,
    validateFCDepotProductInput,
    handleInputErrors,
    FCDepotProductController.updateFCDepotProduct
)

router.delete("/:id",
    auth,
    validateFCDepotProductExists,
    FCDepotProductController.deleteFCDepotProduct
)

router.patch("/:id/images",
    auth,
    validateFCDepotProductExists,
    fcDepotProductUploads.fields([
        { name: "fcDepotProductImages", maxCount: 5 },
    ]),
    validateImagesFormat,
    converToWebP,
    FCDepotProductController.updateFCDepotProductImages
)

export default router;
