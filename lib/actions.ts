"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";

export async function isToolBookmarked(toolId: string): Promise<boolean> {
  const userId = await getCurrentUserId();
  const bookmark = await prisma.bookmark.findUnique({
    where: { toolId_userId: { toolId, userId } },
    select: { id: true },
  });
  return Boolean(bookmark);
}

export async function toggleBookmark(toolId: string, toolSlug: string) {
  const userId = await getCurrentUserId();

  const existing = await prisma.bookmark.findUnique({
    where: { toolId_userId: { toolId, userId } },
    select: { id: true },
  });

  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
  } else {
    await prisma.bookmark.create({ data: { toolId, userId } });
  }

  revalidatePath(`/tools/${toolSlug}`);
  revalidatePath("/tools");

  return { bookmarked: !existing };
}

const reviewSchema = z.object({
  toolId: z.string().min(1),
  toolSlug: z.string().min(1),
  rating: z.coerce.number().int().min(1, "Pick a rating").max(5, "Rating must be 1-5"),
  comment: z
    .string()
    .trim()
    .min(10, "Reviews need at least 10 characters")
    .max(1000, "Reviews must be under 1000 characters"),
});

export type ReviewFormState = {
  status: "idle" | "error" | "success";
  message?: string;
};

async function recomputeToolRating(toolId: string) {
  const reviews = await prisma.review.findMany({ where: { toolId }, select: { rating: true } });
  const count = reviews.length;
  const avg = count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
  await prisma.tool.update({ where: { id: toolId }, data: { avgRating: avg, reviewCount: count } });
}

export async function submitReview(
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const parsed = reviewSchema.safeParse({
    toolId: formData.get("toolId"),
    toolSlug: formData.get("toolSlug"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid review." };
  }

  const { toolId, toolSlug, rating, comment } = parsed.data;
  const userId = await getCurrentUserId();

  await prisma.review.upsert({
    where: { toolId_userId: { toolId, userId } },
    update: { rating, comment },
    create: { toolId, userId, rating, comment },
  });

  await recomputeToolRating(toolId);
  revalidatePath(`/tools/${toolSlug}`);

  return { status: "success", message: "Thanks — your review is live." };
}