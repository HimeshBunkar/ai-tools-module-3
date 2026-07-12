import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ingestionRunQuerySchema } from "./ingestion.schemas.js";
import { IngestionController } from "./ingestion.controller.js";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    GEMINI_API_KEY: string;
    GROQ_API_KEY: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };
}>();

router.post("/run", zValidator("query", ingestionRunQuerySchema), IngestionController.run);

export default router;
