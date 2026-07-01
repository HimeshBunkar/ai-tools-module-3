# AI Tools Module (Module 3)

Standalone slice of the AI Discovery Platform, owned end-to-end: listing, detail, bookmarks,
reviews, and similar tools. Built to merge cleanly into the main monorepo later — `Company`
and `User` are stub models that Module 4 (Companies) and Module 11 (Auth) will extend without
breaking these relations.

## Stack

Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS · Prisma · PostgreSQL · Zod

## Setup (Windows / PowerShell)

```powershell
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your DATABASE_URL
Copy-Item .env.example .env

# 3. Generate Prisma client and run the first migration
npx prisma generate
npx prisma migrate dev --name init_tools_module

# 4. Seed demo data (companies, tools, categories, tags, one review)
npm run db:seed

# 5. Start the dev server
npm run dev
```

App runs at http://localhost:3000 — placeholder home links to `/tools`.

## Useful commands

```powershell
npm run typecheck    # strict TS check, no emit
npm run lint         # eslint, no warnings allowed
npx prisma studio    # visual DB browser
```

## Status

- [x] Step 1 — Project scaffold, Prisma schema, seed data
- [ ] Step 2 — `/tools` listing page (search, filters, sort, pagination)
- [ ] Step 3 — `/tools/[slug]` detail page
- [ ] Step 4 — Bookmark API + optimistic UI
- [ ] Step 5 — Reviews CRUD API + UI
- [ ] Step 6 — Similar tools logic
- [ ] Step 7 — SEO metadata, structured data, error/loading/empty states pass
