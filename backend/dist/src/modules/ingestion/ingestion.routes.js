import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ingestionRunQuerySchema } from "./ingestion.schemas.js";
import { IngestionController } from "./ingestion.controller.js";
const router = new Hono();
router.post("/run", zValidator("query", ingestionRunQuerySchema), IngestionController.run);
export default router;
