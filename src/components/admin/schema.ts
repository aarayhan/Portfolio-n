/*
  Daftar isi yang bisa diubah di dashboard. Form dibuat otomatis dari daftar ini,
  jadi menambah kolom baru cukup di sini (plus kolom di supabase/schema.sql).

  path: lokasi nilai di baris database. "$lang" diganti "id" atau "en".
  Field dengan "$lang" di path tampil dua kali: Indonesia dan Inggris.
*/

export type FieldType =
  | "text"
  | "textarea"
  | "markdown"
  | "url"
  | "number"
  | "date"
  | "bool"
  | "slug"
  | "tags"
  | "image"
  | "file"
  | "select"
  | "list";

export type Field = {
  path: string;
  label: string;
  type: FieldType;
  hint?: string;
  options?: { value: string; label: string }[];
  fields?: Field[]; // untuk type "list": isi tiap item
  wide?: boolean;
};

export type Collection = {
  key: string;
  table: string;
  label: string;
  single?: boolean; // profil: hanya satu baris
  orderBy: { column: string; ascending: boolean };
  title: (row: Row) => string;
  subtitle?: (row: Row) => string;
  fields: Field[];
  blank: () => Row;
};

export type Row = Record<string, unknown> & { id?: string | number };

const i18n = <T extends Record<string, unknown>>(v: T) => ({ id: { ...v }, en: { ...v } });
const s = (v: unknown) => (typeof v === "string" ? v : "");
const t = (row: Row, key: string) => s((row.i18n as Record<string, Record<string, unknown>> | undefined)?.id?.[key]);

