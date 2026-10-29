"use client";

/*
  Command palette: Ctrl + K (atau Cmd + K) dari halaman mana pun.
  Bisa dibuka juga lewat event "open-palette" (tombol di navigasi).
*/

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { dict, type Lang } from "@/i18n";

export type PaletteItem = {
  group: string;
  label: string;
  hint?: string;
  href?: string;
  external?: boolean;
  copy?: string;
};

export function openPalette() {
  window.dispatchEvent(new Event("open-palette"));
}

export function CommandPalette({ items, lang }: { items: PaletteItem[]; lang: Lang }) {
  const t = dict[lang].palette;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActive(0);
      setCopied(null);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      lastFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const run = async (item: PaletteItem) => {
    if (item.copy) {
      try {
        await navigator.clipboard.writeText(item.copy);
        setCopied(item.label);
        setTimeout(() => setOpen(false), 700);
      } catch {
        setCopied(null);
      }
      return;
    }
    setOpen(false);
    if (!item.href) return;
    if (item.external) window.open(item.href, "_blank", "noopener,noreferrer");
    else router.push(item.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      run(results[active]);
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.dialog}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-dark bg-black text-bone shadow-2xl"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line-dark px-4">
              <Search className="size-4 text-muted-dark" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.placeholder}
                aria-label={t.search}
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `palette-${active}` : undefined}
                className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-dark focus-visible:outline-none"
              />
              <kbd className="rounded-md border border-line-dark px-1.5 py-0.5 text-xs text-muted-dark">Esc</kbd>
            </div>

            <ul id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-muted-dark">
                  {t.empty(query)}
                </li>
              )}
              {results.map((item, i) => {
                const showGroup = item.group !== lastGroup;
                lastGroup = item.group;
                return (
                  <li key={item.group + item.label} role="presentation">
                    {showGroup && <p className="px-3 pb-1 pt-3 text-xs text-muted-dark">{item.group}</p>}
                    <div
                      id={`palette-${i}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => run(item)}
                      className={
                        "relative flex cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-sm " +
                        (i === active ? "text-black" : "")
                      }
                    >
                      {i === active && (
                        <motion.span
                          layoutId="palette-active"
                          className="absolute inset-0 rounded-xl bg-accent"
                          transition={{ type: "spring", stiffness: 500, damping: 38 }}
                        />
                      )}
                      <span className="relative">{copied === item.label ? t.copied : item.label}</span>
                      {item.hint && (
                        <span className={"relative truncate text-xs " + (i === active ? "text-black/70" : "text-muted-dark")}>
                          {item.hint}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex gap-4 border-t border-line-dark px-4 py-2.5 text-xs text-muted-dark">
              <span>{t.hintMove}</span>
              <span>{t.hintEnter}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
