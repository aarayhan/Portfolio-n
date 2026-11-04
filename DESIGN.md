---
name: Raey Portfolio
description: Flat ink-and-paper portfolio with huge condensed type and one orange mark.
colors:
  ink: "#050a0e"
  bone: "#f2edea"
  signal-orange: "#ff5b14"
  muted-on-ink: "#9aa2a9"
  muted-on-bone: "#5d6368"
  hairline-on-ink: "#1f262c"
  hairline-on-bone: "#d9d2ce"
  loader-stone: "#464b4f"
typography:
  display-hero:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(4rem, min(16.5vw, 25svh), 16rem)"
    fontWeight: 400
    lineHeight: 0.8
    letterSpacing: "-0.01em"
  display-section:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(3.5rem, 10vw, 8.5rem)"
    fontWeight: 400
    lineHeight: 0.85
  display-title:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(2.75rem, 4.5vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 0.9
  body:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  lead:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  md: "12px"
  lg: "16px"
  xl: "32px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "96px"
  xl: "128px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-accent:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
  card-article:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.lg}"
    padding: "32px"
  card-project-stack:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "32px"
---

# Design System: Raey Portfolio

## Overview

**Creative North Star: "The Workshop Poster"**

A printed shop poster for working systems: enormous condensed capitals on alternating slabs of ink and paper, with a single orange mark. The site does not decorate. It states who built what, in type big enough to read from across a room, and gets out of the way of the work.

The mood is confident and plain-spoken. Surfaces are flat, rules are hairlines, and the only colour that is not ink or paper is orange. Motion is present but obedient: headlines rise out of masks, cards settle, numbers count up. It shows work rather than performing.

Rejections confirmed for this system: no gradients or glow, no second accent colour, no synthetic bold on Bebas Neue, and nothing that reads as a generic template (purple-gradient SaaS, icon-in-a-card grids).

**Key Characteristics:**
- Alternating ink (`#050a0e`) and bone (`#f2edea`) sections; orange used as a mark, never a surface for text.
- Bebas Neue at poster scale for every heading; Inter for everything you actually read.
- Flat at rest, hairline borders, pill buttons, large-radius cards.
- Sections overlap: the hero is sticky and the next section slides over it.
- Fully bilingual (ID/EN); type and layout must tolerate the longer string.

## Colors

A two-tone field (near-black ink and warm bone) with one orange accent and two muted greys for secondary text.

### Primary
- **Signal Orange** (`#ff5b14`): the only chromatic colour. Used for the nav "CV" pill, link underlines (2px, offset 4px), the trailing dot in the nav wordmark, note-block borders, the footer "contact" line on ink, section numbers in articles, and hover text on article cards. On bone it appears only as underline or border, because orange text on bone fails contrast.

### Neutral
- **Ink** (`#050a0e`): dark section background, button fill on bone, body text on bone. A blue-leaning black, never pure `#000`.
- **Bone** (`#f2edea`): light section background and text on ink. A warm off-white.
- **Muted on Ink** (`#9aa2a9`): secondary text on dark sections (dates, captions, summaries).
- **Muted on Bone** (`#5d6368`): secondary text on light sections (labels, stack lines, timeline periods).
- **Hairline on Ink** (`#1f262c`): borders and dividers on dark.
- **Hairline on Bone** (`#d9d2ce`): borders and dividers on light.
- **Loader Stone** (`#464b4f`): the opening loader background only, chosen so the orange, ink and bone circles all stay visible. Not a surface for pages.

### Named Rules
**The One Mark Rule.** Orange is the single chromatic colour. Its rarity is the point; it never fills a large area behind text and never appears twice in one visual cluster.

**The Paper-and-Ink Rule.** Sections alternate dark and light. A new section flips the tone of the one before it; two adjacent sections never share a background.

## Typography

**Display Font:** Bebas Neue (with Impact, sans-serif)
**Body Font:** Inter Variable (with ui-sans-serif, system-ui)

**Character:** A tall, single-weight condensed face shouting over a quiet, neutral reading face. All display text is uppercase and tightly leaded (0.8 to 0.95); all prose is sentence case.

### Hierarchy
- **Display Hero** (400, `clamp(4rem, min(16.5vw, 25svh), 16rem)`, 0.8): the name in the hero. Scales with viewport height as well as width so short laptops do not collide with the intro.
- **Display Section** (400, `clamp(3.5rem, 10vw, 8.5rem)`, 0.85): every section heading, revealed by a masked rise.
- **Display Title** (400, `clamp(2.75rem, 4.5vw, 4.25rem)`, 0.9): project titles; 3rem to 5rem on the featured project; 2.25rem on article cards.
- **Body** (400, 1rem, 1.5): prose and list content. Long-form article text caps at 68ch; intros at 52ch.
- **Lead** (400, 1.125rem, 1.55): project summaries and section intros, at 75% opacity when used as an intro.
- **Label** (500, 0.875rem, 1.4): metadata, nav links, buttons. Sentence case, no tracking, never uppercase.

### Named Rules
**The Single Weight Rule.** Bebas Neue has one weight. Markup may say `font-black`, but `font-synthesis: none` is set on purpose; never rely on faux bold.

**The Caps-Only-Display Rule.** Uppercase belongs to Bebas Neue. Inter is never set in capitals and never letterspaced.

## Layout

A single centred container (`max-w-7xl`, 1280px) with 16px side padding, 32px from the `sm` breakpoint. Sections are tall and open: 96px vertical padding, 128px at `lg`. Content sits on a two-column grid at `lg` (roughly equal, or 1.2fr/1fr for project rows) and collapses to a single column below it.