export const collections: Collection[] = [
  {
    key: "profile",
    table: "profile",
    label: "Profil",
    single: true,
    orderBy: { column: "id", ascending: true },
    title: (r) => s(r.name),
    blank: () => ({
      id: 1,
      name: "",
      hero_lines: [],
      socials: [],
      stats: [],
      i18n: i18n({ availability: "", intro: "", about: "", about_detail: "" }),
    }),
    fields: [
      { path: "name", label: "Nama lengkap", type: "text" },
      { path: "nickname", label: "Nama panggilan", type: "text" },
      { path: "short_name", label: "Nama pendek (navbar)", type: "text" },
      { path: "role", label: "Peran", type: "text", hint: "Contoh: Web developer" },
      { path: "hero_lead", label: "Hero: baris kecil", type: "text", hint: "Tampil kecil di atas nama besar" },
      { path: "hero_lines", label: "Hero: baris besar", type: "tags", hint: "Satu baris per item. Baris terakhir jadi link ke Tentang" },
      { path: "photo_url", label: "Foto hero", type: "image", hint: "PNG tanpa latar, tinggi minimal 1400px" },
      { path: "city", label: "Kota", type: "text" },
      { path: "timezone", label: "Zona waktu", type: "text", hint: "Format IANA, contoh Asia/Jakarta" },
      { path: "email", label: "Email", type: "text" },
      { path: "whatsapp", label: "Link WhatsApp", type: "url", hint: "https://wa.me/62..." },
      { path: "i18n.$lang.cv_url", label: "CV (PDF)", type: "file", hint: "Satu file per bahasa. Tombol Unduh CV di halaman /id dan /en memakai file masing-masing" },
      { path: "i18n.$lang.availability", label: "Status ketersediaan", type: "text" },
      { path: "i18n.$lang.intro", label: "Intro hero", type: "textarea" },
      { path: "i18n.$lang.about", label: "Kalimat besar Tentang", type: "textarea" },
      { path: "i18n.$lang.about_detail", label: "Paragraf Tentang", type: "textarea" },
      {
        path: "socials",
        label: "Media sosial",
        type: "list",
        wide: true,
        fields: [
          { path: "label", label: "Nama", type: "text" },
          { path: "href", label: "Link", type: "url" },
        ],
      },
      {
        path: "stats",
        label: "Angka statistik",
        type: "list",
        wide: true,
        fields: [
          { path: "value", label: "Angka", type: "number" },
          { path: "suffix", label: "Akhiran", type: "text", hint: "Contoh: +" },
          { path: "label.$lang", label: "Keterangan", type: "text" },
        ],
      },
    ],
  },
  {
    key: "projects",
    table: "projects",
    label: "Proyek",
    orderBy: { column: "sort", ascending: true },
    title: (r) => t(r, "title") || "(tanpa judul)",
    subtitle: (r) => `${r.published ? "Tayang" : "Draft"}. ${s(r.year)}`,
    blank: () => ({
      slug: "",
      sort: 0,
      published: false,
      stack: [],
      year: String(new Date().getFullYear()),
      thumbnail: null,
      live_url: null,
      repo_url: null,
      i18n: i18n({ title: "", summary: "", problem: "", solution: "", result: "", role: "", body: "" }),
    }),
    fields: [
      { path: "i18n.$lang.title", label: "Judul", type: "text" },
      { path: "slug", label: "Slug (alamat)", type: "slug", hint: "Huruf kecil dan tanda hubung. Kosongkan untuk dibuat dari judul" },
      { path: "published", label: "Tayang", type: "bool", hint: "Matikan untuk menyimpan sebagai draft" },
      { path: "sort", label: "Urutan", type: "number", hint: "Kecil tampil duluan. Urutan pertama jadi proyek unggulan" },
      { path: "year", label: "Tahun", type: "text" },
      { path: "stack", label: "Stack", type: "tags" },
      { path: "thumbnail", label: "Gambar", type: "image" },
      { path: "live_url", label: "Link demo", type: "url" },
      { path: "repo_url", label: "Link kode", type: "url" },
      { path: "i18n.$lang.summary", label: "Ringkasan", type: "textarea" },
      { path: "i18n.$lang.role", label: "Peran", type: "text" },
      { path: "i18n.$lang.problem", label: "Masalah", type: "textarea" },
      { path: "i18n.$lang.solution", label: "Solusi", type: "textarea" },
      { path: "i18n.$lang.result", label: "Hasil", type: "textarea" },
      { path: "i18n.$lang.body", label: "Studi kasus", type: "markdown", wide: true },
    ],
  },
  {
    key: "articles",
    table: "articles",
    label: "Artikel",
    orderBy: { column: "date", ascending: false },
    title: (r) => t(r, "title") || "(tanpa judul)",
    subtitle: (r) => `${r.published ? "Tayang" : "Draft"}. ${s(r.date)}`,
    blank: () => ({
      slug: "",
      published: false,
      date: new Date().toISOString().slice(0, 10),
      cover: null,
      i18n: i18n({ title: "", summary: "", body: "" }),
    }),
    fields: [
      { path: "i18n.$lang.title", label: "Judul", type: "text" },
      { path: "slug", label: "Slug (alamat)", type: "slug", hint: "Kosongkan untuk dibuat dari judul" },
      { path: "published", label: "Tayang", type: "bool" },
      { path: "date", label: "Tanggal", type: "date" },
      { path: "cover", label: "Gambar sampul", type: "image" },
      { path: "i18n.$lang.summary", label: "Ringkasan", type: "textarea" },
      { path: "i18n.$lang.body", label: "Isi", type: "markdown", wide: true },
    ],
  },
  {
    key: "experiences",
    table: "experiences",
    label: "Pengalaman",
    orderBy: { column: "sort", ascending: true },
    title: (r) => t(r, "title") || "(tanpa judul)",
    subtitle: (r) => `${kindLabel(s(r.kind))}. ${t(r, "period")}`,
    blank: () => ({ sort: 0, kind: "work", url: null, i18n: i18n({ period: "", title: "", place: "", description: "" }) }),
    fields: [
      {
        path: "kind",
        label: "Jenis",
        type: "select",
        hint: "Pendidikan tampil di daftar Pendidikan, sisanya di Pengalaman",
        options: [
          { value: "education", label: "Pendidikan" },
          { value: "work", label: "Kerja / PKL / freelance" },
          { value: "organization", label: "Organisasi / kegiatan" },
          { value: "achievement", label: "Lomba / pencapaian" },
        ],
      },
      { path: "sort", label: "Urutan", type: "number" },
      { path: "i18n.$lang.title", label: "Judul", type: "text", hint: "Contoh: Peserta, Juara 2, Siswa RPL" },
      { path: "i18n.$lang.place", label: "Tempat / penyelenggara", type: "text" },
      { path: "i18n.$lang.period", label: "Periode", type: "text", hint: "Contoh: Okt 2026, atau 2024 sampai sekarang" },
      { path: "url", label: "Link (opsional)", type: "url" },
      { path: "i18n.$lang.description", label: "Keterangan", type: "textarea" },
    ],
  },
  {
    key: "certificates",
    table: "certificates",
    label: "Sertifikat",
    orderBy: { column: "sort", ascending: true },
    title: (r) => s(r.title) || "(tanpa judul)",
    subtitle: (r) => `${s(r.issuer)}, ${s(r.year)}`,
    blank: () => ({ sort: 0, title: "", issuer: "", year: "", credential_id: "", verify_url: "" }),
    fields: [
      { path: "title", label: "Nama sertifikat", type: "text" },
      { path: "issuer", label: "Penerbit", type: "text" },
      { path: "year", label: "Tahun", type: "text" },
      { path: "credential_id", label: "ID kredensial", type: "text" },
      { path: "verify_url", label: "Link verifikasi", type: "url", hint: "Halaman verifikasi resmi dari penerbit" },
      { path: "sort", label: "Urutan", type: "number" },
    ],
  },
  {
    key: "skills",
    table: "skill_groups",
    label: "Keahlian",
    orderBy: { column: "sort", ascending: true },
    title: (r) => s(r.name) || "(tanpa nama)",
    subtitle: (r) => (Array.isArray(r.items) ? r.items.join(", ") : ""),
    blank: () => ({ sort: 0, name: "", items: [] }),
    fields: [
      { path: "name", label: "Kelompok", type: "text", hint: "Contoh: Frontend" },
      { path: "items", label: "Keahlian", type: "tags", hint: "Nama yang dikenal (React, Laravel, ...) otomatis dapat logo" },
      { path: "sort", label: "Urutan", type: "number" },
    ],
  },
  {
    key: "services",
    table: "services",
    label: "Layanan",
    orderBy: { column: "sort", ascending: true },
    title: (r) => t(r, "title") || "(tanpa judul)",
    subtitle: (r) => t(r, "duration"),
    blank: () => ({ sort: 0, i18n: i18n({ title: "", output: "", duration: "" }) }),
    fields: [
      { path: "i18n.$lang.title", label: "Nama layanan", type: "text" },
      { path: "i18n.$lang.output", label: "Hasil untuk klien", type: "textarea" },
      { path: "i18n.$lang.duration", label: "Perkiraan waktu", type: "text" },
      { path: "sort", label: "Urutan", type: "number" },
    ],
  },
];

function kindLabel(k: string) {
  return { education: "Pendidikan", work: "Kerja", organization: "Organisasi", achievement: "Pencapaian" }[k] ?? k;
}
