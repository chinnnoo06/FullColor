import { z } from "zod";
import { SEOSchema } from "../common/common.schemas";
import { FCWebTechnologySchema } from "@/schemas/enums.schemas";

export const FCWebProjectSchema = z.object({
    _id: z.string(),
    slug: z.string(),
    name: z.string(),
    excerpt: z.string(),
    content: z.string(),
    images: z.array(z.string()),
    technologies: z.array(FCWebTechnologySchema),
    seo: SEOSchema,
});

export type TFCWebProject = z.infer<typeof FCWebProjectSchema>;
