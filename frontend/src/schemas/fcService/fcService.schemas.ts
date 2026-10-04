import { z } from "zod";
import { FCServiceCategorySchema } from "@/schemas/fcServiceCategory/fcServiceCategory.schemas";

export const FCServiceSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    category: FCServiceCategorySchema,
    images: z.array(z.string()),
});

export type TFCService = z.infer<typeof FCServiceSchema>;
