import type { Lang } from "@/i18n";

/*
  Bentuk data persis seperti baris di database (Supabase).
  Teks yang bergantung bahasa disimpan di kolom i18n: { id: {...}, en: {...} }.
  Isi detail proyek dan artikel ditulis dalam Markdown (kolom body), lihat src/lib/markdown.ts.
*/

export type L<T> = Record<Lang, T>;

export type Social = { label: string; href: string };
export type Stat = { value: number; suffix: string; label: L<string> };

export type ProfileRow = {
  id: number; // selalu 1, hanya ada satu profil
  name: string;
  nickname: string;
  short_name: string;
  hero_lead: string;
  hero_lines: string[];
  role: string;
  city: string;
  timezone: string;
  email: string;
  whatsapp: string;
  cv_url: string;
  photo_url: string | null;
  socials: Social[];
  stats: Stat[];
  show_articles?: boolean; // saklar tampil/sembunyikan semua artikel
  i18n: L<{ availability: string; intro: string; about: string; about_detail: string; cv_url?: string }>;
};

export type ProjectRow = {
  id: string;
  slug: string;
  sort: number;
  published: boolean;
  stack: string[];
  year: string;
  thumbnail: string | null;
  live_url: string | null;
  repo_url: string | null;
  i18n: L<{ title: string; summary: string; problem: string; solution: string; result: string; role: string; body: string }>;
};

export type ArticleRow = {
  id: string;
  slug: string;
  published: boolean;
  date: string; // YYYY-MM-DD
  cover: string | null;
  i18n: L<{ title: string; summary: string; body: string }>;
};

export const experienceKinds = ["education", "work", "organization", "achievement"] as const;
export type ExperienceKind = (typeof experienceKinds)[number];

export type ExperienceRow = {
  id: string;
  sort: number;
  kind: ExperienceKind;
  url: string | null;
  i18n: L<{ period: string; title: string; place: string; description: string }>;
};

export type CertificateRow = {
  id: string;
  sort: number;
  title: string;
  issuer: string;
  year: string;
  credential_id: string;
  verify_url: string;
  file_url?: string | null; // gambar atau PDF sertifikat, tampil di penampil
};

export type SkillGroupRow = { id: string; sort: number; name: string; items: string[] };

export type ServiceRow = {
  id: string;
  sort: number;
  i18n: L<{ title: string; output: string; duration: string }>;
};

export type ContentBundle = {
  profile: ProfileRow;
  projects: ProjectRow[];
  articles: ArticleRow[];
  experiences: ExperienceRow[];
  certificates: CertificateRow[];
  skillGroups: SkillGroupRow[];
  services: ServiceRow[];
};
