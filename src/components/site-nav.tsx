"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { dict, type Lang } from "@/i18n";
import { navItems } from "@/lib/site";
import type { Site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "@/components/motion";
import { openPalette } from "@/components/command-palette";
import { LangSwitch } from "@/components/lang-switch";

/*
  Navigasi sticky.
  mode "home": muncul setelah hero hampir lewat (hero punya navigasinya sendiri).
  mode "page": selalu tampil (halaman daftar dan detail).
*/
export function SiteNav({
  mode,
  lang,
  site,
}: {
  mode: "home" | "page";
  lang: Lang;
  site: Pick<Site, "shortName" | "cvUrl" | "socials" | "hasArticles">;
}) {
  const [visible, setVisible] = useState(mode === "page");
  const [open, setOpen] = useState(false);
  const t = dict[lang];
  const nav = navItems(lang, t.nav, { articles: site.hasArticles });

  useEffect(() => {
    if (mode === "page") return;
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mode]);

  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300 motion-reduce:transition-none",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
      // Saat tersembunyi, keluarkan dari urutan tab.
      inert={!visible}
    >
      <nav aria-label={t.nav.mainNav} className="border-b border-line-dark bg-black/90 text-bone backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
          <a href={`/${lang}`} className="font-display text-2xl font-black uppercase leading-none">
            {site.shortName}
            <span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-7 text-sm md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-bone/75 transition-colors hover:text-bone">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openPalette}
              aria-label={t.nav.search}
              className="flex items-center gap-2 rounded-full border border-line-dark px-3 py-1.5 text-sm text-bone/75 hover:text-bone"
            >
              <Search className="size-3.5" aria-hidden />
              <kbd className="hidden font-sans text-xs lg:inline">Ctrl K</kbd>
            </button>
            <LangSwitch lang={lang} tone="dark" />
            <a
              href={site.cvUrl}
              className="hidden rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-black sm:block"
            >
              {t.hero.cv}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-mobile"
              className="rounded-full border border-line-dark px-4 py-1.5 text-sm md:hidden"
            >
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="nav-mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              className="overflow-hidden border-t border-line-dark md:hidden"
            >
              <ul className="mx-auto grid max-w-7xl gap-1 px-4 py-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-2.5 font-display text-3xl font-bold uppercase"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="mt-2 flex flex-wrap gap-x-5 gap-y-2 border-t border-line-dark pt-4 text-sm text-muted-dark">
                  <a href={site.cvUrl} className="text-accent">
                    {t.hero.cv}
                  </a>
                  {site.socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  ))}
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