The hero is `100svh` (minimum 600px), sticky, with the photo pinned right and the name anchored bottom-left. The next section carries `z-10` and rounded top corners so it visibly slides over the hero. On desktop the first three projects become sticky stacked cards, each offset 1.5rem below the previous; below `lg` they fall back to a plain vertical flow with alternating image side.

Rhythm is generous and uneven on purpose: 24px to 56px between related blocks, 14vh between stacked cards. A sticky nav (56px tall, ink at 90% with blur) appears only after the hero is 75% scrolled; inner pages show it always.

## Elevation & Depth

Flat by default. Depth comes from tonal contrast between ink and bone sections and from overlap, not from shadows.

### Shadow Vocabulary
- **Section lift** (`box-shadow: 0 -12px 40px rgba(5,10,14,0.12)`): the projects section sliding over the hero.
- **Stack card lift** (`box-shadow: 0 -24px 60px -40px rgba(0,0,0,0.45)`): sticky project cards, cast upward onto the card behind.

### Named Rules
**The Upward Shadow Rule.** The only shadows point up, onto the thing that is being covered. No drop shadows under content, no glow, no elevation on hover (hover lifts by translation, not shadow).

## Shapes

Soft containers around hard type. Buttons, chips and the language switch are full pills (9999px). Cards are 16px (article, certificate); project thumbnails 16px; the project stack cards and the section that overlaps the hero use 32px. The mobile menu panel is 16px with 12px items. Borders are 1px hairlines; the one thick line is the 2px orange underline on links.

Images are cropped, not framed: thumbnails fill their card with `object-cover`, and the hero photo is masked with a fade on small screens only.

## Components

### Buttons
- **Shape:** full pill (9999px).
- **Primary:** ink fill, bone text, 24px by 14px in the hero, 20px by 10px in project cards. On the nav, the CV button inverts to Signal Orange with ink text (16px by 6px).
- **Outline:** 1px border in the current text colour, transparent fill, same padding; hover gives a 5% ink wash.
- **Hover / Focus:** hero buttons are magnetic (they drift toward the cursor). Focus is a 2px currentColor outline offset 4px. No colour change on primary.

### Cards / Containers
- **Article and certificate card:** 16px radius, 1px hairline border (ink or bone variant), 24px padding (32px from `sm`), transparent fill. Hover adds a 3% wash and lifts 6px on a spring; the "Read" label turns orange.
- **Project stack card (desktop):** 32px radius, bone fill, hairline border, 32px padding, Stack card lift shadow, height `min(78vh, 640px)`.
- **Thumbnail:** 16px radius, ink fill behind transparent images, scales to 0.985 on hover.

### Navigation
- **Hero bar:** location and local time at left, links at centre-right, language switch, then a black pill menu button on mobile. Text is ink on bone.
- **Sticky bar:** ink at 90%, blurred, 1px hairline underneath. Wordmark is the short name in Bebas Neue 24px followed by an orange period. Links are bone at 75%, full on hover; a search pill opens the command palette (`Ctrl K`).
- **Mobile menu:** hero uses a floating ink panel; the sticky bar expands in place with Bebas Neue 30px items.

### Lists and metadata rows
- **Timeline / services:** hairline-separated rows, 20px vertical padding; period in muted label, title at 20px semibold, place in medium weight.
- **Stat:** Bebas Neue at `clamp(4rem, 8vw, 6.5rem)` with a muted caption, counted up on scroll.
- **Skill chip:** pill with hairline border, tech icon at left, 14px.

### Article content blocks
- Prose at 68ch; inline code in a 6% ink chip; tables in a hairline-bordered 12px container; code figures in ink with a copy button; notes with a 4px orange left border and a 10% orange wash. Section titles carry an orange number.

### Opening loader
Full-screen Loader Stone with a three-circle mark (orange, ink, bone) that parts and recolours in a 4.2s loop, with the name in Bebas Neue below. Disappears after load or at 6s as a safety net.

### Custom cursor
A 12px dot that grows to 44px over links and buttons and inverts against the background. Mouse devices only; disabled for reduced motion and in `/admin`.

## Do's and Don'ts

### Do:
- **Do** alternate ink and bone sections and keep orange to a single mark per cluster.
- **Do** set every heading in Bebas Neue, uppercase, at line-height 0.8 to 0.95.
- **Do** use hairline borders (`#1f262c` on ink, `#d9d2ce` on bone) instead of fills or shadows to separate content.
- **Do** make pills for actions and 16px or 32px radii for containers.
- **Do** use the shared easing `cubic-bezier(0.2, 0.8, 0.2, 1)` for rises and fades (0.7s to 0.9s), and springs for lift and pop.
- **Do** respect reduced motion: cursor, loader animation and smooth scroll all switch off.
- **Do** test every layout in both Indonesian and English and with missing thumbnails, live URLs and repo links.

### Don't:
- **Don't** add gradients or glow. The only gradient in the system is the photo fade mask on small screens.
- **Don't** introduce a second accent colour or a tinted neutral beyond the two greys.
- **Don't** fake bold on Bebas Neue or letterspace Inter.
- **Don't** put orange text on bone; use it as an underline or border there.
- **Don't** drop shadows downward or add hover elevation.
- **Don't** reach for a generic template look: purple-gradient SaaS hero, icon-in-a-circle feature cards, uniform card grids with no hierarchy.
- **Don't** fabricate proof (clients, testimonials, metrics) to fill a layout; empty states say so plainly.
