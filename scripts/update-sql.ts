// Buat supabase/update-2026-10-29.sql: ganti isi contoh (dari seed lama) dengan isi asli di src/content/seed.ts.
// Hanya menghapus baris contoh lama berdasarkan id-nya, jadi isi yang kamu tambah sendiri lewat dashboard tidak ikut terhapus.
import { readFileSync, writeFileSync } from "node:fs";
import { seed } from "../src/content/seed";

const oldSql = readFileSync(process.argv[2], "utf8");
const idsOf = (table: string) => {
  const block = oldSql.split(`insert into public.${table} `)[1]?.split("on conflict")[0] ?? "";
  return [...block.matchAll(/\(\s*'([0-9a-f-]{36})'/g)].map((m) => m[1]);
};
const q = (v: unknown): string => {
  if (v === null || v === undefined) return "null";
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v) && v.every((x) => typeof x === "string")) return `array[${v.map(q).join(", ")}]::text[]`;
  if (typeof v === "object") return `${q(JSON.stringify(v))}::jsonb`;
  return `'${String(v).replace(/'/g, "''")}'`;
};
const list = (ids: string[]) => ids.map((i) => `'${i}'`).join(", ");
const insert = (table: string, rows: Record<string, unknown>[]) => {
  const cols = Object.keys(rows[0]);
  return `insert into public.${table} (${cols.join(", ")}) values\n${rows.map((r) => `  (${cols.map((c) => q(r[c])).join(", ")})`).join(",\n")}\non conflict (id) do nothing;\n`;
};
const p = seed.profile;
const out = `-- Isi asli portfolio (29 Okt 2026). Jalankan SEKALI di SQL Editor, setelah schema.sql dan seed.sql.
-- 1. Hapus isi contoh dari seed lama (berdasarkan id, isi buatanmu sendiri aman).
-- 2. Artikel contoh disembunyikan (draft), bukan dihapus.
-- 3. Profil diperbarui, lalu proyek, pengalaman, sertifikat, dan keahlian asli dimasukkan.
begin;

delete from public.projects where id in (${list(idsOf("projects"))});
delete from public.experiences where id in (${list(idsOf("experiences"))});
delete from public.certificates where id in (${list(idsOf("certificates"))});
delete from public.skill_groups where id in (${list(idsOf("skill_groups"))});
update public.articles set published = false where id in (${list(idsOf("articles"))});

update public.profile set
  email = ${q(p.email)},
  whatsapp = ${q(p.whatsapp)},
  cv_url = ${q(p.cv_url)},
  socials = ${q(p.socials)},
  stats = ${q(p.stats)},
  i18n = ${q(p.i18n)}
where id = 1;

${insert("projects", seed.projects)}
${insert("experiences", seed.experiences)}
${insert("certificates", seed.certificates)}
${insert("skill_groups", seed.skillGroups)}
commit;
`;
writeFileSync("supabase/update-2026-10-29.sql", out);
console.log("ditulis", idsOf("projects").length, idsOf("experiences").length, idsOf("certificates").length, idsOf("skill_groups").length, idsOf("articles").length);
