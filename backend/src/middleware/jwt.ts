import type { Context, Next } from 'hono'
import { verify } from 'hono/jwt'
import { getCookie } from 'hono/cookie'

export const jwtMiddleware = async (c: Context, next: Next) => {
  const token = getCookie(c, 'auth_token')
  
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const decoded = await verify(token, process.env.JWT_SECRET || 'fallback_secret', "HS256")
    c.set('user', decoded)
    await next()
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401)
  }
}
