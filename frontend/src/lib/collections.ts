import type { CollectionsSearchParams } from "@/lib/types";

import { API_URL } from "@/lib/api";

export async function getCollections(rawParams: CollectionsSearchParams) {
  const query = new URLSearchParams();
  if (rawParams.category) query.set('category', rawParams.category);
  if (rawParams.page) query.set('page', rawParams.page);

  try {
    const res = await fetch(`${API_URL}/api/v1/collections?${query.toString()}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error(`API returned status ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('getCollections fetch error:', error);
    return {
      items: [],
      pagination: { total: 0, page: 1, limit: 50, totalPages: 1 },
      categories: []
    };
  }
}

export async function getCollectionDetail(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/v1/collections/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('getCollectionDetail fetch error:', error);
    return null;
  }
}
