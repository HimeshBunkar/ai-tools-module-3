import { z } from "zod";

export const leaderboardQuerySchema = z.object({
  tab: z.enum(["tools", "models", "companies"]).optional().default("tools"),
  search: z.string().optional().default(""),
  sort: z.string().optional().default("rank"),
  category: z.string().optional().default("all"),
  pricing: z.string().optional().default("all"),
  openSource: z.string().optional().default("all"),
  page: z.string()
    .optional()
    .transform((v) => (v ? Math.max(1, parseInt(v, 10)) : 1)),
  limit: z.string()
    .optional()
    .transform((v) => (v ? Math.max(1, parseInt(v, 10)) : 10)),
  delay: z.string().optional(),
  error: z.string().optional()
});

export type LeaderboardQueryInput = z.infer<typeof leaderboardQuerySchema>;
