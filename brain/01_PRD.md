# 01 PRD

## Tujuan
Portfolio pribadi Raey. Satu halaman yang meyakinkan tiga jenis pembaca.

| Target | Yang dicari | Section kunci |
|---|---|---|
| PKL / magang | Skill nyata, bisa dipercaya | Hero, Proyek, Skill |
| Freelance | Hasil, layanan, cara kontak | Proyek, Layanan, Kontak |
| Kuliah | Konsistensi dan jejak belajar | Perjalanan, Catatan |

## Fokus awal
**Web development dulu.** Bidang lain ditambah belakangan.

## CTA utama
**Lihat proyek.** CTA sekunder: Hubungi saya, Unduh CV.

## Struktur (3 Okt 2026, pola situs teman Raey + gaya Matteo)
Beranda:
1. Hero (sticky, oranye, nama, foto, CTA Lihat proyek + Unduh CV)
2. Proyek (1 unggulan besar + 2 selang-seling, link ke semua proyek)
3. Artikel (2 terbaru, link ke semua artikel)
4. Tentang (1 kalimat besar, profil singkat, sosial, Pendidikan)
5. Sertifikat (kartu dengan ID dan link verifikasi)
6. Keahlian (dikelompokkan)
7. Kontak (oranye, layanan + semua link kontak) sebagai footer

Dua bahasa: Indonesia (`/id`) dan Inggris (`/en`). Tombol ID / EN di hero dan navbar.
Halaman lain: `/[lang]/proyek`, `/[lang]/proyek/[slug]`, `/[lang]/artikel`, `/[lang]/artikel/[slug]`, halaman 404 dua bahasa.
Navigasi sticky muncul setelah hero discroll, selalu tampil di halaman lain.
Yang ditiru dari situs teman: pola fitur dan jenis isi. Teks dan aset tidak.

## Kriteria sukses v1
- Minimal **2 proyek sudah deploy** dan bisa diklik.
- Hero, Proyek, Skill, Kontak selesai dan rapi di mobile.
- Lighthouse performance dan accessibility di atas 90.
- Raey puas dengan tampilan (lihat `08_UI_SPEC.md`).

## Di luar lingkup v1
CMS, login, toggle tema.

## Risiko
- Tiga target sekaligus bisa mengaburkan pesan. Atasi dengan satu CTA utama.
- Portfolio ditentukan oleh proyeknya, bukan UI. Tanpa proyek deploy, UI tidak menolong.
