export async function fetchLeaderboardData(prisma, query) {
    const where = {};
    // Search filter
    if (query.search.trim()) {
        const q = query.search.trim();
        if (query.tab === "tools") {
            where.OR = [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                { category: { contains: q, mode: "insensitive" } }
            ];
        }
        else if (query.tab === "models") {
            where.OR = [
                { name: { contains: q, mode: "insensitive" } },
                { provider: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } }
            ];
        }
        else if (query.tab === "companies") {
            where.OR = [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                { headquarters: { contains: q, mode: "insensitive" } }
            ];
        }
    }
    // Category filter
    if (query.category !== "all") {
        where.category = { equals: query.category, mode: "insensitive" };
    }
    // Pricing filter (tools only)
    if (query.pricing !== "all" && query.tab === "tools") {
        where.pricing = { equals: query.pricing, mode: "insensitive" };
    }
    // Open Source filter (models only)
    if (query.openSource !== "all" && query.tab === "models") {
        where.openSource = query.openSource === "true";
    }
    // Sorting
    const orderBy = {};
    if (query.sort === "growth") {
        orderBy.growth = "desc";
    }
    else if (query.sort === "votes") {
        orderBy.votes = "desc";
    }
    else if (query.sort === "rating") {
        orderBy.rating = "desc";
    }
    else if (query.sort === "saves") {
        orderBy.saves = "desc";
    }
    else if (query.sort === "newest" && query.tab === "tools") {
        orderBy.addedDate = "desc";
    }
    else {
        orderBy.rank = "asc";
    }
    // Pagination bounds
    const skip = (query.page - 1) * query.limit;
    const take = query.limit;
    let items = [];
    let totalCount = 0;
    if (query.tab === "models") {
        totalCount = await prisma.leaderboardModel.count({ where });
        items = await prisma.leaderboardModel.findMany({
            where,
            orderBy,
            skip,
            take
        });
    }
    else if (query.tab === "companies") {
        totalCount = await prisma.leaderboardCompany.count({ where });
        items = await prisma.leaderboardCompany.findMany({
            where,
            orderBy,
            skip,
            take
        });
    }
    else {
        totalCount = await prisma.leaderboardTool.count({ where });
        items = await prisma.leaderboardTool.findMany({
            where,
            orderBy,
            skip,
            take
        });
    }
    // Categories list
    let categoriesList = [];
    if (query.tab === "tools") {
        const distinctCats = await prisma.leaderboardTool.findMany({
            select: { category: true },
            distinct: ["category"]
        });
        categoriesList = distinctCats.map((t) => t.category).sort();
    }
    else if (query.tab === "models") {
        const distinctCats = await prisma.leaderboardModel.findMany({
            select: { category: true },
            distinct: ["category"]
        });
        categoriesList = distinctCats.map((m) => m.category).sort();
    }
    // Stats
    const totalToolsCount = await prisma.leaderboardTool.count();
    const totalModelsCount = await prisma.leaderboardModel.count();
    const totalCompaniesCount = await prisma.leaderboardCompany.count();
    const toolVotes = await prisma.leaderboardTool.aggregate({ _sum: { votes: true } });
    const modelVotes = await prisma.leaderboardModel.aggregate({ _sum: { votes: true } });
    const companyVotes = await prisma.leaderboardCompany.aggregate({ _sum: { votes: true } });
    const totalVotesSum = (toolVotes._sum.votes || 0) + (modelVotes._sum.votes || 0) + (companyVotes._sum.votes || 0);
    return {
        items,
        pagination: {
            totalCount,
            totalPages: Math.ceil(totalCount / query.limit),
            currentPage: query.page,
            limit: query.limit
        },
        categories: categoriesList,
        stats: {
            totalTools: totalToolsCount,
            totalModels: totalModelsCount,
            totalCompanies: totalCompaniesCount,
            totalVotes: totalVotesSum,
            hotCategory: "Code Assistant"
        }
    };
}
