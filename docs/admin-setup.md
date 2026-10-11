# Menu admin setup

`/admin` lets the business owners edit menu prices, add/remove treatments,
and add whole new categories with a photo — no code changes or redeploys.
It's backed by a Neon Postgres database (via Prisma, `prisma/schema.prisma`)
and Vercel Blob for photos. Neither is connected yet — this is a one-time
setup.

The public site (`/treatments`, the homepage explorer, the booking form)
reads the same data through `GET /api/menu` (see `src/hooks/useMenu.ts`). If
the database isn't set up yet, or has an outage, that endpoint silently
falls back to the bundled `src/content/menu.ts` — the public site keeps
working either way; only `/admin` itself needs the database to function.

## 1. Connect Neon Postgres

In the Vercel dashboard → the project → **Storage** → **Create Database** →
**Neon**. This auto-adds `DATABASE_URL` and `DIRECT_URL` to the project's
environment variables for all environments.

## 2. Connect Vercel Blob

Same **Storage** tab → **Create** → **Blob**. This auto-adds
`BLOB_READ_WRITE_TOKEN`.

## 3. Set the remaining environment variables

Project → **Settings** → **Environment Variables**:

| Variable | Required | Value |
| --- | --- | --- |
| `SESSION_SECRET` | Yes | A long random string that signs the admin login cookie. Generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. |
| `ADMIN_EMAIL` | Only for seeding | The first admin's login email. Only read once, by the seed script below. |
| `ADMIN_PASSWORD` | Only for seeding | The first admin's login password (change it after first login — there's a "Change password" link on the dashboard). |

All of these are server-only — never prefix them `VITE_` or reference them
from client code.

## 4. Pull the env vars locally and run the migration

```powershell
vercel env pull .env.local --yes
npx prisma db push
npm run prisma:seed
```

This project doesn't use tracked Prisma migrations (`prisma/migrations/` is
empty aside from a README) — the database schema has always been kept in
sync with `prisma db push` instead, which diffs and applies non-destructively.
Don't run `prisma migrate dev` here: since there's no migration history to
compare against, it sees the existing tables as untracked "drift" and offers
to reset (drop) the whole `public` schema, which would destroy whatever is
already in the database. `db push` creates the new `menu_categories`/
`menu_items` tables without touching anything else.

`npm run prisma:seed` creates the first `AdminUser` from `ADMIN_EMAIL`/
`ADMIN_PASSWORD` (skipped if that email already exists) and imports the
current menu from `src/content/menu.ts` as the initial database rows, so
`/admin` starts out matching what's already live. Both steps are safe to
re-run.

## 5. Log in

Visit `/admin/login` with the email/password from step 3, then use the
"Change password" link on the dashboard. `/admin` is excluded from search
indexing (`public/robots.txt`) but is not otherwise hidden — anyone with the
login can reach it, so treat that password like any other admin credential.

## Local development

Like `api/book.ts`, the admin API routes (`api/admin/*.ts`, `api/menu.ts`)
only run under `vercel dev`, not plain `npm run dev` — Vite's dev server
doesn't execute Vercel Functions. Per the same quirk documented in
`docs/booking-email-setup.md`, source `.env.local` into the shell before
starting it, or the functions won't see the pulled env vars:

```bash
set -a && source .env.local && set +a
vercel dev
```

`npm run dev` alone is still fine for everything else; `/admin` just won't
be reachable (and the public site will render the static fallback menu)
until you run it through `vercel dev` or it's deployed.

## Photos

Category photos are uploaded straight from the admin dashboard (JPEG, PNG,
or WebP). The browser downscales/recompresses the image before sending it,
so there's no practical size limit to worry about from the admin's side —
just pick the photo. Photos are per **category**, not per individual item
(e.g. one photo for "Massage," shared by all of its listed treatments),
matching how the public site displays them today.
