import { z } from 'zod';

export const PageInfoSchema = z.object({
  size: z.number(),
  number: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});

export type PageInfoSchema = z.infer<typeof PageInfoSchema>;

export const createPageSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    content: itemSchema.array(),
    page: PageInfoSchema,
  });

export const isPageLast = (page: PageInfoSchema) =>
  page.number >= page.totalPages;
