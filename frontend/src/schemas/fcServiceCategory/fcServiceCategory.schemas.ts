import { z } from "zod";

export const FCServiceCategorySchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    image: z.string(),
});

export type TFCServiceCategory = z.infer<typeof FCServiceCategorySchema>;
