import type { Context } from "hono";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import {
  fetchVideos,
  fetchVideoBySlug,
  fetchRelatedVideos,
} from "./videos.services.js";
import {
  ListQuerySchema,
  SlugParamSchema,
  RelatedQuerySchema,
} from "./videos.schemas.js";

function getPrisma(c: Context) {
  const adapter = new PrismaNeon({ connectionString: c.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

// GET /api/videos?sort=latest|trending&limit=N
export async function listVideos(c: Context) {
  const prisma = getPrisma(c);
  try {
    const result = ListQuerySchema.safeParse(c.req.query());
    if (!result.success) {
      return c.json({ error: "Invalid query parameters", details: result.error.format() }, 400);
    }

    const { sort, limit } = result.data;
    const videos = await fetchVideos(prisma, sort, limit);
    return c.json(videos);
  } catch (error: any) {
    console.error("Videos API Controller Error:", error);
    return c.json({ error: "Internal server error.", message: error.message }, 500);
  } finally {
    await prisma.$disconnect();
  }
}

// GET /api/videos/:slug
export async function getVideoBySlug(c: Context) {
  const prisma = getPrisma(c);
  try {
    const parsed = SlugParamSchema.safeParse({ slug: c.req.param("slug") });
    if (!parsed.success) {
      return c.json({ error: "Invalid slug" }, 400);
    }

    const video = await fetchVideoBySlug(prisma, parsed.data.slug);
    if (!video) return c.json({ error: "Not found" }, 404);

    return c.json(video);
  } catch (error: any) {
    console.error("Videos API Controller Error:", error);
    return c.json({ error: "Internal server error.", message: error.message }, 500);
  } finally {
    await prisma.$disconnect();
  }
}

// GET /api/videos/:slug/related?limit=N
export async function getRelatedVideos(c: Context) {
  const prisma = getPrisma(c);
  try {
    const slugParsed = SlugParamSchema.safeParse({ slug: c.req.param("slug") });
    if (!slugParsed.success) {
      return c.json({ error: "Invalid slug" }, 400);
    }

    const queryParsed = RelatedQuerySchema.safeParse(c.req.query());
    if (!queryParsed.success) {
      return c.json({ error: "Invalid query parameters", details: queryParsed.error.format() }, 400);
    }

    const video = await fetchVideoBySlug(prisma, slugParsed.data.slug);
    if (!video) return c.json({ error: "Not found" }, 404);

    const related = await fetchRelatedVideos(prisma, video, queryParsed.data.limit);
    return c.json(related);
  } catch (error: any) {
    console.error("Videos API Controller Error:", error);
    return c.json({ error: "Internal server error.", message: error.message }, 500);
  } finally {
    await prisma.$disconnect();
  }
}
