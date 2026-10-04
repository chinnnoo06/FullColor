import { z } from "zod";
import { PaginationSchema } from "../common/common.response.schemas";
import { FCServiceSchema } from "./fcService.schemas";

export const FCServicesResponseSchema = z.object({
  status: z.literal("success"),
  fcServices: z.array(FCServiceSchema),
  pagination: PaginationSchema,
});

export type TFcServicesResponse = z.infer<typeof FCServicesResponseSchema>;