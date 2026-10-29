"use client";

import { useEffect } from "react";

/* Menyamakan atribut lang di <html> dengan bahasa halaman (untuk pembaca layar dan terjemahan otomatis). */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
