"use client";

import { usePathname } from "next/navigation";
import { dict, langs, type Lang } from "@/i18n";
import { cn } from "@/lib/utils";

/* Tombol ID / EN. Membuka halaman yang sama di bahasa lain, termasuk posisi section (#hash). */
export function LangSwitch({ lang, tone = "light" }: { lang: Lang; tone?: "light" | "dark" }) {
  const pathname = usePathname();

  const hrefFor = (l: Lang) => pathname.replace(/^\/(id|en)(?=\/|$)/, `/${l}`) || `/${l}`;

  return (
    <div
      className={cn(
        "flex items-center rounded-full border p-0.5 text-xs font-semibold",
        tone === "light" ? "border-black/30" : "border-line-dark",
      )}
    >
      {langs.map((l) => {
        const active = l === lang;
        return (
          <a
            key={l}
            href={hrefFor(l)}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            aria-label={active ? dict[l].langName : dict[lang].switchTo}
            onClick={(e) => {
              // Bawa posisi section yang sedang dilihat ke bahasa lain.
              if (window.location.hash) (e.currentTarget as HTMLAnchorElement).href = hrefFor(l) + window.location.hash;
            }}
            className={cn(
              "rounded-full px-2.5 py-1 uppercase transition-colors",
              active
                ? tone === "light"
                  ? "bg-black text-bone"
                  : "bg-bone text-black"
                : tone === "light"
                  ? "text-black/70 hover:text-black"
                  : "text-bone/70 hover:text-bone",
            )}
          >
            {l}
          </a>
        );
      })}
    </div>
  );
}
