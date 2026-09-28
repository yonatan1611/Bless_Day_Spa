# Neon + Prisma setup

The app keeps database credentials server-only. Never use `DATABASE_URL` in client-side Vite variables and never commit `.env.local`.

## 1. Add both Neon URLs

In Neon, choose **Connect**. Add the pooled URL to `DATABASE_URL` and the non-pooler/direct URL to `DIRECT_URL` in `.env.local`.

```env
DATABASE_URL="postgresql://...-pooler..."
DIRECT_URL="postgresql://...non-pooler..."
```

## 2. Install and generate Prisma Client

```powershell
npm install
npx prisma generate
```

## 3. Create the schema

```powershell
npx prisma migrate dev --name init
```

Then add the exclusion SQL described in `prisma/migrations/README.md` to the generated migration before applying it to production.

## Security model

- `AdminUser.passwordHash` only stores a one-way password hash, created by the server with Argon2 or bcrypt—not a plaintext password.
- Prisma and Neon are server-only. The browser calls API routes; it never receives database credentials.
- The Postgres exclusion constraint rejects simultaneous overlapping booking requests.
- The current Vite app still needs conversion to a server framework (recommended: Next.js) before these server files can be deployed.
