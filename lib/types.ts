import type { PricingModel, BillingFrequency } from "@prisma/client";

export type ToolCardData = {
  id: string;
  slug: string;
  name: string;
  logoUrl: string | null;
  description: string;
  pricingModel: PricingModel;
  pricingAmount: string | null;
  billingFrequency: BillingFrequency;
  categories: { category: { slug: string; name: string } }[];
  tags: { tag: { slug: string; name: string } }[];
  _count: { reviews: number; bookmarks: number };
  avgRating: number | null;
};

export type SortOption = "newest" | "oldest" | "name-asc" | "name-desc" | "rating";

export type ToolsSearchParams = {
  q?: string;
  category?: string;
  pricing?: string;
  sort?: SortOption;
  page?: string;
};

export const PAGE_SIZE = 80;

// ---------------------------------------------------------------------------
// Detail page types (Step 3)
// ---------------------------------------------------------------------------

export type ReviewData = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string | null;
  };
};

export type ToolDetailData = {
  id: string;
  slug: string;
  name: string;
  logoUrl: string | null;
  description: string;
  websiteUrl: string;
  screenshots: string[];
  features: string[];
  pricingModel: PricingModel;
  pricingAmount: string | null;
  billingFrequency: BillingFrequency;
  avgRating: number | null;
  reviewCount: number;
  createdAt: string;
  company: { slug: string; name: string; logoUrl: string | null } | null;
  categories: { category: { slug: string; name: string } }[];
  tags: { tag: { slug: string; name: string } }[];
  _count: { reviews: number; bookmarks: number };
};

export type SimilarToolData = {
  id: string;
  slug: string;
  name: string;
  logoUrl: string | null;
  description: string;
  pricingModel: PricingModel;
  avgRating: number | null;
};