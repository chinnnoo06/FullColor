import { model, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { FCWebTechnology, TFCWebProject } from "../types/fcWebProject/fcWebProject.types";
import { TSEO } from "../types/common/common.types";

const FCWebProjectSEOSchema = new Schema<TSEO>(
    {
        metaTitle: {
            type: String,
            required: true,
            trim: true,
            maxlength: 60
        },
        metaDescription: {
            type: String,
            required: true,
            trim: true,
            maxlength: 160
        }
    },
    { _id: false }
)

const FCWebProjectSchema = new Schema<TFCWebProject>({
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
    images: {
        type: [String],
        validate: {
            validator: (arr: string[]) => arr.length <= 5,
            message: 'Maximum 5 images allowed'
        },
        default: []
    },
    excerpt: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    technologies: {
        type: [String],
        enum: Object.values(FCWebTechnology),
        default: []
    },
    seo: {
        type: FCWebProjectSEOSchema,
        required: true
    }
}, {
    timestamps: true
})

FCWebProjectSchema.plugin(mongoosePaginate);

export const FCWebProject = model<TFCWebProject, PaginateModel<TFCWebProject>>("FCWebProject", FCWebProjectSchema, "fcWebProjects");
