# 04 DATA MODEL

Database: Supabase (Postgres). Skema lengkap: `supabase/schema.sql`. Tipe TypeScript: `src/lib/content-types.ts`.

| Tabel | Isi | Catatan |
|---|---|---|
| profile | satu baris (id = 1): nama, kontak, foto, CV, sosial, statistik | `stats[].label` per bahasa |
| projects | slug, sort, published, stack, year, gambar, link | sort terkecil = proyek unggulan |
| articles | slug, published, date, cover | waktu baca dihitung dari isi |
| experiences | kind: education, work, organization, achievement | education tampil di Pendidikan, sisanya di Pengalaman |
| certificates | title, issuer, year, credential_id, verify_url | tidak diterjemahkan |
| skill_groups | name, items[] | nama yang dikenal otomatis dapat logo |
| services | judul, hasil, durasi | tampil di Kontak |
| admins | user_id | siapa yang boleh menulis |

Teks per bahasa disimpan di kolom `i18n` (jsonb): `{ "id": {...}, "en": {...} }`. Constraint menolak baris tanpa salah satu bahasa.
Isi detail proyek dan artikel: `i18n.<lang>.body` dalam Markdown.

## Akses (RLS)
- anon dan authenticated: baca semua, kecuali proyek dan artikel draft.
- Tulis dan unggah ke bucket `media`: hanya `public.is_admin()` (user ada di tabel admins).
- Tabel admins tidak bisa ditulis dari web. Tambah admin lewat SQL Editor.

## Dua bahasa
Komponen tidak membaca baris mentah. `lib/content.ts` meratakan ke satu bahasa: `getSite(lang)`, `getProjects(lang)`, `getArticles(lang)`.

## Aturan
- Proyek dengan sort terkecil jadi unggulan. Pastikan punya demo live.
- Satu sumber kebenaran: database. `seed.ts` hanya cadangan sebelum Supabase disambung.
