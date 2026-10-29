// Buat supabase/seed.sql dari src/content/seed.ts.
// Jalankan: npx tsx scripts/seed-sql.ts
import { writeFileSync } from "node:fs";
import { seed } from "../src/content/seed";

const q = (v: unknown): string => {
  if (v === null || v === undefined) return "null";
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v) && v.every((x) => typeof x === "string"))
    return `array[${v.map(q).join(", ")}]::text[]`;
  if (typeof v === "object") return `${q(JSON.stringify(v))}::jsonb`;
  return `'${String(v).replace(/'/g, "''")}'`;
};

function insert(table: string, rows: Record<string, unknown>[], conflict: string) {
  if (!rows.length) return "";
  const cols = Object.keys(rows[0]);
  const values = rows.map((r) => `  (${cols.map((c) => q(r[c])).join(", ")})`).join(",\n");
  return `insert into public.${table} (${cols.join(", ")}) values\n${values}\non conflict (${conflict}) do nothing;\n`;
}

const out = [
  "-- Isi awal (contoh). Jalankan SETELAH schema.sql. Tidak menimpa data yang sudah ada.",
  "-- Dibuat otomatis dari src/content/seed.ts oleh scripts/seed-sql.ts.",
  "",
  insert("profile", [seed.profile], "id"),
  insert("projects", seed.projects, "id"),
  insert("articles", seed.articles, "id"),
  insert("experiences", seed.experiences, "id"),
  insert("certificates", seed.certificates, "id"),
  insert("skill_groups", seed.skillGroups, "id"),
  insert("services", seed.services, "id"),
].join("\n");

writeFileSync("supabase/seed.sql", out);
console.log("supabase/seed.sql ditulis");
