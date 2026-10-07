# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Prospective and returning customers of Bless Day Spa in Wollo Sefer, Addis Ababa, deciding whether and how to book a treatment (massage, Moroccan bath, steam & sauna, or facials). Primarily mobile browsers checking treatment options, pricing, atmosphere, and reviews before reaching out.

## Product Purpose

A marketing and lead-capture website for a real, single-location day spa. It replaces an informal, undocumented online presence with a professional site: a browsable treatment menu with real pricing, real photography of the space, verified guest reviews, and a booking request flow that reaches the business by email (with Messenger/phone as a fallback), since there is no live appointment calendar.

## Positioning

Distinguishes itself from generic spa-site boilerplate by being genuinely verified: real business facts (sourced and cross-checked, see docs/research.md), real Tripadvisor reviews, real on-site photography (one disclosed exception: a single licensed stock photo for facials, since no business photography of that treatment exists), and an explicitly honest booking flow that says "this is a request, not a confirmed booking" rather than faking live availability.

## Operating Context

- Single physical location: Wollo Sefer, just off Ethio-China Road, near the Meskel Flower roundabout, Addis Ababa, Ethiopia.
- No admin login, no appointment calendar, no database-backed booking system yet (see docs/neon-prisma-setup.md for a sketched future system that is not built).
- Booking requests arrive by email via a Vercel Edge Function (api/book.ts) using Resend; Messenger and phone are the visible fallback.
- The business confirms actual appointment times by message or call after a request is sent; no booking is confirmed until the business responds.
- Deployment target: Vercel (free Hobby tier currently). A custom domain is being purchased separately through a registrar (Yegara) and will be pointed at Vercel via DNS, then verified with Resend to enable visitor confirmation emails.

## Capabilities and Constraints

- Treatments offered: Massage, Moroccan bath, Steam & sauna, Facials. Hair salon and nail care were previously listed but are confirmed discontinued; do not reintroduce them.
- Pricing is shown as listed by the business's own treatment menu/flyers; visitors are told to confirm current rates when booking.
- The booking stepper collects: selected treatment(s), preferred date/time, name, phone (required), and email (optional). Providing an email triggers a confirmation email to the visitor; phone is always required and is the business's primary way to follow up.
- No fabricated claims: ratings, counts, testimonials, or business facts (ownership, opening year, certifications) stay unconfirmed/absent until the business verifies them directly, per docs/research.md's sourcing discipline.
- Visitor confirmation emails are best-effort only: Resend's unverified-account sandbox mode currently restricts delivery to the Resend account's own signup address. This is an external platform constraint to resolve by verifying a domain, not a product decision to work around in code.
- The Gallery page also surfaces the same photography used on the homepage (hero lounge, treatment shots, atmosphere/flower detail shots) alongside Gallery's own distinct photo set.

## Brand Commitments

- Business name: Bless Day Spa. A brand mark exists at `public/images/brand/bless-mark.png`.
- Visual system: a "plaster and rose" palette (cool grey-green plaster, stone, warm near-black ink, muted eucalyptus, a single saturated rose accent) with Bricolage Grotesque/Archivo typography, grounded in the spa's own physical world (hammam tadelakt plaster, Addis Ababa's high-altitude light, the rose petals recurring in the real photography) rather than a generic luxury-spa template. Documented in full at `DESIGN.md`. Replaces an earlier "Forest" palette (deep pine/bone/fern/amber, Newsreader/DM Sans) from a prior redesign pass.
- Voice: plain, honest, factual. Avoids marketing filler verbs and fabricated precision (see docs/research.md and the sourcing comments throughout `content/*.ts`).
- Social presence: Facebook, Instagram, TikTok (handles in `src/content/business.ts`). Tripadvisor is the source of the real guest reviews used on the site.

## Evidence on Hand

- Verified business facts: `src/content/business.ts` (phone, hours, area, years of experience, social links), sourced and cross-checked per `docs/research.md`.
- Real guest reviews: `src/content/reviews.ts`, copied verbatim from the public Tripadvisor listing with reviewer name and date.
- Real photography: `public/images/{homepage,treatments,about,gallery,brand,reviews}/*`, sourced from the business's own treatment-flyer and interior photos, per the sourcing notes in `src/content/images.ts`. One exception: facials uses a single licensed stock photo (Unsplash License), since no business photography of that treatment exists.
- Absences future work must not fabricate: no confirmed opening year, ownership, or certifications (explicitly flagged as unconfirmed on the About page); no live appointment availability or calendar; no case studies, press, or awards.

## Product Principles

1. Never state a business fact, claim, or statistic that hasn't been verified directly with the business or sourced from a citable, public listing.
2. Keep the booking flow honest about what it is: a request the business confirms afterward, never implied as a live, guaranteed appointment.
3. Prefer real photography and real content over generic stock or invented placeholders; when neither exists, say so rather than fabricate.
4. Preserve the current service list exactly (massage, Moroccan bath, steam & sauna, facials); treat discontinued services (hair salon, nail care) as permanently out of scope unless the business says otherwise.
5. Keep the site's current visual language (the plaster-and-rose palette and Bricolage Grotesque/Archivo type system documented in `DESIGN.md`) as the incumbent world until the user explicitly asks for a new one.

## Accessibility & Inclusion

No business-specific accessibility requirement has been established. The codebase already follows general web accessibility practice (focus states, reduced-motion handling, alt text, and WCAG-contrast-aware palette choices from the recent redesign pass).
