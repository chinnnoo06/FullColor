import { z } from "zod";
import { PaginationSchema } from "../common/common.response.schemas";
import { FCWebProjectSchema } from "./fcWebProject.schemas";

export const FCWebProjectsResponseSchema = z.object({
    status: z.literal("success"),
    fcWebProjects: z.array(FCWebProjectSchema),
    pagination: PaginationSchema,
});

export type TFCWebProjectsResponse = z.infer<typeof FCWebProjectsResponseSchema>;
