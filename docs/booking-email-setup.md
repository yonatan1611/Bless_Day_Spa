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

**Known quirk:** in this CLI version, the `api/book.ts` Edge Function only
sees env vars that are actually present in the shell process `vercel dev`
is launched from — a `.env.local` file alone is not enough, even though it
looks correct and even though `vercel link`/`vercel env pull` write to it.
Register the two required vars on the Vercel project itself
(`vercel env add RESEND_API_KEY development`,
`vercel env add BOOKING_NOTIFY_EMAIL development`), `vercel env pull
.env.local --yes`, then source that file into the shell *before* starting
`vercel dev`:

```bash
set -a && source .env.local && set +a
vercel dev
```

Without that `source` step, the function returns "Email is not configured
on the server yet." even with correct values sitting in `.env.local`.

Also note Resend's sandbox sender (`onboarding@resend.dev`, the default
when `BOOKING_FROM_EMAIL` is unset) will only deliver to the email address
your Resend account is signed up with — sending to any other
`BOOKING_NOTIFY_EMAIL` fails with a 403 until a domain is verified in
Resend and `BOOKING_FROM_EMAIL` is set to an address on that domain.

## 4. Visitor confirmation email

If a visitor fills in the optional email field on the "Your details" step,
`api/book.ts` also sends them a short confirmation once the business
notification succeeds. This is the same sandbox restriction as above, just
hitting a different recipient: until a domain is verified in Resend, that
confirmation can only actually be delivered when the visitor happens to
enter the Resend account's own signup email — any other address fails with
a 422 ("Invalid `to` field... use our testing email address"). The business
notification is unaffected either way, since it always goes to the fixed
`BOOKING_NOTIFY_EMAIL` inbox, not the visitor's address.

This failure is caught and logged (`console.error`, visible in `vercel
dev`'s terminal locally or the function's logs in the Vercel dashboard once
deployed) but does **not** fail the visitor's request — they still see
"Sent" either way, since the spa has already been notified by that point.
Don't mistake "no confirmation email arrived" for a bug until a domain is
verified; check the function logs for the Resend error first.
