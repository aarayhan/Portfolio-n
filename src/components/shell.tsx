"use client";

/*
  Lapisan global yang hidup terus di layout (tidak ikut dimuat ulang saat pindah halaman):
  1. Navigasi client: klik link internal diarahkan ke router.push, jadi tidak reload penuh.
  2. Transisi proyek: link dengan data-morph membesar dari posisi gambarnya sampai penuh layar,
     lalu halaman detail muncul dari baliknya.
*/

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Morph = { rect: DOMRect; title: string; href: string; phase: "grow" | "hold" };

export function Shell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [morph, setMorph] = useState<Morph | null>(null);
  const reduceRef = useRef(reduce);
  reduceRef.current = reduce;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Link ke anchor di halaman yang sama dibiarkan ke browser (scroll halus bawaan).
      if (url.pathname === window.location.pathname && url.hash) return;
      if (url.pathname === window.location.pathname && !url.hash && url.href.endsWith("#")) return;

      e.preventDefault();
      const href = url.pathname + url.search + url.hash;
      const target = a.dataset.morph ? (a.querySelector("[data-morph-target]") ?? a) : null;
      if (target && !reduceRef.current) {
        setMorph({ rect: target.getBoundingClientRect(), title: a.dataset.morph ?? "", href, phase: "grow" });
      } else {
        router.push(href);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  // Halaman baru sudah tampil: lepaskan overlay.
  useEffect(() => {
    setMorph((m) => (m && m.phase === "hold" && m.href.split("#")[0] === pathname ? null : m));
  }, [pathname]);

  return (
    <>
      {children}
      <AnimatePresence>
        {morph && (
          <motion.div
            key="morph"
            className="pointer-events-none fixed z-[90] grid place-items-center overflow-hidden bg-black text-bone"
            initial={{
              top: morph.rect.top,
              left: morph.rect.left,
              width: morph.rect.width,
              height: morph.rect.height,
              borderRadius: 16,
            }}
            animate={{ top: 0, left: 0, width: "100vw", height: "100vh", borderRadius: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.15 } }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
            onAnimationComplete={() => {
              if (morph.phase === "grow") {
                setMorph({ ...morph, phase: "hold" });
                router.push(morph.href);
              }
            }}
          >
            <motion.span
              className="px-6 text-center font-display text-[clamp(2.5rem,7vw,6rem)] font-black uppercase leading-[0.9]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              {morph.title}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
