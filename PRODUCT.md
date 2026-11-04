# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: internship hosts (companies and teams reviewing PKL candidates for March 2027). They skim to judge whether the candidate can ship real work, then contact him or download the CV.

Secondary: freelance clients who want a developer for a web system.

## Product Purpose

Personal portfolio of Muhammad Yahya Ar Rayhan ("Raey"), web developer and Software Engineering student at SMK IDN Boarding School, Malang, Indonesia. It shows his projects, articles, certificates and CV so a visitor can decide to contact him. Success: an internship host reaches out via email or WhatsApp, or downloads the CV.

## Positioning

Real systems in daily use, backed by testing and security discipline. GrandKos runs his family's boarding house every day, and MayKos is a multi-tenant SaaS he founded. Automated tests (400+ across three projects) and database-level tenant isolation (PostgreSQL Row Level Security) are the proof behind the claim, not the lead. Real use comes first.

## Operating Context

- Content lives in Supabase and is edited through `/admin`; `src/content/seed.ts` is the fallback when Supabase env is empty.
- Sections on the home page: projects, articles, about, certificates, contact. Articles are hidden from nav when none are published.
- Project pages carry problem, solution, result, role and a markdown body.

## Capabilities and Constraints

- Next.js 16 / React 19, Tailwind 4, framer-motion, Supabase.
- Bilingual: Indonesian (`id`) and English (`en`) on every surface, with a language switch. Layouts must survive the longer string in either language.
- Content is admin-editable, so design cannot depend on hard-coded copy lengths, item counts, or the presence of optional fields (thumbnail, live URL, repo URL).
- Several repositories are private (GrandKos, MayKos) because they hold real tenant data or are in development; some projects have no live URL or thumbnail.
- Stack focus: Laravel, Filament, Livewire, PostgreSQL.

## Brand Commitments

- Name: Muhammad Yahya Ar Rayhan, nickname Raey.
- The profile photo (`/hero.png`) stays in use.
- Fonts and the hero treatment are open to change.

## Evidence on Hand

- Eight projects in `seed.ts`: MayKos, GrandKos, PayWind, PomeloO, Bibliotheca, Filmer, PadViolett, Trackify. Each has stack, year, role and results. Thumbnails exist for PayWind, PomeloO, Bibliotheca, PadViolett and Trackify (`public/projects/`); MayKos, GrandKos and Filmer have none. Only PomeloO has a live URL.
- Two articles (on relearning web basics, and on building his first boarding house system), plus education, experience and organization entries.
- Six course certificates (web, JavaScript, PHP and SQL courses).
- Services offered: landing page, custom system, website fixes.
- CV PDFs in Indonesian and English at `/cv/`.
- GitHub profile (github.com/aarayhan).
- Stats: 200+ commits across web projects, 400 automated tests across three projects, 8 projects.
- No testimonials, client logos or press exist. Do not fabricate them.

## Product Principles

1. Show real work over claims: a running system outranks a described skill.
2. Make the contact path obvious, because an internship host decides quickly.
3. Never invent proof: no fake clients, testimonials, metrics or live links.
4. Both languages are first-class, not a translation afterthought.
5. Content owners change copy freely; the design must hold up when they do.
