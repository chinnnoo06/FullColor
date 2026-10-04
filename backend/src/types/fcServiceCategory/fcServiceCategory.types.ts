import { HydratedDocument } from "mongoose";

export type TFCServiceCategory = {
    name: string,
    description: string,
    image: string,
};

export type TFCServiceCategoryDocument = HydratedDocument<TFCServiceCategory>
