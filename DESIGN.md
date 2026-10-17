---
name: Bless Day Spa
description: A plaster-and-rose system grounded in the spa's own real materials, not a generic luxury-spa template.
colors:
  plaster: "#E3E6DD"
  stone: "#D2CCBB"
  ink: "#1C1612"
  eucalyptus: "#434C3A"
  rose: "#8C3346"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Hiragino Sans, sans-serif"
    fontWeight: 500
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, sans-serif"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  sm: "2px"
  md: "4px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4rem"
  section: "clamp(4rem, 10vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.plaster}"
    rounded: "{rounded.sm}"
    padding: "0.95rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.rose}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
---

# Design System: Bless Day Spa

## Overview

**Creative North Star: "The Hammam in Addis Light"**

Bless Day Spa is a real, single-location hammam-and-massage spa in Wollo Sefer, Addis Ababa, not a generic "zen spa" backdrop. The system is built from the business's own physical world rather than an imported luxury-spa mood board: the lime-plastered walls and wet stone of the Moroccan bath room, the thin, clean, high-altitude daylight of Addis Ababa (2,355m, equatorial, filtered through eucalyptus canopy), and the one flower that actually recurs across the business's real photography, loose rose petals resting on the treatment beds. It replaces a prior "Forest" palette (deep pine/bone/fern/amber) and a Newsreader-serif identity, both of which leaned on a generic premium-wellness formula rather than this specific place.

The system refuses two ruts at once: the generic candle-lit beige-and-orchid "luxury spa" template, and the generic "Africa" cliché of tribal-pattern-as-wallpaper. Instead it commits to one neutral plaster family, one saturated accent (the rose), and a confident grotesque typeface with the directness of hand-painted Addis shopfront signage rather than an imported "boutique hotel" serif.

**Key Characteristics:**
- Cool, grey-green plaster neutrals, never warm cream or beige
- Exactly one saturated accent color, used identically everywhere it appears
- Sans-only type system: a confident grotesque display face, no serif
- Sharp, restrained corner radii (2-4px), never pill-shaped except the floating nav and tag-style chips
- Real business photography throughout; no stock imagery except the one disclosed facials exception
- Motion is a small, authored set (reveal-on-scroll, hover-zoom, one magnetic CTA), not a kit of scattered effects

## Colors

A plaster-and-rose system: three cool neutrals carry the page, one dark neutral carries inverse sections, and a single deep rose accent does every job color needs to do.

### Primary
- **Rose** (`#8C3346`): The system's only saturated color. Treatment prices, active tab indicators, the italic word inside the hero headline, CTA hover-fill, carousel dots, section eyebrows. Never diluted into a second accent family; `--accent` and `--accent-warm` resolve to the same value.

### Neutral
- **Plaster** (`#E3E6DD`): Page background. A cool, grey-green "worn lime plaster" tone, deliberately not the warm cream/beige family common to AI-generated premium-consumer palettes.
- **Stone** (`#D2CCBB`): Secondary surface background for alternating sections, panels, and cards (`--bg-surface`).
- **Ink** (`#1C1612`): Primary text color and inverse section background (footer, dark CTA bands). A warm near-black, never pure `#000000`.
- **Eucalyptus** (`#434C3A`): A muted, desaturated dark green reserved for one alternate section treatment (`--bg-accent`, used by the homepage trust-strip marquee). Deliberately kept out of the accent role so the system still reads as one-accent.

### Named Rules
**The One Accent Rule.** Rose is the only saturated color in the system. It never shares a screen with a second competing hue; eucalyptus and stone are desaturated neutrals, not accents.

## Typography

**Display Font:** Bricolage Grotesque (with Hiragino Sans, sans-serif fallback)
**Body Font:** Archivo (with system sans fallback)

**Character:** A confident, slightly idiosyncratic grotesque for display type, paired with a quiet workhorse grotesque for body copy. Both self-hosted as variable fonts (no third-party font host at runtime). No serif anywhere: the brief never named one, and reaching for "editorial serif" as a default for a premium-consumer brief is exactly the generic move this system avoids.

### Hierarchy
- **Display XL** (500, `clamp(3.5rem, 2.5rem+5vw, 7.5rem)`, line-height 0.95): Hero and treatment-detail page titles.
- **Display LG** (500, `clamp(2.25rem, 1.8rem+2vw, 4rem)`, line-height 1.05): Section and page H1/H2 headings.
- **Display MD** (500, `clamp(1.5rem, 1.3rem+1vw, 2.25rem)`, line-height 1.15): Subsection headings.
- **Body LG/Body/Body SM**: Archivo at three fluid sizes for lead paragraphs, running copy, and captions/meta text respectively.
- **Eyebrow** (600, `0.75-0.875rem`, uppercase, 0.07em tracking, rose): A small label used sparingly, at most roughly one per three sections on any page, never stacked more than once per content block.

