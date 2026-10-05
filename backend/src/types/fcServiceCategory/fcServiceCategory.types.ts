import { HydratedDocument } from "mongoose";

export type TFCServiceCategory = {
    slug: string,
    name: string,
    description: string,
    image: string,
};

export type TFCServiceCategoryDocument = HydratedDocument<TFCServiceCategory>
