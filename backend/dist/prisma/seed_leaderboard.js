import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is required");
}
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });
async function main() {
    console.log("Seeding leaderboard tables...");
    const rawData = fs.readFileSync(path.join(__dirname, "data.json"), "utf8");
    const data = JSON.parse(rawData);
    // Clear existing leaderboard data
    await prisma.leaderboardTool.deleteMany();
    await prisma.leaderboardModel.deleteMany();
    await prisma.leaderboardCompany.deleteMany();
    console.log("Deleted old leaderboard data.");
    // Seed Tools
    if (data.tools) {
        for (const tool of data.tools) {
            await prisma.leaderboardTool.create({
                data: {
                    id: tool.id,
                    name: tool.name,
                    category: tool.category,
                    tags: JSON.stringify(tool.tags || []),
                    rank: tool.rank ?? 0,
                    growth: tool.growth ?? 0.0,
                    votes: tool.votes ?? 0,
                    rating: tool.rating ?? 0.0,
                    saves: tool.saves ?? 0,
                    url: tool.url || "",
                    description: tool.description || "",
                    pricing: tool.pricing || "Free",
                    visits: tool.visits || "0",
                    addedDate: tool.addedDate || new Date().toISOString().split("T")[0]
                }
            });
        }
        console.log(`Seeded ${data.tools.length} tools.`);
    }
    // Seed Models
    if (data.models) {
        for (const m of data.models) {
            await prisma.leaderboardModel.create({
                data: {
                    id: m.id,
                    name: m.name,
                    provider: m.provider || "",
                    category: m.category || "",
                    rank: m.rank ?? 0,
                    growth: m.growth ?? 0.0,
                    contextWindow: m.contextWindow || "",
                    pricing: m.pricing || "Free",
                    eloRating: m.eloRating ?? 0,
                    benchmarkScore: m.benchmarkScore ?? 0.0,
                    openSource: m.openSource ?? false,
                    votes: m.votes ?? 0,
                    rating: m.rating ?? 0.0,
                    saves: m.saves ?? 0,
                    description: m.description || "",
                    visits: m.visits || "0"
                }
            });
        }
        console.log(`Seeded ${data.models.length} models.`);
    }
    // Seed Companies
    if (data.companies) {
        for (const c of data.companies) {
            await prisma.leaderboardCompany.create({
                data: {
                    id: c.id,
                    name: c.name,
                    rank: c.rank ?? 0,
                    growth: c.growth ?? 0.0,
                    funding: c.funding || "N/A",
                    headquarters: c.headquarters || "",
                    productsCount: c.productsCount ?? 0,
                    modelsCount: c.modelsCount ?? 0,
                    votes: c.votes ?? 0,
                    rating: c.rating ?? 0.0,
                    saves: c.saves ?? 0,
                    description: c.description || "",
                    visits: c.visits || "0"
                }
            });
        }
        console.log(`Seeded ${data.companies.length} companies.`);
    }
    console.log("Seeding leaderboard tables complete!");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