### Named Rules
**The Single-Emphasis Rule.** Emphasis inside a headline (e.g. the italic word in "for a *blessed* day") uses italic of the same family in the rose accent color. Never a second typeface for emphasis.

## Layout

A fluid, clamp()-based rhythm rather than fixed breakpoint jumps. `--container-max: 1320px`, `--container-text: 44rem` for prose-width columns. Section vertical rhythm is `--section-gap: clamp(4rem, 10vw, 8rem)`. Side gutters are `--gutter: clamp(1.25rem, 5vw, 5rem)`. Breakpoints: 480 / 768 / 1024 / 1280 / 1440, applied as raw values per-component rather than a rigid global grid. Editorial two-column layouts (treatment rows, about sections) collapse to a single column under 1024px; horizontal tab lists (treatment explorer, menu categories) collapse to a horizontally-scrollable pill row under 1024px rather than stacking vertically.

## Elevation & Depth

Flat by default. Shadows are used only in two load-bearing places: the floating header's glass clusters (`--shadow-header`) and the mobile nav panel / lightbox (`--shadow-panel`), both tinted toward ink rather than pure black. Depth elsewhere comes from color contrast between plaster/stone/ink sections, not from drop shadows on cards.

### Named Rules
**The Flat Panel Rule.** A `.panel` (pricing cards, contact cards, the "essentials" tiles) is a flat bordered surface with a stone background. It never gets a box-shadow or a cursor-tracked glow; hierarchy comes from spacing and the stone/plaster contrast, not elevation.

## Shapes

Deliberately restrained: `--radius-sm: 2px` for buttons, inputs, and image frames; `--radius-md: 4px` for panels and larger containers. The floating header and nav pills are the only full-radius (`999px`) elements in the system (plus the circular WhatsApp FAB, `border-radius: 50%`), reserved for small interactive controls rather than used broadly. This is not a rounded-corner system; the near-sharp default is intentional, read against the plaster's soft materiality.

## Components

### Buttons
- **Shape:** 2px radius, 3.25rem min-height.
- **Primary:** Ink fill, plaster text; on hover, a rose fill sweeps in from the left (`scaleX` transform, not a color-swap). Wrapped in a Motion-value-driven magnetic pull (no React re-renders) reserved for primary CTAs only.
- **Secondary:** Transparent with a currentColor border; hover tints toward a translucent fill of the current text color.
- **Text:** No border or fill, an underline only; hover shifts to rose.
- All variants get a `translateY(1px)` tactile press on `:active`.

### Cards / Panels
- **Corner style:** 4px radius, 1px `--border-subtle` border.
- **Background:** Stone, against a plaster or ink page background.
- **Shadow strategy:** None (see Elevation).
- **Internal padding:** `--space-lg` (2.5rem).

### Navigation
Three separate floating glass clusters (brand mark, nav links, actions) rather than one continuous bar, pinned at the same translucent-plaster treatment regardless of scroll position or which section sits behind it. Desktop nav links sit in a pill-shaped glass cluster with a solid ink fill on the active/current-page link. Mobile collapses to a full-screen ink takeover with staggered link entrance.

### Treatment Menu / Explorer (signature component)
A vertical tab list (horizontal pill-scroll on mobile) paired with a cross-faded detail panel, used for both the homepage treatment browser and the full treatments-page pricing menu. Replaces a flat price table or card grid; keeps ~25 individual menu line items organized by category rather than as one long list.

## Do's and Don'ts

### Do:
- **Do** use rose as the only saturated accent, applied identically across every page.
- **Do** keep eyebrows rare, at most roughly one per three sections per page.
- **Do** use real Bless Day Spa photography; the one disclosed stock exception (facials) stays labeled honestly in sourcing comments, never passed off as business photography.
- **Do** keep every "book" CTA honest that it opens a WhatsApp/phone conversation, not a confirmed appointment.

### Don't:
- **Don't** introduce a second accent color, warm beige/cream backgrounds, or a serif display face without an explicit brand reason.
- **Don't** reach for a cursor-tracked glow, 3D tilt, or particle effect as a default; the system's motion vocabulary is deliberately small (scroll-reveal, hover-zoom, one magnetic CTA).
- **Don't** stack more than two consecutive sections in the same layout family (e.g. image-left/text-right) without breaking the pattern.
- **Don't** fabricate business facts, pricing, or testimonials; everything on the site traces to `docs/research.md` or the business's own supplied menu.
