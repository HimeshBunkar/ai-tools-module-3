'use client';

import { useQuery } from '@tanstack/react-query';
import { API_URL } from "@/lib/api";

export function useUser() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Not authenticated');
      }
      return res.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user: data?.user ?? null,
    isLoading,
    isAuthenticated: !!data?.user,
    update: refetch,
    error,
  };
}
