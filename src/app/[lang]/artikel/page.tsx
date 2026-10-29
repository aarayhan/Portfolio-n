import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dict, isLang } from "@/i18n";
import { getArticles, getSite } from "@/lib/content";
import { SiteNav } from "@/components/site-nav";
import { ArticleCard, Heading, PageFooter } from "@/components/sections";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: `${dict[lang].articles.allTitle} | ${(await getSite(lang)).name}`,
    description: dict[lang].articles.intro,
    alternates: { languages: { id: "/id/artikel", en: "/en/artikel" } },
  };
}

export default async function ArticlesPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = dict[lang];
  const [articles, site] = await Promise.all([getArticles(lang), getSite(lang)]);

  return (
    <>
      <SiteNav mode="page" lang={lang} site={site} />
      <main className="bg-black text-bone">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-8 lg:pb-32 lg:pt-40">
          <a href={`/${lang}`} className="text-sm text-muted-dark hover:text-bone">
            {t.page.backHome}
          </a>
          <div className="mt-6">
            <Heading as="h1">{t.articles.allTitle}</Heading>
          </div>
          <ul className="mt-16 grid gap-5 md:grid-cols-2">
            {articles.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} lang={lang} />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <PageFooter lang={lang} />
    </>
  );
}
