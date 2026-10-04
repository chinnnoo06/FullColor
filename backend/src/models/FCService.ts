import { model, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { TFCService } from "../types/fcService/fcService.types";

const FCServiceSchema = new Schema<TFCService>({
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
    category: {
        type: Schema.Types.ObjectId,
        ref: 'FCServiceCategory',
        required: true
    },
    images: {
        type: [String],
        validate: {
            validator: (arr: string[]) => arr.length <= 5,
            message: 'Maximum 5 images allowed'
        },
        default: []
    }
}, {
    timestamps: true
})

FCServiceSchema.plugin(mongoosePaginate);

export const FCService = model<TFCService, PaginateModel<TFCService>>("FCService", FCServiceSchema, "fcServices");
