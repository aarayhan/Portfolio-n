import { notFound } from "next/navigation";
import { isLang } from "@/i18n";
import { getSite } from "@/lib/content";
import { Hero } from "@/components/hero";
import { SiteNav } from "@/components/site-nav";
import { Projects, Articles, About, Certificates, Skills, Contact } from "@/components/sections";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const site = await getSite(lang);

  return (
    <>
      <SiteNav mode="home" lang={lang} site={site} />
      <Hero lang={lang} site={site} />
      <main className="relative z-10">
        <Projects lang={lang} />
        <Articles lang={lang} />
        <About lang={lang} />
        <Certificates lang={lang} />
        <Skills lang={lang} />
      </main>
      <Contact lang={lang} />
    </>
  );
}
