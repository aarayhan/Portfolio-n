import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dict, isLang } from "@/i18n";
import { getProjects, getSite } from "@/lib/content";
import { SiteNav } from "@/components/site-nav";
import { Heading, PageFooter, ProjectRow } from "@/components/sections";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: `${dict[lang].projects.allTitle} | ${(await getSite(lang)).name}`,
    description: dict[lang].projects.intro,
    alternates: { languages: { id: "/id/proyek", en: "/en/proyek" } },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = dict[lang];
  const [projects, site] = await Promise.all([getProjects(lang), getSite(lang)]);

  return (
    <>
      <SiteNav mode="page" lang={lang} site={site} />
      <main className="bg-bone text-black">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-8 lg:pb-32 lg:pt-40">
          <a href={`/${lang}`} className="text-sm text-muted-light hover:text-black">
            {t.page.backHome}
          </a>
          <div className="mt-6">
            <Heading as="h1">{t.projects.allTitle}</Heading>
          </div>
          <p className="mt-5 max-w-[52ch] text-lg text-muted-light">{t.projects.allIntro(projects.length)}</p>
          <div className="mt-16 grid gap-24">
            {projects.map((p, i) => (
              <ProjectRow key={p.slug} project={p} flip={i % 2 === 1} lang={lang} />
            ))}
          </div>
        </div>
      </main>
      <PageFooter lang={lang} />
    </>
  );
}
