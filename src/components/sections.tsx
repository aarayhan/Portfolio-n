import { ArrowUpRight } from "lucide-react";
import { dict, formatDate, type Lang } from "@/i18n";
import { cn } from "@/lib/utils";
import { getArticles, getProjects, getSite } from "@/lib/content";
import type { Project, Article } from "@/content/types";
import { TechIcon } from "@/components/tech-icon";
import { FadeUp, Parallax, PopItem, RevealOnScroll, Stagger, StaggerItem, WordsReveal } from "@/components/motion";
import { CountUp, Magnetic } from "@/components/interactive";

/* ---------- Kerangka ---------- */

export function Section({
  id,
  tone,
  className,
  children,
}: {
  id?: string;
  tone: "dark" | "light" | "accent";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative z-10 scroll-mt-14",
        tone === "dark" && "bg-black text-bone",
        tone === "light" && "bg-bone text-black",
        tone === "accent" && "bg-accent text-black",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 lg:py-32">{children}</div>
    </section>
  );
}

export function Heading({ children, as: Tag = "h2" }: { children: React.ReactNode; as?: "h1" | "h2" }) {
  return (
    <Tag className="font-display text-[clamp(3.5rem,10vw,8.5rem)] font-black uppercase leading-[0.85]">
      <RevealOnScroll>{children}</RevealOnScroll>
    </Tag>
  );
}

function SectionHead({ title, intro, more }: { title: string; intro?: string; more?: { label: string; href: string } }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <Heading>{title}</Heading>
        {intro && (
          <FadeUp delay={0.15}>
            <p className="mt-5 max-w-[52ch] text-lg opacity-75">{intro}</p>
          </FadeUp>
        )}
      </div>
      {more && (
        <FadeUp delay={0.25} className="self-start lg:self-auto">
        <Magnetic strength={0.25}>
        <a
          href={more.href}
          className="inline-flex items-center gap-1.5 self-start rounded-full border border-current px-5 py-2.5 text-sm font-medium lg:self-auto"
        >
          {more.label} <ArrowUpRight className="size-4" aria-hidden />
        </a>
        </Magnetic>
        </FadeUp>
      )}
    </div>
  );
}

/* ---------- Proyek ---------- */

export function ProjectThumb({ project, className, lang }: { project: Project; className?: string; lang: Lang }) {
  const t = dict[lang].projects;
  return (
    <Parallax morphTarget className={cn("rounded-2xl bg-black transition-transform duration-500 ease-out group-hover:scale-[0.985]", className)}>
      {project.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.thumbnail} alt={`${t.viewOf} ${project.title}`} className="h-full w-full object-cover" />
      ) : (
        <div className="grid h-full w-full place-items-center p-6 text-center text-sm text-muted-dark">
          {t.screenshot} {project.title}
        </div>
      )}
    </Parallax>
  );
}

function ProjectLinks({ project, lang }: { project: Project; lang: Lang }) {
  const t = dict[lang].projects;
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`/${lang}/proyek/${project.slug}`}
        className="inline-flex items-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-bone"
      >
        {t.readCase}
      </a>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-black px-5 py-2.5 text-sm font-medium"
        >
          {t.openDemo} <ArrowUpRight className="size-4" aria-hidden />
        </a>
      )}
    </div>
  );
}

