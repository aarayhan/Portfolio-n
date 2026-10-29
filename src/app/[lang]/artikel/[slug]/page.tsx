import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dict, formatDate, isLang, langs } from "@/i18n";
import { getArticle, getContent, getSite } from "@/lib/content";
import { SiteNav } from "@/components/site-nav";
import { RevealOnScroll } from "@/components/motion";
import { ReadingProgress } from "@/components/interactive";
import { PageFooter } from "@/components/sections";
import { SectionsView } from "@/components/blocks";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  const { articles } = await getContent();
  return langs.flatMap((lang) => articles.map((a) => ({ lang, slug: a.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const a = await getArticle(slug, lang);
  if (!a) return {};
  return {
    title: `${a.title} | ${(await getSite(lang)).name}`,
    description: a.summary,
    alternates: { languages: { id: `/id/artikel/${slug}`, en: `/en/artikel/${slug}` } },
  };
}

export default async function ArticleDetail({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const article = await getArticle(slug, lang);
  if (!article) notFound();
  const t = dict[lang].articles;
  const site = await getSite(lang);

  return (
    <>
      <ReadingProgress />
      <SiteNav mode="page" lang={lang} site={site} />
      <header className="bg-black text-bone">
        <div className="mx-auto max-w-4xl px-4 pb-14 pt-32 sm:px-8 lg:pt-40">
          <a href={`/${lang}/artikel`} className="text-sm text-muted-dark hover:text-bone">
            {t.allTitle}
          </a>
          <p className="mt-8 text-sm text-muted-dark">
            {formatDate(article.date, lang)}. {article.readMinutes} {t.minRead}
          </p>
          <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.9]">
            <RevealOnScroll>{article.title}</RevealOnScroll>
          </h1>
          <p className="mt-6 max-w-[56ch] text-xl text-muted-dark">{article.summary}</p>
        </div>
      </header>
      <main className="bg-bone text-black">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8 lg:py-24">
          {article.cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={article.cover} alt="" className="mb-14 w-full rounded-2xl" />
          )}
          <SectionsView sections={article.sections} lang={lang} />
          <a
            href={`/${lang}/artikel`}
            className="mt-20 inline-block text-sm font-medium underline decoration-accent decoration-2 underline-offset-4"
          >
            {t.back}
          </a>
        </div>
      </main>
      <PageFooter lang={lang} />
    </>
  );
}
