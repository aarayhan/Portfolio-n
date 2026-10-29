import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dict, isLang, langs, type Lang } from "@/i18n";
import { navItems } from "@/lib/site";
import { getArticles, getProjects, getSite } from "@/lib/content";
import { CommandPalette, type PaletteItem } from "@/components/command-palette";
import { HtmlLang } from "@/components/html-lang";

// Hanya /id dan /en yang dibuat. Bahasa lain jadi 404 lewat isLang di bawah.
// dynamicParams tidak dimatikan di sini, karena pengaturan layout menurun ke halaman proyek dan artikel,
// dan proyek baru dari dashboard harus bisa dibuka tanpa build ulang.

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const site = await getSite(lang);
  return {
    title: `${site.name} | ${site.role}`,
    description: site.intro,
    alternates: { languages: { id: "/id", en: "/en" } },
  };
}

async function paletteItems(lang: Lang): Promise<PaletteItem[]> {
  const t = dict[lang];
  const [site, projects, articles] = await Promise.all([getSite(lang), getProjects(lang), getArticles(lang)]);
  return [
    { group: t.palette.pages, label: t.nav.home, href: `/${lang}` },
    ...navItems(lang, t.nav, { articles: site.hasArticles }).map((n) => ({ group: t.palette.pages, label: n.label, href: n.href })),
    { group: t.palette.pages, label: t.nav.skills, href: `/${lang}#keahlian` },
    { group: t.projects.title, label: t.projects.allTitle, href: `/${lang}/proyek` },
    ...projects.map((p) => ({
      group: t.projects.title,
      label: p.title,
      hint: p.stack.join(", "),
      href: `/${lang}/proyek/${p.slug}`,
    })),
    ...(articles.length ? [{ group: t.articles.title, label: t.articles.allTitle, href: `/${lang}/artikel` }] : []),
    ...articles.map((a) => ({ group: t.articles.title, label: a.title, href: `/${lang}/artikel/${a.slug}` })),
    { group: t.palette.actions, label: t.palette.copyEmail, hint: site.email, copy: site.email },
    { group: t.palette.actions, label: t.hero.cv, href: site.cvUrl, external: true },
    ...site.socials.map((s) => ({
      group: t.palette.actions,
      label: `${t.palette.open} ${s.label}`,
      href: s.href,
      external: true,
    })),
  ];
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      <HtmlLang lang={lang} />
      {children}
      <CommandPalette items={await paletteItems(lang)} lang={lang} />
    </>
  );
}
