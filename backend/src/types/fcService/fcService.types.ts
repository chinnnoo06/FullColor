import { HydratedDocument, Types } from "mongoose";

export type TFCService = {
    name: string,
    description: string,
    category: Types.ObjectId,
    images: string[],
};

export type TFCServiceDocument = HydratedDocument<TFCService>
