import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { dict, isLang, langs } from "@/i18n";
import { getContent, getProject, getProjects, getSite } from "@/lib/content";
import { SiteNav } from "@/components/site-nav";
import { RevealOnScroll } from "@/components/motion";
import { ReadingProgress } from "@/components/interactive";
import { PageFooter, ProjectThumb } from "@/components/sections";
import { SectionsView, Toc } from "@/components/blocks";

type Props = { params: Promise<{ lang: string; slug: string }> };

// Proyek baru dari dashboard dibuat saat pertama dibuka (dynamicParams true), lalu dicache.
export const dynamicParams = true;

export async function generateStaticParams() {
  const { projects } = await getContent();
  return langs.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const p = await getProject(slug, lang);
  if (!p) return {};
  return {
    title: `${p.title} | ${(await getSite(lang)).name}`,
    description: p.summary,
    alternates: { languages: { id: `/id/proyek/${slug}`, en: `/en/proyek/${slug}` } },
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const project = await getProject(slug, lang);
  if (!project) notFound();
  const t = dict[lang].projects;

  const [projects, site] = await Promise.all([getProjects(lang), getSite(lang)]);
  const idx = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  const prev = n > 2 ? projects[(idx - 1 + n) % n] : null;
  const next = n > 1 ? projects[(idx + 1) % n] : null;

  return (
    <>
      <ReadingProgress />
      <SiteNav mode="page" lang={lang} site={site} />

      <header className="bg-black text-bone">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-32 sm:px-8 lg:pt-40">
          <a href={`/${lang}/proyek`} className="text-sm text-muted-dark hover:text-bone">
            {t.allTitle}
          </a>
          <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(3.5rem,9vw,8rem)] font-black uppercase leading-[0.86]">
            <RevealOnScroll>{project.title}</RevealOnScroll>
          </h1>
          <p className="mt-6 max-w-[56ch] text-xl text-muted-dark">{project.summary}</p>

          <dl className="mt-10 grid gap-6 border-t border-line-dark pt-6 sm:grid-cols-3">
            <div>
              <dt className="text-sm text-muted-dark">{t.role}</dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-dark">{t.year}</dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-dark">{t.stack}</dt>
              <dd className="mt-1">{project.stack.join(", ")}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black"
              >
                {t.openDemo} <ArrowUpRight className="size-4" aria-hidden />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line-dark px-5 py-2.5 text-sm font-medium"
              >
                {t.viewCode}
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="bg-bone text-black">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:py-24">
          <ProjectThumb project={project} lang={lang} className="aspect-[16/9]" />

          <div className="mt-16 grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Toc sections={project.sections} lang={lang} />
            </aside>
            <SectionsView sections={project.sections} lang={lang} />
          </div>

          {(prev || next) && (
            <nav aria-label={t.other} className="mt-24 grid gap-8 border-t border-line-light pt-8 sm:grid-cols-2 sm:gap-10">
              {prev ? (
                <a href={`/${lang}/proyek/${prev.slug}`} className="group">
                  <span className="text-sm text-muted-light">{t.prev}</span>
                  <span className="mt-2 block font-display text-[clamp(2.25rem,4vw,3.5rem)] font-black uppercase leading-[0.92] group-hover:text-accent">
                    {prev.title}
                  </span>
                </a>
              ) : (
                <span aria-hidden />
              )}
              {next && (
                <a href={`/${lang}/proyek/${next.slug}`} className="group sm:text-right">
                  <span className="text-sm text-muted-light">{t.next}</span>
                  <span className="mt-2 block font-display text-[clamp(2.25rem,4vw,3.5rem)] font-black uppercase leading-[0.92] group-hover:text-accent">
                    {next.title}
                  </span>
                </a>
              )}
            </nav>
          )}
        </div>
      </main>

      <PageFooter lang={lang} />
    </>
  );
}
