import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";
import { handleInputErrors } from "../middlewares/reqValidation";

const router: Router = Router();

// Define routes
router.post("/register",
    body('username').notEmpty().withMessage('Username is required').isLength({ max: 50 }).withMessage('Username must be 50 characters or less'),
    body('password').notEmpty().withMessage('Password is required').isLength({ max: 72 }).withMessage('Password must be 72 characters or less'),
    handleInputErrors,
    AuthController.register
)

router.post("/login",
    body('username').notEmpty().withMessage('Username is required').isLength({ max: 50 }).withMessage('Username must be 50 characters or less'),
    body('password').notEmpty().withMessage('Password is required'),
    handleInputErrors,
    AuthController.login
)

router.get("/session", auth, AuthController.checkAuth);

export default router;
