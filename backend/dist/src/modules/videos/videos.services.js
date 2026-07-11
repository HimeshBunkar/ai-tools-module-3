// ---- Reads (used by the Worker's HTTP routes) ----
export async function fetchVideos(prisma, sort, limit) {
    if (sort === "trending") {
        const cutoff = new Date(Date.now() - 60 * 86400000).toISOString().slice(0, 10);
        return prisma.video.findMany({
            where: { publishedAt: { gte: cutoff } },
            orderBy: { views: "desc" },
            take: limit,
        });
    }
    return prisma.video.findMany({
        orderBy: { publishedAt: "desc" },
        take: limit,
    });
}
export async function fetchVideoBySlug(prisma, slug) {
    return prisma.video.findUnique({ where: { slug } });
}
export async function fetchRelatedVideos(prisma, video, limit = 4) {
    const sameCategory = await prisma.video.findMany({
        where: { id: { not: video.id }, toolCategory: video.toolCategory },
        orderBy: { publishedAt: "desc" },
        take: limit,
    });
    if (sameCategory.length >= limit)
        return sameCategory;
    const fillers = await prisma.video.findMany({
        where: {
            id: { not: video.id, notIn: sameCategory.map((v) => v.id) },
            toolCategory: { not: video.toolCategory },
        },
        orderBy: { publishedAt: "desc" },
        take: limit - sameCategory.length,
    });
    return [...sameCategory, ...fillers];
}
// ---- Writes (used by the standalone crawler, see backend/crawler/ingest.ts) ----
// These replace apps/server/src/store.ts's Supabase calls one-for-one.
export async function getKnownYoutubeIds(prisma) {
    const rows = await prisma.video.findMany({ select: { youtubeId: true } });
    return new Set(rows.map((r) => r.youtubeId));
}
export async function upsertVideos(prisma, incoming) {
    if (incoming.length === 0) {
        return prisma.video.count();
    }
    await prisma.$transaction(incoming.map((v) => prisma.video.upsert({
        where: { youtubeId: v.youtubeId },
        update: {
            title: v.title,
            description: v.description,
            toolName: v.toolName,
            toolCategory: v.toolCategory,
            thumbnail: v.thumbnail,
            durationSeconds: v.durationSeconds,
            views: v.views,
            likes: v.likes,
            publishedAt: v.publishedAt,
            authorName: v.author.name,
            authorAvatar: v.author.avatar,
            tags: v.tags,
            accent: v.accent,
        },
        create: {
            slug: v.slug,
            title: v.title,
            description: v.description,
            toolName: v.toolName,
            toolCategory: v.toolCategory,
            youtubeId: v.youtubeId,
            thumbnail: v.thumbnail,
            durationSeconds: v.durationSeconds,
            views: v.views,
            likes: v.likes,
            publishedAt: v.publishedAt,
            authorName: v.author.name,
            authorAvatar: v.author.avatar,
            tags: v.tags,
            accent: v.accent,
        },
    })));
    return prisma.video.count();
}
