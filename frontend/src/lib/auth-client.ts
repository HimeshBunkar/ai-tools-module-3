import { API_URL } from "@/lib/api";

export async function signOut({ callbackUrl = '/auth/signin' } = {}) {
  try {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  } finally {
    window.location.href = callbackUrl;
  }
}
