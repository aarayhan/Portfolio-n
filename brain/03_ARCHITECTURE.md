# 03 ARCHITECTURE

## Struktur folder
```
Portfolio_web/
  brain/                         knowledge base
  public/hero.png                foto hero
  next.config.ts                 redirect: / ke /id, alamat lama ke /id/...
  src/
    i18n.ts                      kamus teks antarmuka (id, en) + formatDate
    app/
      layout.tsx                 root: html, font, Shell, kursor
      template.tsx               fade antar halaman
      not-found.tsx              404 dua bahasa
      [lang]/layout.tsx          validasi bahasa, lang di <html>, command palette
      [lang]/page.tsx            beranda
      [lang]/proyek/...          daftar dan detail proyek
      [lang]/artikel/...         daftar dan detail artikel
      admin/page.tsx             dashboard isi (login Supabase)
      admin/actions.ts           server action: cek admin, buang cache isi (updateTag)
    components/
      loader.tsx                 layar pembuka (HTML + CSS, skrip kecil)
      admin/app.tsx              dashboard: login, daftar, form, simpan
      admin/schema.ts            daftar bagian dan field dashboard
      admin/editor.tsx           input field: teks, tag, upload, list, Markdown
      hero.tsx, site-nav.tsx     navigasi + tombol bahasa
      lang-switch.tsx            tombol ID / EN
      sections.tsx               section beranda, kartu, footer
      blocks.tsx                 isi bertahap + daftar isi
      motion.tsx, shell.tsx, cursor.tsx, interactive.tsx, command-palette.tsx
      tech-icon.tsx, copy-button.tsx, local-time.tsx, html-lang.tsx
    content/
      types.ts                   tipe Section dan Block untuk halaman detail
      seed.ts                    isi bawaan, dipakai kalau Supabase belum disambung
    lib/
      content.ts                 SATU-SATUNYA pintu data: getSite, getProjects, getArticles
      content-types.ts           bentuk baris database
      markdown.ts                Markdown ke Section/Block, dan sebaliknya
      supabase/browser.ts        client Supabase untuk dashboard
      site.ts                    struktur navigasi
      utils.ts
  supabase/
    schema.sql                   tabel, RLS, bucket media
    seed.sql                     isi awal (dibuat scripts/seed-sql.ts)
  SETUP_SUPABASE.md              langkah menyambungkan
```

## Bahasa
- Semua halaman ada di `/id/...` dan `/en/...`, dibuat statis saat build.
- Teks antarmuka: `src/i18n.ts`. Teks profil: `text` di `site.ts`. Teks proyek dan artikel: `text.id` dan `text.en` di file content.
- Menambah teks baru: isi kedua bahasa sekaligus, TypeScript akan error kalau salah satu lupa.
- Tombol ID / EN membuka halaman yang sama di bahasa lain, termasuk posisi #section.

## Aliran data
Supabase > `lib/content.ts` (fetch dengan tag `content`, cache 1 jam) > komponen > HTML statis (SSG + ISR).
Env Supabase kosong: `content.ts` memakai `content/seed.ts`.
Simpan di dashboard > server action `refreshSiteAction` > `updateTag("content")` + `revalidatePath("/", "layout")` > pengunjung berikutnya dapat isi baru.
Catatan: `revalidateTag` dari Route Handler tidak membuang cache fetch di uji 29 Okt 2026 (Next 16.3.8). Pakai server action + `updateTag`.

## Menambah proyek atau artikel
Lewat dashboard `/admin`. Halaman detail baru dibuat saat pertama dibuka (`dynamicParams = true`).
Jangan pasang `dynamicParams = false` di `[lang]/layout.tsx`: pengaturan layout menurun ke halaman anak, proyek baru jadi 404.
Isi detail ditulis Markdown (`lib/markdown.ts`), diubah ke Section/Block saat render.

## Navigasi
- Link internal tetap `<a>`, tapi klik dicegat `Shell` lalu diarahkan ke `router.push` (tanpa reload). Link ke anchor di halaman yang sama dibiarkan ke browser.
- Beranda: navigasi di hero. Bar sticky hitam muncul setelah 75% tinggi layar discroll.
- Halaman lain: bar sticky selalu tampil.
- Semua link section memakai `/{lang}#id` supaya bisa dipakai dari halaman mana pun.

## Efek sticky hero
Hero `sticky top-0 z-0`. Section setelahnya `relative z-10` dengan latar solid.
