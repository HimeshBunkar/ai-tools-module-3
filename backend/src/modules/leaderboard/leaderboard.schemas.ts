import { z } from "zod";

export const QuerySchema = z.object({
  tab: z.enum(["tools", "models", "companies"]).default("tools"),
  search: z.string().optional().default(""),
  sort: z.string().optional().default("rank"),
  category: z.string().optional().default("all"),
  pricing: z.string().optional().default("all"),
  openSource: z.string().optional().default("all"),
  page: z.string().optional().default("1").transform((val: string) => {
    const parsed = parseInt(val, 10);
    return isNaN(parsed) ? 1 : parsed;
  }),
  limit: z.string().optional().default("10").transform((val: string) => {
    const parsed = parseInt(val, 10);
    return isNaN(parsed) ? 10 : parsed;
  }),
});

export type QueryInput = z.infer<typeof QuerySchema>;
