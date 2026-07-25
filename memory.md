# Memory — Prisma Postgres (Better Auth rolled back)

Last updated: Saturday Jul 25, 2026 ~3:02 PM (UTC+3)

## What was built

- Prisma 7 + Prisma Postgres still in place (`prisma/`, `prisma.config.ts`, `src/lib/database/`)
- Init models restored: `User`, `Post`
- Migration history: only `20260725102828_init` (Better Auth migration removed)
- DB reset to match init schema; Prisma Client regenerated

## Decisions made

- Rolled back Better Auth only; kept Nest Prisma infrastructure (`ConfigModule` + `PrismaModule`)

## Problems solved

- Better Auth integration removed from AppModule / main / controller
- Packages uninstalled: `better-auth`, `@thallesp/nestjs-better-auth`
- Deleted `src/lib/auth.ts` and `20260725105758_better_auth` migration

## Current state

- No Better Auth wiring
- Prisma Postgres + Nest PrismaService/Module working baseline
- Auth env vars may still exist in `.env` (unused)

## Next session starts with

- Re-approach auth cleanly (architect first), or continue movie-domain schema on Prisma

## Open questions

- Prefer Better Auth again with a clearer plan, or a different auth approach?
