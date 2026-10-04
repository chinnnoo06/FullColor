import { HydratedDocument } from "mongoose";
import { TSEO } from "../common/common.types";

export type TFCDepotProductColor = {
    name: string,
    hex: string
}

export type TFCDepotProduct = {
    slug: string,
    name: string,
    description: string,
    images: string[],
    colors: TFCDepotProductColor[],
    seo: TSEO,
    retailPrice: number,
    midWholesalePrice: number | null,
    wholesalePrice: number | null,
};

export type TCreateFCDepotProduct = Omit<TFCDepotProduct, 'midWholesalePrice' | 'wholesalePrice'> & {
    midWholesalePrice?: number | null,
    wholesalePrice?: number | null,
}

export type TFCDepotProductDocument = HydratedDocument<TFCDepotProduct>
