// Buat supabase/update-2026-10-29b.sql: nama MyKos.id jadi MayKos, peran jadi Founder.
import { writeFileSync } from "node:fs";
import { seed } from "../src/content/seed";
const q = (v: unknown) => `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;
const s = (v: string) => `'${v.replace(/'/g, "''")}'`;
const proj = seed.projects.find((p) => p.slug === "maykos")!;
const exp = seed.experiences.find((e) => e.i18n.en.place === "MayKos")!;
const out = `-- Ganti nama MyKos.id jadi MayKos dan peran jadi Founder. Jalankan sekali di SQL Editor.
-- Kalau baris ini sudah kamu ubah sendiri lewat dashboard, perubahanmu akan tertimpa.
begin;
update public.projects set slug = ${s(proj.slug)}, i18n = ${q(proj.i18n)} where id = ${s(proj.id)};
update public.experiences set i18n = ${q(exp.i18n)} where id = ${s(exp.id)};
update public.profile set i18n = ${q(seed.profile.i18n)} where id = 1;
commit;
`;
writeFileSync("supabase/update-2026-10-29b.sql", out);
console.log("ok", proj.id, exp.id);
