
import multer from "multer"
import fs from "fs"
import path from "path"

import { UPLOADS_PATH } from "../config/env"

type TFolder = string | ((file: Express.Multer.File) => string)

const createUploader = (folder: TFolder) => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = path.resolve(UPLOADS_PATH, typeof folder === "function" ? folder(file) : folder);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            cb(null, dir);
        },

        filename: (req, file, cb) => {
            const timestamp = Date.now();
            const random = Math.round(Math.random() * 1e9);
            const ext = path.extname(file.originalname);

            cb(null, `${timestamp}-${random}${ext}`);
        }
    }),
});

export const fullColorServicesUploads = createUploader("fullColorServices")
export const fcServicesUploads = createUploader("fcServices")
export const fcDepotProductUploads = createUploader("fcDepotProducts")
export const fcWebProjectUploads = createUploader("fcWebProjects")
export const fcServiceCategoryUploads = createUploader("fcServiceCategories")