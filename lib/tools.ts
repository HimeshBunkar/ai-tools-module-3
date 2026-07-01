import { Prisma, PricingModel } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PAGE_SIZE, type ToolsSearchParams, type SortOption } from "@/lib/types";

const VALID_PRICING = new Set(Object.values(PricingModel));
const VALID_SORTS = new Set<SortOption>(["newest", "oldest", "name-asc", "name-desc", "rating"]);

function buildOrderBy(sort: SortOption | undefined): Prisma.ToolOrderByWithRelationInput {
  switch (sort) {
    case "oldest":
      return { createdAt: "asc" };
    case "name-asc":
      return { name: "asc" };
    case "name-desc":
      return { name: "desc" };
    case "rating":
      return { avgRating: "desc" };
    case "newest":
    default:
      return { createdAt: "desc" };
  }
}

function buildWhere(params: ToolsSearchParams): Prisma.ToolWhereInput {
  const where: Prisma.ToolWhereInput = {};

  if (params.q && params.q.trim().length > 0) {
    const q = params.q.trim();
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  if (params.category) {
    where.categories = { some: { category: { slug: params.category } } };
  }

  if (params.pricing && VALID_PRICING.has(params.pricing as PricingModel)) {
    where.pricingModel = params.pricing as PricingModel;
  }

  return where;
}

export async function getTools(rawParams: ToolsSearchParams) {
  const sort = VALID_SORTS.has(rawParams.sort as SortOption)
    ? (rawParams.sort as SortOption)
    : "newest";

  const pageNum = Math.max(1, Number.parseInt(rawParams.page ?? "1", 10) || 1);

  const where = buildWhere(rawParams);
  const orderBy = buildOrderBy(sort);

  const [tools, total] = await Promise.all([
    prisma.tool.findMany({
      where,
      orderBy,
      skip: (pageNum - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        slug: true,
        name: true,
        logoUrl: true,
        description: true,
        pricingModel: true,
        pricingAmount: true,
        billingFrequency: true,
        avgRating: true,
        categories: { select: { category: { select: { slug: true, name: true } } } },
        tags: { select: { tag: { select: { slug: true, name: true } } } },
        _count: { select: { reviews: true, bookmarks: true } },
      },
    }),
    prisma.tool.count({ where }),
  ]);

  return {
    tools: tools.map((t) => ({
      ...t,
      pricingAmount: t.pricingAmount?.toString() ?? null,
      avgRating: t.avgRating > 0 ? t.avgRating : null,
    })),
    total,
    page: pageNum,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    sort,
  };
}

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    select: {
      slug: true,
      name: true,
      _count: { select: { tools: true } },
    },
  });
}

/** Full detail record for the `/tools/[slug]` page. */
export async function getToolBySlug(slug: string) {
  const tool = await prisma.tool.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      logoUrl: true,
      description: true,
      websiteUrl: true,
      screenshots: true,
      features: true,
      pricingModel: true,
      pricingAmount: true,
      billingFrequency: true,
      avgRating: true,
      reviewCount: true,
      createdAt: true,
      company: { select: { slug: true, name: true, logoUrl: true } },
      categories: { select: { category: { select: { slug: true, name: true } } } },
      tags: { select: { tag: { select: { slug: true, name: true } } } },
      _count: { select: { reviews: true, bookmarks: true } },
    },
  });

  if (!tool) return null;

  return {
    ...tool,
    pricingAmount: tool.pricingAmount?.toString() ?? null,
    avgRating: tool.avgRating > 0 ? tool.avgRating : null,
  };
}

/**
 * Similar tools for a detail page: explicit curated alternatives first
 * (highest signal), topped up with tools that share a category, excluding
 * the tool itself, de-duplicated, capped at `limit`.
 */
export async function getSimilarTools(toolId: string, limit = 4) {
  const withRelations = await prisma.tool.findUnique({
    where: { id: toolId },
    select: {
      alternatives: { select: { id: true } },
      categories: { select: { categoryId: true } },
    },
  });

  if (!withRelations) return [];

  const alternativeIds = withRelations.alternatives.map((a) => a.id);
  const categoryIds = withRelations.categories.map((c) => c.categoryId);

  const cardSelect = {
    id: true,
    slug: true,
    name: true,
    logoUrl: true,
    description: true,
    pricingModel: true,
    pricingAmount: true,
    billingFrequency: true,
    avgRating: true,
    categories: { select: { category: { select: { slug: true, name: true } } } },
    tags: { select: { tag: { select: { slug: true, name: true } } } },
    _count: { select: { reviews: true, bookmarks: true } },
  } as const;

  const curated = alternativeIds.length
    ? await prisma.tool.findMany({ where: { id: { in: alternativeIds } }, select: cardSelect })
    : [];

  let results = curated;

  if (results.length < limit && categoryIds.length > 0) {
    const excludeIds = [toolId, ...results.map((t) => t.id)];
    const fillers = await prisma.tool.findMany({
      where: {
        id: { notIn: excludeIds },
        categories: { some: { categoryId: { in: categoryIds } } },
      },
      orderBy: { avgRating: "desc" },
      take: limit - results.length,
      select: cardSelect,
    });
    results = [...results, ...fillers];
  }

  return results.slice(0, limit).map((t) => ({
    ...t,
    pricingAmount: t.pricingAmount?.toString() ?? null,
    avgRating: t.avgRating > 0 ? t.avgRating : null,
  }));
}

/** Newest reviews for a tool, most recent first. */
export async function getToolReviews(toolId: string, limit = 20) {
  const reviews = await prisma.review.findMany({
    where: { toolId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return reviews.map((review) => ({
    ...review,
    createdAt: review.createdAt.toISOString(),
  }));
}