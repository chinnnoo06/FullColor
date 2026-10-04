import { z } from "zod";
import { SEOSchema } from "../common/common.schemas";

export const FCDepotProductColorSchema = z.object({
    name: z.string(),
    hex: z.string(),
});

export const FCDepotProductSchema = z.object({
    _id: z.string(),
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    images: z.array(z.string()),
    colors: z.array(FCDepotProductColorSchema),
    seo: SEOSchema,
    retailPrice: z.number(),
    midWholesalePrice: z.number().nullable(),
    wholesalePrice: z.number().nullable(),
});

export type TFCDepotProduct= z.infer<typeof FCDepotProductSchema>;