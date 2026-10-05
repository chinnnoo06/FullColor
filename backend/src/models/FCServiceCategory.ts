import { model, Schema } from "mongoose";
import { TFCServiceCategory } from "../types/fcServiceCategory/fcServiceCategory.types";

const FCServiceCategorySchema = new Schema<TFCServiceCategory>({
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export const FCServiceCategory = model<TFCServiceCategory>("FCServiceCategory", FCServiceCategorySchema, "fcServiceCategories");
