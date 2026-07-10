import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaNeon } from '@prisma/adapter-neon';
const app = new Hono();
app.get('/', async (c) => {
    // We instantiate Prisma per request (or via middleware) because the DB URL is in c.env
    const adapter = new PrismaNeon({ connectionString: c.env.DATABASE_URL });
    const prisma = new PrismaClient({ adapter });
    return c.text('Hello Hono on Cloudflare Workers with Prisma!');
});
export default app;
