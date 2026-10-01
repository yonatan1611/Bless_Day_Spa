# Booking email setup

The booking flow (`/book`, `src/components/booking/BookingStepper.tsx`) ends
by POSTing the request to `api/book.ts`, a Vercel Edge Function that emails
it to the spa via [Resend](https://resend.com). This is the "simple" option
discussed in chat: no database, no admin login, no appointment calendar —
just a reliable notification instead of relying on the visitor to also
click through to Messenger. Messenger and the phone number stay visible on
that same step as a fallback if the email ever fails.

If the full admin/appointments system sketched in `prisma/schema.prisma`
and `docs/neon-prisma-setup.md` gets built later, this function is small
enough to retire or fold into it — it doesn't block that path.

## 1. Create a Resend account and API key

1. Sign up at [resend.com](https://resend.com) (free tier is enough for a
   single-location spa's volume).
2. Create an API key under **API Keys**.

By default the function sends from Resend's shared sandbox address
(`onboarding@resend.dev`), which works with **no domain setup** but can land
in spam and shows that address to the recipient. Once the business is ready
for a nicer "from" address, verify a domain in Resend (**Domains** →
**Add Domain**, then add the DNS records Resend gives you) and set
`BOOKING_FROM_EMAIL` below to something like
`Bless Day Spa <appointments@blessdayspa.com>`.

## 2. Set environment variables in Vercel

Project → **Settings** → **Environment Variables**:

| Variable | Required | Value |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | The API key from step 1. |
| `BOOKING_NOTIFY_EMAIL` | Yes | The inbox that should receive requests — e.g. the business's own address, confirmed by them directly (see the phone-number precedent in `docs/research.md`; don't guess at an unverified address). |
| `BOOKING_FROM_EMAIL` | No | Only after a domain is verified in Resend (see above). Leave unset to use the sandbox sender. |

These are server-only — never add them as `VITE_`-prefixed variables or
reference them from client code, since anything with that prefix ships to
the browser.

## 3. Local development

`vercel dev` (not `npm run dev`) is required to exercise `api/book.ts`
locally, since it needs the same env vars loaded and Vite's own dev server
doesn't run Vercel Functions. Running `npm run dev` alone is fine for
everything else; the booking form's "Send request" button will just fail
(falling back to its own error state) until the function is reachable,
either via `vercel dev` or once deployed.
