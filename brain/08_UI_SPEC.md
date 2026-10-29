# 08 UI SPEC

## STATUS: ARAH DISETUJUI (3 Okt 2026)
Referensi: template "Matteo" (jiro.build, motion artist portfolio), **versi minimal**.
Detail visual baru tetap butuh persetujuan Raey (lihat `00_MASTER_RULES.md`).

## Keputusan Raey
| Hal | Pilihan |
|---|---|
| Referensi | Matteo, dibuat lebih minimal |
| Foto hero | Ada, kualitas bagus. Hero pakai foto besar |
| Tema | Tanpa toggle. Section gelap dan terang bergantian |
| Kepadatan | Hero + 6 section (pola situs teman), sticky hero |
| Aksen | Oranye |
| Pencahayaan foto | Grading A: gelap sedang, wajah menyala, rim light oranye |
| Nama di hero | "Muhammad" kecil, "Yahya Ar / Rayhan" besar |

## DNA yang diambil dari Matteo
- Palet hitam, putih tulang, oranye
- Display condensed besar dan kapital
- Hero full-bleed oranye, nama raksasa, foto potret di kanan

## Yang sengaja dibuang dari Matteo (penyebab rame)
- 11 section dan 37 gambar
- Animasi huruf per huruf di banyak section
- Teks berspasi lebar ("V I E W  A L L")
- Sticky stacking di banyak section (sekarang hanya hero)
- Awards dan testimonials

## Token
| Token | Hex | Pakai untuk |
|---|---|---|
| black | `#050A0E` | Latar gelap, teks di latar terang dan oranye |
| bone | `#F2EDEA` | Latar terang, teks di latar gelap |
| accent | `#FF5B14` | Latar hero, angka proses, "Ayo ngobrol." |
| muted-dark | `#9AA2A9` | Teks sekunder di latar gelap |
| muted-light | `#5D6368` | Teks sekunder di latar terang |

Font: **Bebas Neue** (judul, kapital, satu ketebalan, `font-synthesis: none`) + **Inter** (isi). Sebelum 29 Okt 2026: Big Shoulders Display.

## Urutan dan tone section (beranda)
| # | Section | Latar |
|---|---|---|
| 1 | Hero (sticky) | Oranye |
| 2 | Proyek | Terang |
| 3 | Artikel | Gelap |
| 4 | Tentang + Pendidikan | Terang |
| 5 | Sertifikat | Gelap |
| 6 | Keahlian | Terang |
| 7 | Kontak + layanan (footer) | Oranye |

Halaman detail: header gelap, isi terang, daftar isi sticky di desktop, bagian bernomor, tombol salin kode.
Navigasi sticky: bar hitam transparan, logo "Rayhan.", CTA Unduh CV oranye.

## Animasi (Framer Motion, disetujui Raey 3 Okt 2026)
Semua ada di `src/components/motion.tsx`.
1. Hero: baris nama naik saat halaman dibuka (`RiseLine`).
2. Judul section naik sekali saat terlihat (`RevealOnScroll`, dipakai di komponen `Heading`).
3. Thumbnail proyek bergeser pelan saat discroll (`Parallax`).
4. Transisi halaman: fade opacity (`src/app/template.tsx`). Jangan pakai transform di sini, karena akan merusak navigasi fixed dan hero sticky.

5. Hero: latar krem (D29), nama polos tanpa gradasi dan tanpa link (D28). Foto masuk dari kanan, teks intro dan tombol naik setelah nama (`EnterOnLoad`).
6. Isi section muncul dari bawah saat discroll (`FadeUp`): proyek, kolom Tentang, baris Keahlian, bagian detail proyek/artikel.
7. Daftar muncul bergantian (`Stagger` + `StaggerItem`): artikel, pendidikan, sertifikat, layanan, link kontak.
8. Chip keahlian muncul membesar per kelompok (`PopItem`).
9. Kalimat Tentang muncul kata demi kata (`WordsReveal`). Judul Kontak dan judul halaman detail naik per baris.
10. Hover: kartu artikel dan sertifikat terangkat, gambar proyek sedikit mengecil.
11. Menu mobile (hero dan navigasi sticky) membuka dan menutup dengan animasi (`AnimatePresence`).

12. Transisi proyek: klik gambar proyek, gambar membesar sampai penuh layar lalu halaman detail muncul (`src/components/shell.tsx`, atribut `data-morph`).
13. Kursor custom: titik mengikuti mouse dan membesar di atas link (`cursor.tsx`). Warna berbalik mengikuti latar. Tanpa label teks (Raey tidak suka label "Lihat"). Mouse saja.
14. (Dihapus) Pita teks berjalan. Raey tidak suka (D23).
15. Kartu proyek bertumpuk saat scroll, desktop (lg) saja. Mobile dan tablet tetap alur biasa.
16. Angka statistik menghitung naik (`CountUp`, data `site.stats`).
17. Magnetik (`Magnetic`): tombol hero, Lihat semua, Ayo ngobrol. Nama di hero polos, tanpa link (D28).
18. Progress bar baca di halaman detail (`ReadingProgress`).
19. Command palette Ctrl + K, juga tombol cari di navigasi (`command-palette.tsx`).

Navigasi: klik link internal ditangani `Shell` dengan router.push, jadi tidak reload penuh.

Reduced motion: `MotionConfig reducedMotion="user"` mematikan gerak. Kursor custom dan transisi proyek juga mati. Parallax dicek manual dengan `useReducedMotion`.
20. Loader pembuka (`loader.tsx`, CSS di `globals.css`): lingkaran kecil memisah dari lingkaran utama, ganti warna saat terpisah, lalu menyatu lagi. Urutan oranye, hitam, krem (dipilih Raey). Latar abu batu #464b4f supaya ketiga warna terlihat. Di bawahnya nama, peran, kota. Hanya kunjungan pertama per sesi, minimal 1,2 detik, maksimal 3,5 detik. Animasi hero menunggu loader selesai (`useIntroReady`). Dilewati di /admin.

Jangan tambah animasi lain tanpa persetujuan Raey.

## Kelemahan yang diketahui
- Foto hero: foto lama (upscale 4x), rahang di-warp agar sesuai foto webcam. Kalau ada foto asli resolusi tinggi, ganti saja tanpa warp.
- JANGAN pakai AI upscale untuk wajah. Upscale mengubah bentuk rahang (kasus dagu lancip, 3 Okt).
- Thumbnail proyek masih blok hitam placeholder.

## Kualitas minimum (tidak bisa ditawar)
- Responsif sampai 360px, tanpa scroll horizontal
- Fokus keyboard terlihat
- Hormati `prefers-reduced-motion`
- Kontras teks memenuhi WCAG AA

## Riwayat
- v1 (3 Okt): hero 2 kolom + mockup dashboard kos. **Ditolak Raey.**
- v2 (3 Okt): gaya Matteo minimal. Menunggu review.
