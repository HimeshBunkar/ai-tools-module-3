export async function pruneToMostRecent(prisma, keep = 150) {
    const idsToDelete = await prisma.news.findMany({
        orderBy: { publishedAt: "desc" },
        skip: keep,
        select: { id: true },
    });
    const ids = idsToDelete.map((r) => r.id);
    if (ids.length === 0)
        return 0;
    await prisma.$transaction([
        prisma.newsVote.deleteMany({ where: { articleId: { in: ids } } }),
        prisma.newsBookmark.deleteMany({ where: { articleId: { in: ids } } }),
        prisma.newsComment.deleteMany({ where: { articleId: { in: ids } } }),
        prisma.news.deleteMany({ where: { id: { in: ids } } }),
    ]);
    return ids.length;
}
