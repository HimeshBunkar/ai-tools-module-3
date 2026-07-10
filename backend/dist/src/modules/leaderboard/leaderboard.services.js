import { PrismaClient } from "@prisma/client";
export class LeaderboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLeaderboard(query) {
        const { tab, search, sort, category, pricing, openSource, page, limit, } = query;
        const where = {};
        if (search.trim()) {
            const q = search.trim();
            if (tab === "tools") {
                where.OR = [
                    { name: { contains: q, mode: "insensitive" } },
                    { description: { contains: q, mode: "insensitive" } },
                    { category: { contains: q, mode: "insensitive" } },
                    { tags: { contains: q, mode: "insensitive" } },
                ];
            }
            else if (tab === "models") {
                where.OR = [
                    { name: { contains: q, mode: "insensitive" } },
                    { provider: { contains: q, mode: "insensitive" } },
                    { description: { contains: q, mode: "insensitive" } },
                ];
            }
            else if (tab === "companies") {
                where.OR = [
                    { name: { contains: q, mode: "insensitive" } },
                    { description: { contains: q, mode: "insensitive" } },
                    { headquarters: { contains: q, mode: "insensitive" } },
                ];
            }
        }
        if (category !== "all") {
            where.category = { equals: category };
        }
        if (pricing !== "all" && tab === "tools") {
            where.pricing = { equals: pricing };
        }
        if (openSource !== "all" && tab === "models") {
            where.openSource = openSource === "true";
        }
        const orderBy = {};
        if (sort === "growth") {
            orderBy.growth = "desc";
        }
        else if (sort === "votes") {
            orderBy.votes = "desc";
        }
        else if (sort === "rating") {
            orderBy.rating = "desc";
        }
        else if (sort === "saves") {
            orderBy.saves = "desc";
        }
        else if (sort === "newest" && tab === "tools") {
            orderBy.addedDate = "desc";
        }
        else {
            orderBy.rank = "asc";
        }
        const skip = (page - 1) * limit;
        let paginatedItems = [];
        let totalCount = 0;
        if (tab === "models") {
            totalCount = await this.prisma.leaderboardModel.count({ where });
            const dbItems = await this.prisma.leaderboardModel.findMany({
                where,
                orderBy,
                skip,
                take: limit,
            });
            paginatedItems = dbItems.map((item) => ({
                ...item,
                history: JSON.parse(item.history || "[]"),
            }));
        }
        else if (tab === "companies") {
            totalCount = await this.prisma.leaderboardCompany.count({ where });
            const dbItems = await this.prisma.leaderboardCompany.findMany({
                where,
                orderBy,
                skip,
                take: limit,
            });
            paginatedItems = dbItems.map((item) => ({
                ...item,
                history: JSON.parse(item.history || "[]"),
            }));
        }
        else {
            totalCount = await this.prisma.leaderboardTool.count({ where });
            const dbItems = await this.prisma.leaderboardTool.findMany({
                where,
                orderBy,
                skip,
                take: limit,
            });
            paginatedItems = dbItems.map((item) => ({
                ...item,
                tags: JSON.parse(item.tags || "[]"),
                history: JSON.parse(item.history || "[]"),
            }));
        }
        const totalPages = Math.ceil(totalCount / limit);
        let categoriesList = [];
        if (tab === "tools") {
            const distinctCats = await this.prisma.leaderboardTool.findMany({
                select: { category: true },
                distinct: ["category"],
            });
            categoriesList = distinctCats.map((t) => t.category).sort();
        }
        else if (tab === "models") {
            const distinctCats = await this.prisma.leaderboardModel.findMany({
                select: { category: true },
                distinct: ["category"],
            });
            categoriesList = distinctCats.map((m) => m.category).sort();
        }
        const totalToolsCount = await this.prisma.leaderboardTool.count();
        const totalModelsCount = await this.prisma.leaderboardModel.count();
        const totalCompaniesCount = await this.prisma.leaderboardCompany.count();
        const toolVotes = await this.prisma.leaderboardTool.aggregate({
            _sum: { votes: true },
        });
        const modelVotes = await this.prisma.leaderboardModel.aggregate({
            _sum: { votes: true },
        });
        const companyVotes = await this.prisma.leaderboardCompany.aggregate({
            _sum: { votes: true },
        });
        const totalVotesSum = (toolVotes._sum.votes || 0) +
            (modelVotes._sum.votes || 0) +
            (companyVotes._sum.votes || 0);
        return {
            items: paginatedItems,
            pagination: {
                totalCount,
                totalPages,
                currentPage: page,
                limit,
            },
            categories: categoriesList,
            stats: {
                totalTools: totalToolsCount,
                totalModels: totalModelsCount,
                totalCompanies: totalCompaniesCount,
                totalVotes: totalVotesSum,
                hotCategory: "Code Assistant",
            },
        };
    }
}
