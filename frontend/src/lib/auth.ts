import { cookies } from 'next/headers';
import { API_URL } from "@/lib/api";

export async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Cookie: `auth_token=${token}` }
    });
    
    if (!res.ok) return null;
    
    const data = await res.json();
    return { user: data.user, token };
  } catch {
    return null;
  }
}
