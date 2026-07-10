import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });
async function main() {
    const dataPath = path.resolve("prisma/data.json");
    const rawData = fs.readFileSync(dataPath, "utf8");
    const dbData = JSON.parse(rawData);
    console.log("Seeding LeaderboardTools...");
    for (const item of dbData.tools) {
        await prisma.leaderboardTool.upsert({
            where: { id: item.id },
            update: {
                name: item.name,
                category: item.category,
                tags: JSON.stringify(item.tags || []),
                rank: parseInt(item.rank || 999, 10),
                growth: parseFloat(item.growth || 0),
                votes: parseInt(item.votes || 0, 10),
                rating: parseFloat(item.rating || 0),
                saves: parseInt(item.saves || 0, 10),
                url: item.url || "",
                description: item.description || "",
                pricing: item.pricing || "",
                visits: item.visits || "0",
                addedDate: item.addedDate || new Date().toISOString().split("T")[0],
                history: JSON.stringify(item.history || [])
            },
            create: {
                id: item.id,
                name: item.name,
                category: item.category,
                tags: JSON.stringify(item.tags || []),
                rank: parseInt(item.rank || 999, 10),
                growth: parseFloat(item.growth || 0),
                votes: parseInt(item.votes || 0, 10),
                rating: parseFloat(item.rating || 0),
                saves: parseInt(item.saves || 0, 10),
                url: item.url || "",
                description: item.description || "",
                pricing: item.pricing || "",
                visits: item.visits || "0",
                addedDate: item.addedDate || new Date().toISOString().split("T")[0],
                history: JSON.stringify(item.history || [])
            }
        });
    }
    console.log("Seeding LeaderboardModels...");
    for (const item of dbData.models) {
        await prisma.leaderboardModel.upsert({
            where: { id: item.id },
            update: {
                name: item.name,
                provider: item.provider,
                category: item.category,
                rank: parseInt(item.rank || 999, 10),
                growth: parseFloat(item.growth || 0),
                contextWindow: item.contextWindow || "",
                pricing: item.pricing || "",
                eloRating: parseInt(item.eloRating || 0, 10),
                benchmarkScore: parseFloat(item.benchmarkScore || 0),
                openSource: !!item.openSource,
                votes: parseInt(item.votes || 0, 10),
                rating: parseFloat(item.rating || 0),
                saves: parseInt(item.saves || 0, 10),
                description: item.description || "",
                visits: item.visits || "0",
                history: JSON.stringify(item.history || [])
            },
            create: {
                id: item.id,
                name: item.name,
                provider: item.provider,
                category: item.category,
                rank: parseInt(item.rank || 999, 10),
                growth: parseFloat(item.growth || 0),
                contextWindow: item.contextWindow || "",
                pricing: item.pricing || "",
                eloRating: parseInt(item.eloRating || 0, 10),
                benchmarkScore: parseFloat(item.benchmarkScore || 0),
                openSource: !!item.openSource,
                votes: parseInt(item.votes || 0, 10),
                rating: parseFloat(item.rating || 0),
                saves: parseInt(item.saves || 0, 10),
                description: item.description || "",
                visits: item.visits || "0",
                history: JSON.stringify(item.history || [])
            }
        });
    }
    console.log("Seeding LeaderboardCompanies...");
    for (const item of dbData.companies) {
        await prisma.leaderboardCompany.upsert({
            where: { id: item.id },
            update: {
                name: item.name,
                rank: parseInt(item.rank || 999, 10),
                growth: parseFloat(item.growth || 0),
                funding: item.funding || "",
                headquarters: item.headquarters || "",
                productsCount: parseInt(item.productsCount || 0, 10),
                modelsCount: parseInt(item.modelsCount || 0, 10),
                votes: parseInt(item.votes || 0, 10),
                rating: parseFloat(item.rating || 0),
                saves: parseInt(item.saves || 0, 10),
                description: item.description || "",
                visits: item.visits || "0",
                history: JSON.stringify(item.history || [])
            },
            create: {
                id: item.id,
                name: item.name,
                rank: parseInt(item.rank || 999, 10),
                growth: parseFloat(item.growth || 0),
                funding: item.funding || "",
                headquarters: item.headquarters || "",
                productsCount: parseInt(item.productsCount || 0, 10),
                modelsCount: parseInt(item.modelsCount || 0, 10),
                votes: parseInt(item.votes || 0, 10),
                rating: parseFloat(item.rating || 0),
                saves: parseInt(item.saves || 0, 10),
                description: item.description || "",
                visits: item.visits || "0",
                history: JSON.stringify(item.history || [])
            }
        });
    }
    console.log("Leaderboard seeding completed successfully!");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
});
