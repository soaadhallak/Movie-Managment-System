# Memory — Prisma Postgres (Better Auth rolled back)

Last updated: Saturday Jul 25, 2026 ~4:00 PM (UTC+3)

## What was built

- Better Auth removed from Nest again (`src/lib/auth/` deleted)
- Packages uninstalled: `better-auth`, `@thallesp/nestjs-better-auth`, `zod`
- App restored to Prisma-only: `ConfigModule` + `PrismaModule`
- Local schema restored to guide `User` / `Post`
- Prisma Client regenerated for User/Post

## Current state

- **Code:** rolled back (no Better Auth)
- **DB:** still has Better Auth tables (`user`/`session`/`account`/…) until destructive sync is consented
- Migration `20260725130000_rollback_better_auth_again` was marked applied in history but SQL may not have run via `db push` (blocked)

## Next session starts with

- Get explicit consent to run `npx prisma db push --accept-data-loss` (or equivalent) to finish DB rollback
- Then continue movie-domain work or re-architect auth with a confirmed plan