function ProjectFacts({ project, lang }: { project: Project; lang: Lang }) {
  const t = dict[lang].projects;
  return (
    <dl className="grid gap-4 border-t border-line-light pt-6">
      {[
        [t.problem, project.problem],
        [t.solution, project.solution],
        [t.result, project.result],
      ].map(([k, v]) => (
        <div key={k} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4">
          <dt className="text-sm text-muted-light">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* Proyek unggulan: gambar lebar penuh, info di bawah dalam 2 kolom. */
function FeaturedProject({ project, lang }: { project: Project; lang: Lang }) {
  const t = dict[lang].projects;
  return (
    <article>
      <FadeUp>
        <a href={`/${lang}/proyek/${project.slug}`} aria-label={`${t.caseOf} ${project.title}`} data-morph={project.title} className="group block">
          <ProjectThumb project={project} lang={lang} className="aspect-[16/10] sm:aspect-[21/9]" />
        </a>
      </FadeUp>
      <FadeUp delay={0.1} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <p className="text-sm text-muted-light">
            {t.featured}, {project.year}. {project.stack.join(", ")}
          </p>
          <h3 className="mt-3 font-display text-[clamp(3rem,6vw,5rem)] font-black uppercase leading-[0.88]">
            {project.title}
          </h3>
          <p className="mt-4 text-lg">{project.summary}</p>
        </div>
        <div className="grid gap-8">
          <ProjectFacts project={project} lang={lang} />
          <ProjectLinks project={project} lang={lang} />
        </div>
      </FadeUp>
    </article>
  );
}

/* Proyek biasa: gambar dan info berdampingan, sisi gambar selang-seling. */
export function ProjectRow({ project, flip, lang }: { project: Project; flip?: boolean; lang: Lang }) {
  const t = dict[lang].projects;
  return (
    <article className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14">
      <FadeUp className={cn(flip && "lg:order-2")}>
        <a href={`/${lang}/proyek/${project.slug}`} aria-label={`${t.caseOf} ${project.title}`} data-morph={project.title} className="group block">
          <ProjectThumb project={project} lang={lang} className="aspect-[16/10]" />
        </a>
      </FadeUp>
      <FadeUp delay={0.12} className="flex flex-col gap-5">
        <p className="text-sm text-muted-light">
          {project.year}. {project.stack.join(", ")}
        </p>
        <h3 className="font-display text-5xl font-black uppercase leading-[0.9]">{project.title}</h3>
        <p className="text-lg">{project.summary}</p>
        <ProjectLinks project={project} lang={lang} />
      </FadeUp>
    </article>
  );
}

/* Desktop: kartu menempel lalu ditumpuk kartu berikutnya saat discroll. Tinggi kartu dibatasi supaya muat layar. */
function StackCard({ project, index, featured, lang }: { project: Project; index: number; featured: boolean; lang: Lang }) {
  const t = dict[lang].projects;
  return (
    <div className="sticky" style={{ top: `calc(4.75rem + ${index * 1.5}rem)` }}>
      <article className="grid h-[min(78vh,640px)] grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-12 rounded-[2rem] border border-line-light bg-bone p-8 shadow-[0_-24px_60px_-40px_rgba(0,0,0,0.45)]">
        <a
          href={`/${lang}/proyek/${project.slug}`}
          aria-label={`${t.caseOf} ${project.title}`}
          data-morph={project.title}
          className="group block h-full"
        >
          <ProjectThumb project={project} lang={lang} className="h-full" />
        </a>
        <div className="flex min-h-0 flex-col py-2">
          <p className="text-sm text-muted-light">
            {featured ? `${t.featured}, ` : ""}
            {project.year}. {project.stack.join(", ")}
          </p>
          <h3 className="mt-3 font-display text-[clamp(2.75rem,4.5vw,4.25rem)] font-black uppercase leading-[0.9]">
            {project.title}
          </h3>
          <p className="mt-4 text-lg">{project.summary}</p>
          <div className="mt-6">
            <ProjectFacts project={project} lang={lang} />
          </div>
          <div className="mt-auto pt-6">
            <ProjectLinks project={project} lang={lang} />
          </div>
        </div>
      </article>
    </div>
  );
}

export async function Projects({ lang }: { lang: Lang }) {
  const t = dict[lang].projects;
  const projects = await getProjects(lang);
  const [featured, ...rest] = projects;
  return (
    <Section id="proyek" tone="light" className="rounded-t-[2rem] shadow-[0_-12px_40px_rgba(5,10,14,0.12)]">
      <SectionHead
        title={t.title}
        intro={t.intro}
        more={{ label: t.seeAll, href: `/${lang}/proyek` }}
      />
      {/* Mobile dan tablet: alur biasa. */}
      <div className="mt-16 grid gap-24 lg:hidden">
        {featured && <FeaturedProject project={featured} lang={lang} />}
        {rest.slice(0, 2).map((p, i) => (
          <ProjectRow key={p.slug} project={p} flip={i % 2 === 0} lang={lang} />
        ))}
      </div>
      {/* Desktop: kartu bertumpuk. */}
      <div className="mt-16 hidden gap-[14vh] lg:grid">
        {projects.slice(0, 3).map((p, i) => (
          <StackCard key={p.slug} project={p} index={i} featured={i === 0} lang={lang} />
        ))}
      </div>
    </Section>
  );
}

/* ---------- Artikel ---------- */

export function ArticleCard({ article, tone = "dark", lang }: { article: Article; tone?: "dark" | "light"; lang: Lang }) {
  const t = dict[lang].articles;
  return (
    <a
      href={`/${lang}/artikel/${article.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-2xl border p-6 transition-colors sm:p-8",
        tone === "dark" ? "border-line-dark hover:bg-white/[0.03]" : "border-line-light hover:bg-black/[0.03]",
      )}
    >
      <p className={cn("text-sm", tone === "dark" ? "text-muted-dark" : "text-muted-light")}>
        {formatDate(article.date, lang)}. {article.readMinutes} {t.minRead}
      </p>
      <h3 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95]">{article.title}</h3>
      <p className={cn("mt-4", tone === "dark" ? "text-muted-dark" : "text-muted-light")}>{article.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium group-hover:text-accent">
        {t.read} <ArrowUpRight className="size-4" aria-hidden />
      </span>
    </a>
  );
}

export async function Articles({ lang }: { lang: Lang }) {
  const t = dict[lang].articles;
  const articles = await getArticles(lang);
  // Belum ada artikel yang tayang: section tidak ditampilkan sama sekali.
  if (articles.length === 0) return null;
  return (
    <Section id="artikel" tone="dark">
      <SectionHead
        title={t.title}
        intro={t.intro}
        more={{ label: t.seeAll, href: `/${lang}/artikel` }}
      />
      <Stagger className="mt-14 grid gap-5 md:grid-cols-2" gap={0.12}>
        {articles.slice(0, 2).map((a) => (
          <StaggerItem key={a.slug} lift>
            <ArticleCard article={a} lang={lang} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------- Tentang ---------- */

type TimelineEntry = { period: string; title: string; place: string; description: string; url: string | null };

function TimelineItem({ item: e }: { item: TimelineEntry }) {
  return (
    <StaggerItem className="border-b border-line-light py-5">
      <p className="text-sm text-muted-light">{e.period}</p>
      <p className="mt-1 text-xl font-semibold">
        {e.url ? (
          <a href={e.url} target="_blank" rel="noopener noreferrer" className="underline decoration-accent decoration-2 underline-offset-4">
            {e.title}
          </a>
        ) : (
          e.title
        )}
      </p>
      {e.place && <p className="mt-0.5 font-medium">{e.place}</p>}
      {e.description && <p className="mt-1 text-muted-light">{e.description}</p>}
    </StaggerItem>
  );
}

export async function About({ lang }: { lang: Lang }) {
  const t = dict[lang].about;
  const site = await getSite(lang);
  return (
    <Section id="tentang" tone="light" className="border-t border-line-light">
      <p className="text-sm text-muted-light">{t.label}</p>
      <WordsReveal
        text={site.about}
        className="mt-6 max-w-[18ch] font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-black uppercase leading-[0.9]"
      />
      <Stagger as="dl" className="mt-16 grid gap-8 border-y border-line-light py-10 sm:grid-cols-3" gap={0.12}>
        {site.stats.map((st) => (
          <StaggerItem as="div" key={st.label}>
            <dt className="sr-only">{st.label}</dt>
            <dd className="font-display text-[clamp(4rem,8vw,6.5rem)] font-black leading-none">
              <CountUp value={st.value} suffix={st.suffix} />
            </dd>
            <dd className="mt-2 text-muted-light">{st.label}</dd>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <FadeUp>
          <h3 className="text-sm text-muted-light">{site.name}</h3>
          <p className="mt-3 max-w-[56ch] text-lg leading-relaxed">{site.aboutDetail}</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline decoration-accent decoration-2 underline-offset-4">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </FadeUp>
        <div>
          <h3 className="text-sm text-muted-light">{t.education}</h3>
          <Stagger as="ol" className="mt-3 border-t border-line-light" gap={0.12}>
            {site.education.map((e) => (
              <TimelineItem key={e.title + e.period} item={e} />
            ))}
          </Stagger>
          {site.experiences.length > 0 && (
            <>
              <h3 className="mt-12 text-sm text-muted-light">{t.experience}</h3>
              <Stagger as="ol" className="mt-3 border-t border-line-light" gap={0.12}>
                {site.experiences.map((e) => (
                  <TimelineItem key={e.title + e.period} item={e} />
                ))}
              </Stagger>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Sertifikat ---------- */

export async function Certificates({ lang }: { lang: Lang }) {
  const t = dict[lang].certificates;
  const site = await getSite(lang);
  return (
    <Section id="sertifikat" tone="dark">
      <SectionHead title={t.title} intro={t.intro} />
      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
        {site.certificates.map((c) => (
          <StaggerItem key={c.title + c.id} lift className="flex flex-col rounded-2xl border border-line-dark p-6">
            <p className="text-sm text-muted-dark">{[c.issuer, c.year].filter(Boolean).join(", ")}</p>
            <h3 className="mt-3 font-display text-3xl font-bold uppercase leading-[0.95]">{c.title}</h3>
            {c.id && <p className="mt-3 text-sm text-muted-dark">ID {c.id}</p>}
            {c.verifyUrl && c.verifyUrl !== "#" && (
              <a
                href={c.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent"
              >
                {t.verify} <ArrowUpRight className="size-4" aria-hidden />
              </a>
            )}
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------- Keahlian ---------- */

export async function Skills({ lang }: { lang: Lang }) {
  const t = dict[lang].skills;
  const site = await getSite(lang);
  return (
    <Section id="keahlian" tone="light">
      <SectionHead title={t.title} intro={t.intro} />
      <dl className="mt-14 border-t border-line-light">
        {site.skills.map((g) => (
          <FadeUp
            key={g.group}
            className="grid gap-3 border-b border-line-light py-6 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8"
          >
            <dt className="font-display text-3xl font-bold uppercase">{g.group}</dt>
            <dd>
              <Stagger className="flex flex-wrap gap-2" gap={0.04}>
                {g.items.map((it) => (
                  <PopItem
                    key={it}
                    className="inline-flex items-center gap-2 rounded-full border border-line-light py-1.5 pl-3 pr-3.5 text-sm"
                  >
                    <TechIcon name={it} />
                    {it}
                  </PopItem>
                ))}
              </Stagger>
            </dd>
          </FadeUp>
        ))}
      </dl>
    </Section>
  );
}

/* ---------- Kontak ---------- */

export async function Contact({ lang }: { lang: Lang }) {
  const t = dict[lang].contact;
  const site = await getSite(lang);
  const links = [
    { label: "Email", href: `mailto:${site.email}`, value: site.email },
    { label: "WhatsApp", href: site.whatsapp, value: t.message },
    { label: "CV", href: site.cvUrl, value: t.pdf },
    ...site.socials.map((s) => ({ label: s.label, href: s.href, value: t.profile })),
  ];

  return (
    <footer id="kontak" className="relative z-10 scroll-mt-14 border-t border-line-light bg-bone text-black">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-8 lg:pt-32">
        <p className="text-sm font-medium">{site.availability}</p>
        <h2 className="mt-4 font-display text-[clamp(4rem,13vw,11rem)] font-black uppercase leading-[0.82]">
          <RevealOnScroll>{t.line1}</RevealOnScroll>
          <RevealOnScroll>
            <Magnetic strength={0.12}>
              <a href={`mailto:${site.email}`} className="underline decoration-accent decoration-[0.06em] underline-offset-[0.08em] hover:opacity-80">
                {t.line2}
              </a>
            </Magnetic>
          </RevealOnScroll>
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <h3 className="text-sm font-medium">{t.services}</h3>
            <Stagger className="mt-3 border-t border-black/20" gap={0.1}>
              {site.services.map((s) => (
                <StaggerItem key={s.title} className="border-b border-black/20 py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-3xl font-bold uppercase">{s.title}</span>
                    <span className="shrink-0 text-sm">{s.duration}</span>
                  </div>
                  <p className="mt-1 text-black/70">{s.output}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Stagger className="grid gap-px self-start overflow-hidden rounded-2xl bg-black/20 sm:grid-cols-2" gap={0.06}>
            {links.map((l) => (
              <StaggerItem key={l.label} className="bg-bone">
                <a
                  href={l.href}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex h-full flex-col gap-1 p-6 transition-colors hover:bg-black/5"
                >
                  <span className="text-sm text-black/60">{l.label}</span>
                  <span className="text-lg font-medium">{l.value}</span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-black/20 pt-6 text-sm sm:flex-row sm:justify-between">
          <p>
            {new Date().getFullYear()} {site.name}. {site.city}.
          </p>
          <a href="#" className="hover:underline">
            {t.top}
          </a>
        </div>
      </div>
    </footer>
  );
}

/* Footer ringkas untuk halaman daftar dan detail. */
export async function PageFooter({ lang }: { lang: Lang }) {
  const t = dict[lang].contact;
  const site = await getSite(lang);
  return (
    <footer className="bg-black text-bone">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="text-sm text-muted-dark">{site.availability}</p>
          <a href={`/${lang}#kontak`} className="mt-2 inline-block font-display text-5xl font-black uppercase text-accent">
            {t.line2}
          </a>
        </div>
        <p className="text-sm text-muted-dark">
          {new Date().getFullYear()} {site.name}.
        </p>
      </div>
    </footer>
  );
}
