# 02 TRD

## Stack
| Bagian | Pilihan | Catatan |
|---|---|---|
| Framework | Next.js 16 (App Router) | Static, tanpa server logic di v1 |
| UI runtime | React 19 | |
| Styling | Tailwind CSS 4 | Token lewat CSS variables di `globals.css` |
| Tema | Tanpa toggle | Section gelap dan terang bergantian (D10) |
| Ikon | lucide-react + simple-icons | Logo teknologi dari simple-icons |
| Animasi | framer-motion | 4 animasi, lihat 08_UI_SPEC |
| Font | @fontsource: Bebas Neue + @fontsource-variable: Inter | Lokal, tanpa Google Fonts saat build |
| Bahasa | TypeScript strict | |
| Komponen | Ditulis manual | shadcn/ui belum dipasang |
| Deploy | Vercel (rencana) | |

## Perintah
```
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Prasyarat
Node.js 20 atau lebih baru.

## Batasan
- Tanpa database dan tanpa API di v1.
- Semua konten statis di kode.
- Gambar lewat `next/image` dengan `sizes` yang benar.

## Standar kode
- Komponen server secara default. `"use client"` hanya kalau perlu state atau browser API.
- Warna hanya lewat token. Jangan hardcode hex di komponen.
- Teks hanya dari `src/lib/site.ts` atau data section.
