import { model, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { TFCDepotProduct, TFCDepotProductColor } from "../types/fcDepotProduct/fcDepotProduct.types";
import { TSEO } from "../types/common/common.types";

const FCDepotProductSEOSchema = new Schema<TSEO>(
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

const FCDepotProductColorSchema = new Schema<TFCDepotProductColor>({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    hex: {
        type: String,
        required: true,
        trim: true
    }
}, { _id: false })

const FCDepotProductSchema = new Schema<TFCDepotProduct>({
    slug: {
        type: String,
        required: true,
        unique: true
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
    images: {
        type: [String],
        validate: {
            validator: (arr: string[]) => arr.length <= 5,
            message: 'Maximum 5 images allowed'
        },
        default: []
    },
    colors: {
        type: [FCDepotProductColorSchema],
        default: []
    },
    seo: {
        type: FCDepotProductSEOSchema,
        required: true
    },
    retailPrice: {
        type: Number,
        required: true
    },
    midWholesalePrice: {
        type: Number,
        default: null
    },
    wholesalePrice: {
        type: Number,
        default: null
    },
}, {
    timestamps: true
})

FCDepotProductSchema.plugin(mongoosePaginate);

export const FCDepotProduct = model<TFCDepotProduct, PaginateModel<TFCDepotProduct>>("FCDepotProduct", FCDepotProductSchema, "fcDepotProducts");
