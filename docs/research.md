# Bless Day Spa — research record

Researched: 15 September 2026. This record is intentionally conservative: a fact is only suitable for customer-facing use when it is consistently supported by recent, attributable sources.

## Sources consulted

1. [Tripadvisor business listing](https://www.tripadvisor.com/Attraction_Review-g293791-d8062300-Reviews-Bless_Day_Spa-Addis_Ababa.html) — crawled September 2026; includes a guest review published April 2025.
2. [Cybo business listing](https://www.cybo.com/ET-biz/bless-day-spa_2J) — crawled April 2026.
3. [AfricaBizInfo business listing](https://www.africabizinfo.com/ET/bless-day-spa_2J-011-416-9211) — crawled July 2026.
4. Facebook profile linked by the business listings: `facebook.com/258850797561505` / `m.me/blessdayspa`. It could not be inspected by the research tool, so it is not used as evidence for current content.

## Supported facts

| Fact | Confidence | Evidence |
| --- | --- | --- |
| The business is Bless Day Spa in Addis Ababa, Ethiopia. | High | All consulted listings. |
| It is in Wollo Sefer, on or just off Ethio-China Road, near the Meskel Flower roundabout. | Medium–high | Tripadvisor, Cybo, AfricaBizInfo. Use this as a directional description, not a street-number address. |
| The business serves women and men. | Medium | Tripadvisor’s business description. |
| Massage, Moroccan bath, steam/sauna, and hair salon services are listed. | Medium | Tripadvisor’s business description; hair salon is also mentioned in recent/older reviews. |
| The listings show daily hours of 09:30–20:00. | Medium | Tripadvisor, Cybo, AfricaBizInfo agree. Verify with the business before publishing as operational hours. |

## Not yet suitable for public site content

- Exact street/building address: listings vary between Ethio-China Road and Kirkos-3-632.
- Email: listings give `blessdayspa.addis@gmail.com`, but this is unverified and should not be exposed without confirmation.
- WhatsApp number, prices, booking method, staff, facilities beyond the services above, opening year, ownership, certifications, awards, and social handles.
- Images, logo, and brand assets: no rights-cleared official assets were retrieved. Do not reuse third-party listing/review imagery.

## Review signal (for editorial direction only)

A review published April 2025 describes professional service, deep-tissue massage, and hot towels. Older reviews mention calmness and cleanliness. These are individual customer opinions, not claims or testimonials for the website.

## Update: phone number confirmed October 2026

The site maintainer confirmed `+251 91 264 6675` (the number already seen in
directory search results and in the Instagram/TikTok bios) as the business's
main number to call. It's used as a `tel:` link in `src/content/business.ts`
(`phone`/`phoneDisplay`). The `011 416 9211` landline from directory detail
pages remains unconfirmed and unused.

## Update: additional reviews added October 2026

The Tripadvisor listing blocks automated fetching, so it could not be
re-crawled directly. The site maintainer instead copied four reviews
verbatim (quote, reviewer name/location where shown, and date) straight
from the live listing and provided them for `src/content/reviews.ts`:
davidevil (Apr 2025), Senait H. of Dallas, TX (Jun 2018), Hiwot T. of
Arlington, VA (Jul 2017), and an unattributed review (Oct 2015). All four
are used as testimonial excerpts on the site.

## Update: first-party content supersedes this record

Starting late September 2026, the business itself supplied its own official
photography, logo, and treatment/price flyers directly (not third-party
listings). That first-party material is a stronger source than anything
above and is used in `src/content/menu.ts`, `src/content/images.ts`, and the
real photography under `public/images/`. Where it conflicts with the
conservative stance below (e.g. "do not make treatment menus or price
claims"), the first-party material wins. The caveats below still apply to
anything the business hasn't itself confirmed (exact address, email,
WhatsApp, opening year, ownership, certifications).

## Update: current menu supplied directly by the owners (October 2026)

The site maintainer spoke with the owners directly and was sent the
business's current, authoritative menu verbatim: Moroccan Bath (10 items,
five variations each with an optional light-massage add-on), Massage (8
items), Steam & Sauna (4 items), Facial (1 item, Microdermabrasion), and a
generator fee for power during treatments. This replaces the earlier
flyer-sourced price list in `src/content/menu.ts` entirely — flyers can go
stale, a direct conversation with the owners doesn't.

The owners also confirmed two things explicitly:
- **Hair salon services have been discontinued.** Removed from
  `src/content/services.ts` and `src/content/menu.ts` (the former
  `hair-and-beauty` category), along with its dedicated images in
  `src/content/images.ts`. A real photo of a salon-area lounge nook is kept
  in the Gallery's masonry grid, recaptioned neutrally rather than implying
  a bookable hair service still exists.
- **Packages have been discontinued** ("they don't have a package, they
  stopped doing that"). The whole feature was removed rather than left as a
  stale "coming soon" page: `src/content/packages.ts`, `PackagesPage.tsx`,
  `SignatureExperiences.tsx`, the `/packages` route, and its nav links are
  all gone.

Nail care is absent from this new, authoritative menu. It wasn't explicitly
called "stopped" the way hair salon and packages were, but the previous
packages were nail-care based, and the owners described this as their
current menu in full — so it's treated as no longer offered and has been
removed from `src/content/services.ts` and `src/content/images.ts` rather
than left listed without a confirmed price. If it turns out nail care is
still available, it can be reinstated once that's confirmed.

## Content implications

- Start with a clear, factual local introduction—not invented wellness language.
- Use the confirmed service categories only; do not make treatment menus or price claims.
- The primary conversion should be a neutral appointment request until a verified booking channel is supplied.
- Put directions via a generic Google Maps search link, rather than asserting an uncertain exact pin.
