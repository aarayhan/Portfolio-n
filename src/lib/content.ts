import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Lang } from "@/i18n";
import type { Article, Project } from "@/content/types";
import type { ContentBundle } from "@/lib/content-types";
import { seed } from "@/content/seed";
import { parseMarkdown, readMinutes } from "@/lib/markdown";
import { supabaseKey, supabaseUrl } from "@/lib/supabase/env";

/*
  Satu pintu untuk semua isi web.
  - Supabase tersambung (env terisi): data diambil dari database, disimpan di cache Next.js
    dengan tag "content". Dashboard memanggil /api/revalidate setelah menyimpan, jadi perubahan langsung tampil.
  - Env kosong: pakai src/content/seed.ts, supaya web tetap jalan sebelum Supabase disiapkan.
*/

export const CONTENT_TAG = "content";

const url = supabaseUrl;
// Nama baru Supabase (PUBLISHABLE_KEY) atau nama lama (ANON_KEY), dua-duanya diterima.
const key = supabaseKey;
export const usingDatabase = Boolean(url && key);

async function loadFromDatabase(): Promise<ContentBundle> {
  const db = createClient(url!, key!, {
    auth: { persistSession: false },
    global: {
      // Setiap request ke Supabase dicache dan diberi tag, supaya bisa dibuang sekaligus saat ada perubahan.
      fetch: (input, init) => fetch(input, { ...init, next: { tags: [CONTENT_TAG], revalidate: 3600 } }),
    },
  });

  const [profile, projects, articles, experiences, certificates, skillGroups, services] = await Promise.all([
    db.from("profile").select("*").eq("id", 1).maybeSingle(),
    db.from("projects").select("*").eq("published", true).order("sort"),
    db.from("articles").select("*").eq("published", true).order("date", { ascending: false }),
    db.from("experiences").select("*").order("sort"),
    db.from("certificates").select("*").order("sort"),
    db.from("skill_groups").select("*").order("sort"),
    db.from("services").select("*").order("sort"),
  ]);

  const failed = [profile, projects, articles, experiences, certificates, skillGroups, services].find((r) => r.error);
  // Lempar error, jangan diam-diam pakai seed: dengan ISR, halaman lama tetap tampil sampai database pulih.
  if (failed?.error) throw new Error(`Gagal mengambil isi dari Supabase: ${failed.error.message}`);

  return {
    profile: profile.data ?? seed.profile,
    projects: projects.data ?? [],
    articles: articles.data ?? [],
    experiences: experiences.data ?? [],
    certificates: certificates.data ?? [],
    skillGroups: skillGroups.data ?? [],
    services: services.data ?? [],
  };
}

export async function getContent(): Promise<ContentBundle> {
  if (usingDatabase) return loadFromDatabase();
  // Seed diperlakukan sama dengan database: draft tidak tampil.
  return {
    ...seed,
    projects: seed.projects.filter((p) => p.published).sort((a, b) => a.sort - b.sort),
    articles: seed.articles.filter((a) => a.published),
  };
}

/* ---------- Bentuk siap pakai per bahasa ---------- */

export async function getSite(lang: Lang) {
  const { profile: p, experiences, certificates, skillGroups, services, articles } = await getContent();
  const t = p.i18n[lang];
  const exp = experiences.map((e) => ({ kind: e.kind, url: e.url, ...e.i18n[lang] }));
  return {
    name: p.name,
    nickname: p.nickname,
    shortName: p.short_name,
    heroName: { lead: p.hero_lead, lines: p.hero_lines },
    role: p.role,
    city: p.city,
    timezone: p.timezone,
    email: p.email,
    whatsapp: p.whatsapp,
    // CV per bahasa (i18n.<lang>.cv_url), kalau kosong pakai CV umum.
    cvUrl: t.cv_url || p.cv_url,
    hasArticles: p.show_articles !== false && articles.length > 0,
    photo: p.photo_url,
    socials: p.socials,
    stats: p.stats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label[lang] })),
    availability: t.availability,
    intro: t.intro,
    about: t.about,
    aboutDetail: t.about_detail,
    education: exp.filter((e) => e.kind === "education"),
    experiences: exp.filter((e) => e.kind !== "education"),
    certificates: certificates.map((c) => ({
      title: c.title,
      issuer: c.issuer,
      year: c.year,
      id: c.credential_id,
      verifyUrl: c.verify_url,
      fileUrl: c.file_url || null,
    })),
    skills: skillGroups.map((g) => ({ group: g.name, items: g.items })),
    services: services.map((s) => s.i18n[lang]),
  };
}

export type Site = Awaited<ReturnType<typeof getSite>>;

export async function getProjects(lang: Lang): Promise<Project[]> {
  const { projects } = await getContent();
  return projects.map((p) => {
    const { body, ...t } = p.i18n[lang];
    return {
      slug: p.slug,
      stack: p.stack,
      year: p.year,
      thumbnail: p.thumbnail ?? undefined,
      liveUrl: p.live_url ?? undefined,
      repoUrl: p.repo_url ?? undefined,
      ...t,
      sections: parseMarkdown(body),
    };
  });
}

export async function getProject(slug: string, lang: Lang) {
  return (await getProjects(lang)).find((p) => p.slug === slug);
}

export async function getArticles(lang: Lang): Promise<Article[]> {
  const { articles, profile } = await getContent();
  // Saklar "Tampilkan artikel" di Profil. Kalau mati, semua artikel dianggap tidak ada:
  // section, menu, command palette, dan halaman /artikel ikut hilang.
  if (profile.show_articles === false) return [];
  return [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((a) => {
      const t = a.i18n[lang];
      return {
        slug: a.slug,
        date: a.date,
        cover: a.cover ?? undefined,
        readMinutes: readMinutes(t.body),
        title: t.title,
        summary: t.summary,
        sections: parseMarkdown(t.body),
      };
    });
}

export async function getArticle(slug: string, lang: Lang) {
  return (await getArticles(lang)).find((a) => a.slug === slug);
}
