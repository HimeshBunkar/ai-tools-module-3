import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { leaderboardRouter } from './modules/leaderboard/leaderboard.routes.js';
const app = new Hono();
app.use('*', cors());
app.route('/api/leaderboard', leaderboardRouter);
app.get('/', async (c) => {
    // We instantiate Prisma per request (or via middleware) because the DB URL is in c.env
    const adapter = new PrismaNeon({ connectionString: c.env.DATABASE_URL });
    const prisma = new PrismaClient({ adapter });
    return c.text('Hello Hono on Cloudflare Workers with Prisma!');
});
app.get('/health', async (c) => {
    try {
        const adapter = new PrismaNeon({ connectionString: c.env.DATABASE_URL });
        const prisma = new PrismaClient({ adapter });
        // Attempt a simple query to verify DB connectivity
        await prisma.$queryRaw `SELECT 1`;
        return c.json({ status: 'ok', db: 'connected', timestamp: new Date().toISOString() });
    }
    catch (error) {
        console.error('Database connection failed:', error);
        return c.json({ status: 'error', db: 'disconnected', timestamp: new Date().toISOString() }, 500);
    }
});
export default app;
