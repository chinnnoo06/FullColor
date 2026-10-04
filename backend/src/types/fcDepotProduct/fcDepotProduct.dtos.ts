import { TFCDepotProductColor } from "./fcDepotProduct.types";
import { TSEO } from "../common/common.types";

export type TFCDepotProductDto = {
    name: string,
    description: string,
    colors: TFCDepotProductColor[],
    seo: TSEO,
    retailPrice: number,
    midWholesalePrice?: number | null,
    wholesalePrice?: number | null,
}

