import z from "zod";

export const SuccessResponseSchema = z.object({
  message: z.string()
})

export const ErrorResponseSchema = z.object({
  message: z.string().optional()
})

export const PaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
})

export type TPagination = z.infer<typeof PaginationSchema>
