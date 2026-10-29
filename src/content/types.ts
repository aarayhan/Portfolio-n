import type { Lang } from "@/i18n";

// Blok isi untuk halaman detail proyek dan artikel.
export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; lang: string; code: string; caption?: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "note"; text: string };

export type Section = { title: string; blocks: Block[] };

/* Teks proyek per bahasa. */
export type ProjectText = {
  title: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  role: string;
  sections: Section[];
};

export type ProjectSource = {
  slug: string;
  stack: string[];
  year: string;
  thumbnail?: string;
  liveUrl?: string;
  repoUrl?: string;
  text: Record<Lang, ProjectText>;
};

/* Bentuk yang dipakai komponen: sudah diratakan untuk satu bahasa. */
export type Project = Omit<ProjectSource, "text"> & ProjectText;

export type ArticleText = { title: string; summary: string; sections: Section[] };

export type ArticleSource = {
  slug: string;
  date: string; // YYYY-MM-DD
  readMinutes: number;
  cover?: string;
  text: Record<Lang, ArticleText>;
};

export type Article = Omit<ArticleSource, "text"> & ArticleText;
