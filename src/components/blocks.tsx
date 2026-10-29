import type { Block, Section } from "@/content/types";
import { CopyButton } from "@/components/copy-button";
import { FadeUp } from "@/components/motion";
import { dict, type Lang } from "@/i18n";

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* Format di dalam teks: **tebal**, `kode`, [teks](https://link). Link hanya http(s), mailto, atau internal. */
function Inline({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const k = m.index;
    if (m[1]) parts.push(<strong key={k}>{m[1]}</strong>);
    else if (m[2]) parts.push(<code key={k} className="rounded bg-black/[0.06] px-1.5 py-0.5 text-[0.9em]">{m[2]}</code>);
    else if (/^(https?:|mailto:|\/|#)/.test(m[4])) {
      const external = /^https?:/.test(m[4]);
      parts.push(
        <a key={k} href={m[4]} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="underline decoration-accent decoration-2 underline-offset-4">
          {m[3]}
        </a>,
      );
    } else parts.push(m[0]);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function BlockView({ block, lang }: { block: Block; lang: Lang }) {
  switch (block.type) {
    case "p":
      return <p className="leading-relaxed"><Inline text={block.text} /></p>;
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className={block.ordered ? "list-decimal space-y-2 pl-6" : "list-disc space-y-2 pl-6"}>
          {block.items.map((it, i) => (
            <li key={i} className="pl-1 leading-relaxed">
              <Inline text={it} />
            </li>
          ))}
        </Tag>
      );
    }
    case "code":
      return (
        <figure className="overflow-hidden rounded-xl bg-black text-bone">
          <div className="flex items-center justify-between gap-4 border-b border-line-dark px-4 py-2">
            <figcaption className="truncate text-xs text-muted-dark">
              {block.caption ?? block.lang}
            </figcaption>
            <CopyButton text={block.code} labels={dict[lang].code} />
          </div>
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
            <code>{block.code}</code>
          </pre>
        </figure>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-line-light">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-black/[0.04]">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-line-light">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 align-top">
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "image":
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} className="w-full rounded-xl" loading="lazy" />
          {block.caption && (
            <figcaption className="mt-2 text-sm text-muted-light">{block.caption}</figcaption>
          )}
        </figure>
      );
    case "note":
      return (
        <p className="rounded-xl border-l-4 border-accent bg-accent/10 px-4 py-3 text-sm">
          <Inline text={block.text} />
        </p>
      );
  }
}

function StaticWrap({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

/* Isi bertahap. Tiap bagian diberi nomor karena memang berurutan. */
export function SectionsView({
  sections,
  lang,
  animate = true,
}: {
  sections: Section[];
  lang: Lang;
  animate?: boolean; // false untuk pratinjau di dashboard
}) {
  const Wrap = animate ? FadeUp : StaticWrap;
  // Teks sebelum judul pertama (## ...) tampil tanpa judul dan tanpa nomor.
  let n = 0;
  return (
    <div className="grid gap-14">
      {sections.map((s, i) => {
        const num = s.title ? ++n : 0;
        return (
          <Wrap key={i}>
            <section id={s.title ? slugify(s.title) : undefined} className="scroll-mt-24">
              {s.title && (
                <h2 className="mb-6 flex items-baseline gap-4 font-display text-4xl font-black uppercase leading-none">
                  <span className="text-accent">{num}</span>
                  {s.title}
                </h2>
              )}
              <div className="grid max-w-[68ch] gap-5">
                {s.blocks.map((b, j) => (
                  <BlockView key={j} block={b} lang={lang} />
                ))}
              </div>
            </section>
          </Wrap>
        );
      })}
    </div>
  );
}

export function Toc({ sections, lang }: { sections: Section[]; lang: Lang }) {
  const titled = sections.filter((s) => s.title);
  if (titled.length === 0) return null;
  return (
    <nav aria-label={dict[lang].page.toc} className="text-sm">
      <p className="text-muted-light">{dict[lang].page.toc}</p>
      <ol className="mt-3 grid gap-2">
        {titled.map((s, i) => (
          <li key={i}>
            <a href={`#${slugify(s.title)}`} className="flex gap-2 hover:text-accent">
              <span className="text-muted-light">{i + 1}.</span>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
