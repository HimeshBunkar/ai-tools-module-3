import { Hono } from "hono";
import { listVideos, getVideoBySlug, getRelatedVideos } from "./videos.controller.js";
const videosRouter = new Hono();
videosRouter.get("/", listVideos);
videosRouter.get("/:slug", getVideoBySlug);
videosRouter.get("/:slug/related", getRelatedVideos);
export { videosRouter };
