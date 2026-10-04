import { z } from "zod";
import { PaginationSchema } from "../common/common.response.schemas";
import { FCDepotProductSchema } from "./fcDepotProduct.schemas";

export const FCDepotProductsResponseSchema = z.object({
    status: z.literal("success"),
    fcDepotProducts: z.array(FCDepotProductSchema),
    pagination: PaginationSchema,
});

export type TFCDepotProductsResponse = z.infer<typeof FCDepotProductsResponseSchema>;