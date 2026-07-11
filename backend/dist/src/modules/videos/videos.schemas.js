import { z } from "zod";
// GET /api/videos
export const ListQuerySchema = z.object({
    sort: z.enum(["latest", "trending"]).default("latest"),
    limit: z
        .string()
        .optional()
        .transform((val) => {
        if (!val)
            return undefined;
        const parsed = parseInt(val, 10);
        return isNaN(parsed) ? undefined : parsed;
    }),
});
// GET /api/videos/:slug and /:slug/related
export const SlugParamSchema = z.object({
    slug: z.string().min(1),
});
export const RelatedQuerySchema = z.object({
    limit: z
        .string()
        .optional()
        .default("4")
        .transform((val) => {
        const parsed = parseInt(val, 10);
        return isNaN(parsed) ? 4 : parsed;
    }),
});
// Shape written by the crawler's youtube-enrich.ts on upsert
export const VideoUpsertSchema = z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    toolName: z.string(),
    toolCategory: z.enum(["multimodal-ai", "robotics", "agents", "llm", "general-ai"]),
    youtubeId: z.string(),
    thumbnail: z.string(),
    durationSeconds: z.number().int().nonnegative(),
    views: z.number().int().nonnegative(),
    likes: z.number().int().nonnegative(),
    publishedAt: z.string(),
    author: z.object({
        name: z.string(),
        avatar: z.string(),
    }),
    tags: z.array(z.string()),
    accent: z.string(),
});
