// Isi profil sekarang ada di database (lihat src/lib/content.ts). File ini hanya menyimpan struktur navigasi.

import type { Lang } from "@/i18n";

/* Link bagian beranda. Selalu diawali bahasa, supaya bisa dipakai dari halaman mana pun. */
export function navItems(
  lang: Lang,
  labels: { projects: string; articles: string; about: string; certificates: string; contact: string },
  opts: { articles?: boolean } = {},
) {
  // Artikel disembunyikan dari menu kalau belum ada artikel yang tayang.
  const showArticles = opts.articles ?? true;
  return [
    { label: labels.projects, href: `/${lang}#proyek` },
    ...(showArticles ? [{ label: labels.articles, href: `/${lang}#artikel` }] : []),
    { label: labels.about, href: `/${lang}#tentang` },
    { label: labels.certificates, href: `/${lang}#sertifikat` },
    { label: labels.contact, href: `/${lang}#kontak` },
  ];
}
