import type { ToolsSearchParams } from "@/lib/types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.aiorbit.club').replace(/\/$/, '');

export async function getTools(rawParams: ToolsSearchParams) {
  const query = new URLSearchParams();
  if (rawParams.q) query.set('q', rawParams.q);
  if (rawParams.category) query.set('category', rawParams.category);
  if (rawParams.pricing) query.set('pricing', rawParams.pricing);
  if (rawParams.sort) query.set('sort', rawParams.sort);
  if (rawParams.page) query.set('page', rawParams.page);

  try {
    const res = await fetch(`${API_URL}/api/v1/tools?${query.toString()}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error(`API returned status ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('getTools fetch error:', error);
    return {
      tools: [],
      total: 0,
      page: Number(rawParams.page ?? "1") || 1,
      totalPages: 1,
      sort: rawParams.sort || 'newest',
      categories: []
    };
  }
}

export async function getAllCategories() {
  try {
    const res = await fetch(`${API_URL}/api/v1/tools`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`API returned status ${res.status}`);
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error('getAllCategories fetch error:', error);
    return [];
  }
}

export async function getToolDetails(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/v1/tools/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('getToolDetails fetch error:', error);
    return null;
  }
}

export async function getToolBySlug(slug: string) {
  const data = await getToolDetails(slug);
  return data?.tool || null;
}