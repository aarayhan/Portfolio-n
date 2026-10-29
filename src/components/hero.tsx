"use client";

import { useState } from "react";
import { dict, type Lang } from "@/i18n";
import { navItems } from "@/lib/site";
import type { Site } from "@/lib/content";
import { LocalTime } from "@/components/local-time";
import { AnimatePresence, EnterOnLoad, RiseLine, motion } from "@/components/motion";
import { Magnetic } from "@/components/interactive";
import { LangSwitch } from "@/components/lang-switch";

export function Hero({ lang, site }: { lang: Lang; site: Site }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict[lang];
  const nav = navItems(lang, t.nav, { articles: site.hasArticles });

  return (
    // Sticky: section berikutnya naik menutupi hero saat discroll.
    <header className="sticky top-0 z-0 flex h-[100svh] min-h-[600px] flex-col overflow-hidden bg-bone text-black">
      {/* Foto */}
      <EnterOnLoad from="right" delay={0.15} className="absolute inset-x-0 top-14 h-[47%] [mask-image:linear-gradient(to_bottom,black_70%,transparent)] md:left-auto md:right-0 md:w-[58%] md:h-[56%] lg:inset-x-auto lg:right-0 lg:top-[9%] lg:h-[140%] lg:w-[48%] lg:[mask-image:none]">
        {site.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={site.photo}
            alt={`${t.hero.photoAlt} ${site.name}`}
            className="h-full w-full object-cover object-top lg:object-contain"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-black/10 text-sm text-black/60">
            Foto: unggah lewat dashboard /admin
          </div>
        )}
      </EnterOnLoad>

      {/* Baris atas */}
      <nav
        aria-label={t.nav.mainNav}
        className="relative z-10 flex items-start justify-between gap-4 px-4 pt-5 text-sm sm:px-8"
      >
        <div className="grid gap-0.5">
          <span className="text-black/60">{t.hero.basedIn}</span>
          <span className="font-medium">{site.city}</span>
        </div>
        <div className="hidden gap-0.5 sm:grid">
          <span className="text-black/60">{t.hero.localTime}</span>
          <span className="font-medium">
            <LocalTime timezone={site.timezone} />
          </span>
        </div>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 font-medium md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:underline underline-offset-4">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <LangSwitch lang={lang} />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="rounded-full bg-black px-4 py-2 font-medium text-bone md:hidden"
          >
            {menuOpen ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            id="menu-mobile"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-x-4 top-20 z-20 grid origin-top gap-1 rounded-2xl bg-black p-3 text-bone md:hidden"
          >
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-lg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Nama */}
      <h1
        aria-label={site.name}
        className="relative z-10 mt-auto self-start px-4 font-display font-black uppercase sm:px-8"
      >
        <RiseLine className="text-[clamp(1.75rem,4.5vw,4rem)] font-bold leading-none">
          {site.heroName.lead}
        </RiseLine>
        {site.heroName.lines.map((line, i) => (
          <RiseLine
            key={line}
            delay={0.12 + i * 0.11}
            // Ukuran ikut lebar DAN tinggi layar (svh), supaya di laptop pendek nama tidak menabrak teks intro.
            className="text-[26vw] leading-[0.8] tracking-[-0.01em] sm:text-[clamp(4rem,min(16.5vw,25svh),16rem)]"
          >
            {line}
          </RiseLine>
        ))}
      </h1>

      {/* Baris bawah */}
      {/* Di desktop lebar (lg) tombol pindah ke bawah teks di kiri, supaya tidak menumpuk di atas foto. */}
      <div className="relative z-10 flex flex-col gap-5 px-4 pb-6 pt-6 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:flex-col lg:items-start lg:justify-start">
        <EnterOnLoad delay={0.5} className="max-w-sm">
          <p className="text-sm font-medium">
            {site.role}. {site.availability}.
          </p>
          <p className="mt-2 text-black/75">{site.intro}</p>
        </EnterOnLoad>
        <EnterOnLoad delay={0.6} className="flex flex-wrap gap-3 self-start sm:self-auto lg:self-start">
          <Magnetic>
            <a
              href={site.cvUrl}
              className="block rounded-full border border-black px-6 py-3.5 font-medium transition-colors hover:bg-black/5"
            >
              {t.hero.cv}
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#proyek" className="block rounded-full bg-black px-6 py-3.5 font-medium text-bone">
              {t.hero.seeProjects}
            </a>
          </Magnetic>
        </EnterOnLoad>
      </div>
    </header>
  );
}
