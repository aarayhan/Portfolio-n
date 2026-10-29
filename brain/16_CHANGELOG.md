# 16 CHANGELOG

Terbaru di atas. Format: tanggal, perubahan.

## 2026-10-30 (saklar artikel)
- Saklar "Tampilkan artikel" di dashboard Profil (kolom `profile.show_articles`, `supabase/update-2026-10-30.sql`). Mati: section, menu, palette, dan halaman /artikel hilang (404). Artikel tidak terhapus.
- Per artikel tetap bisa draft/tayang lewat saklar "Tayang".

## 2026-10-29 (penampil sertifikat)
- Sertifikat bisa dilihat langsung di web: klik kartu membuka penampil (gambar atau PDF), tutup dengan Esc, tombol X, atau klik latar. Tombol "Buka di tab baru" untuk HP yang tidak bisa menampilkan PDF.
- Kolom baru `certificates.file_url` (`supabase/update-2026-10-29c.sql`), field "File sertifikat" di dashboard.

## 2026-10-29 (MayKos)
- Nama proyek MyKos.id jadi MayKos (domain maykos.id), slug /proyek/maykos. Peran jadi Founder, bukan co-founder (koreksi Raey).
- `supabase/update-2026-10-29b.sql` untuk database yang sudah menjalankan update pertama. CV PDF dan dokumen CV ikut diperbarui.
- Favicon "AR." (lingkaran hitam, huruf krem, titik oranye) di `src/app/favicon.ico`, `icon.png`, `apple-icon.png`.
- Env Supabase dibersihkan otomatis (`src/lib/supabase/env.ts`); pesan login "Failed to fetch" diganti petunjuk alamat.

## 2026-10-29 (isi asli)
- Isi asli dari 8 repo GitHub (aarayhan): MyKos.id, GrandKos, PayWind, PomeloO, Bibliotheca, Filmer, PadViolett, Trackify. Studi kasus dua bahasa. Repo MyKos.id dan GrandKos privat, tanpa link.
- Pengalaman dan pendidikan dari CV, sertifikat dari CV (penerbit tiga sertifikat belum diketahui). Kelompok Mobile dihapus (Raey fokus web).
- Kontak asli: array248@gmail.com, WhatsApp, GitHub. LinkedIn dan Instagram contoh dihapus.
- CV PDF dua bahasa di `public/cv/`, tombol Unduh CV memakai file sesuai bahasa (`i18n.<lang>.cv_url`). Nomor HP tetap ada atas pilihan Raey.
- Artikel contoh jadi draft. Section dan menu Artikel otomatis hilang kalau belum ada artikel tayang.
- Sertifikat tanpa penerbit, ID, atau link verifikasi tidak lagi menampilkan teks kosong.
- `supabase/update-2026-10-29.sql`: ganti isi contoh di database dengan isi asli. Diuji dua kali jalan di Postgres lokal.

## 2026-10-29 (latar krem)
- Latar hero dan Kontak diganti dari oranye ke krem (bone #f2edea), pilihan Raey dari 5 opsi.
- Oranye tetap untuk tombol, garis bawah Ayo ngobrol, dan aksen kecil.
- Section Proyek diberi bayangan di tepi atas, supaya efek naik menutupi hero tetap terlihat (sama-sama krem).
- Kontak diberi garis atas, supaya terpisah dari Keahlian (sama-sama krem).

## 2026-10-29 (nama polos)
- RAYHAN di hero kembali polos: tanpa link, garis bawah, dan efek magnetik.
- Gradasi pudar kiri ke kanan di nama hero dihapus.

## 2026-10-29 (font)
- Font judul diganti dari Big Shoulders Display ke Bebas Neue (pilihan Raey, dibandingkan dengan Dela Gothic One).
- `font-synthesis: none` untuk judul, supaya class font-black tidak membuat tebal palsu.

## 2026-10-29 (dashboard + loader)
- Loader pembuka: lingkaran gooey (filter SVG), oranye > hitam > krem, identitas di bawahnya. Sekali per sesi.
- Animasi hero menunggu loader selesai (`useIntroReady` di motion.tsx).
- Isi web pindah ke Supabase. `lib/content.ts` jadi satu pintu data, `content/seed.ts` sebagai cadangan.
- Dihapus: `content/projects.ts`, `content/articles.ts`, isi profil di `lib/site.ts`.
- Isi detail proyek dan artikel sekarang Markdown (parser sendiri, uji bolak-balik 10/10 cocok dengan data lama). Mendukung tebal, kode, dan link di dalam teks.
- Tabel baru `experiences`: pendidikan + pengalaman. Section Tentang menampilkan daftar Pengalaman kalau ada isinya.
- Dashboard `/admin`: login email + password, form dua bahasa dengan tombol salin ID ke EN, upload gambar dan CV, pratinjau Markdown, draft/tayang.
- Kursor custom dimatikan di /admin.
- Diuji end-to-end dengan Postgres 16 + Supabase Auth v2.180 + PostgREST v12 lokal: login, tolak non-admin, simpan, upload, proyek baru langsung bisa dibuka, draft jadi 404, hapus, slug duplikat.
- Perbaikan saat uji: `dynamicParams=false` di layout membuat proyek baru 404; input URL menolak "#"; revalidateTag di route handler tidak bekerja, diganti server action + updateTag.

## 2026-10-03 (hero nama + hapus marquee)
- Hapus pita teks berjalan (`marquee.tsx` dan data `marquee` di `site.ts`).
- Baris RAYHAN di hero: efek sama dengan "Ayo ngobrol." (magnetik, garis bawah, hover redup), link ke #tentang.
- Ukuran nama hero ikut tinggi layar (`min(16.5vw,25svh)`) dan baris RAYHAN diberi ruang bawah, supaya garis bawah tidak menabrak teks intro di laptop pendek (1536x698, 1280x720).
- Nama hero memudar dari kiri ke kanan (mask gradasi, sisa 15% di ujung kanan).
- Label "Tentang saya" diperbesar dan dibuat hitam.
- `RiseLine` dapat prop `release` (lepas overflow setelah animasi) dan `interactive` (tidak aria-hidden).

## 2026-10-03 (dua bahasa)
- Situs jadi dua bahasa: `/id` dan `/en`. Tombol ID / EN di hero dan navbar.
- `/` dialihkan ke `/id`. Alamat lama `/proyek`, `/artikel` dialihkan ke `/id/...`.
- Kamus antarmuka `src/i18n.ts`. Profil, proyek, dan artikel punya teks dua bahasa.
- Command palette, 404, format tanggal, dan atribut lang di <html> ikut bahasa.
- Dicek: tidak ada teks Indonesia yang bocor di 5 halaman versi Inggris.

## 2026-10-03 (label kursor dihapus)
- Label "Lihat" di kursor dihapus atas permintaan Raey. Di atas gambar proyek, kursor membesar seperti di atas link lain.

## 2026-10-03 (kursor terlihat di semua latar)
- Bug: kursor putih polos tidak terlihat di latar terang. Penyebab: mix-blend-difference dipasang di elemen dalam, padahal elemen luar punya transform sehingga tidak berbaur dengan halaman.
- Perbaikan: blend dipindah ke elemen terluar. Hasilnya titik jadi gelap di latar terang, terang di latar gelap, biru di latar oranye.
- Label "Lihat" sekarang lingkaran oranye dengan garis hitam.

## 2026-10-03 (8 fitur interaksi)
- Navigasi client tanpa reload, dan transisi gambar proyek membesar ke halaman detail.
- Kursor custom dengan label "Lihat". Pita teks berjalan. Kartu proyek bertumpuk (desktop).
- Statistik count-up: 200+ commit, 43 file test, 14 proyek.
- Tombol magnetik, progress bar baca, command palette Ctrl + K.
- Diuji otomatis: transisi, palette, navigasi tanpa reload, kursor mati di layar sentuh, reduced motion, tanpa error console.

## 2026-10-03 (animasi diperbanyak)
- Raey minta animasi lebih banyak. Ditambah: foto dan intro hero masuk saat load, isi section muncul saat scroll, daftar bergantian, chip keahlian, kalimat Tentang kata demi kata, judul Kontak, hover kartu, animasi menu mobile, isi halaman detail.
- Dicek: semua teks terlihat setelah discroll, tanpa scroll horizontal, di desktop dan mobile.

## 2026-10-03 (tombol hero)
- Di desktop lebar (lg), tombol Unduh CV dan Lihat proyek pindah ke bawah teks intro di kiri. Sebelumnya tombol menumpuk di atas foto dan tidak terlihat.
- Tablet dan mobile tidak berubah.

## 2026-10-03 (Framer Motion)
- Pasang framer-motion. Animasi CSS lama di hero dihapus dan diganti Framer Motion.
- 4 animasi: nama hero naik, judul section muncul saat scroll, parallax thumbnail proyek, fade antar halaman.
- Reduced motion dihormati, termasuk parallax.
- Catatan: fade halaman dirender opacity 0 dari server, jadi isi baru tampil setelah JavaScript jalan.

## 2026-10-03 (keahlian disesuaikan dengan GitHub)
- Ditambah: Filament, Livewire, Inertia, GetX, PHPUnit, Composer, Vite. Grup baru Mobile dan Testing & tools.
- Flutter pindah dari "Sedang dipelajari" ke Mobile. Grup "Sedang dipelajari" dihapus.
- Dihapus karena tidak ada buktinya di repo: Node.js, Supabase, Figma, Vercel.
- Aturan: hanya tulis teknologi yang terlihat di proyek, atau yang dikonfirmasi Raey bisa dipakai.
- Figma ditambah lagi ke Testing & tools (dikonfirmasi Raey).
- Framer Motion ditambah ke Frontend (dikonfirmasi Raey), logo pakai logo Framer.

## 2026-10-03 (logo keahlian)
- Chip Keahlian diberi logo monokrom dari paket `simple-icons` (CC0).
- VS Code dan REST API pakai ikon lucide karena tidak ada di simple-icons.
- Menambah teknologi baru: tambah nama di `site.skills`, lalu daftarkan logonya di `src/components/tech-icon.tsx`.

## 2026-10-03 (navigasi proyek)
- Halaman detail proyek: tambah "Proyek sebelumnya" (kiri) di samping "Proyek berikutnya" (kanan). Judul diperkecil supaya muat 2 kolom. Di mobile bertumpuk.

## 2026-10-03 (struktur seperti situs teman)
- Navigasi sticky: muncul setelah hero di beranda, selalu tampil di halaman lain. Menu mobile.
- Proyek: 1 unggulan lebar penuh + 2 selang-seling. Halaman `/proyek` dan `/proyek/[slug]` dengan isi bertahap, tabel, kode + tombol salin, daftar isi, proyek berikutnya.
- Artikel: section beranda, `/artikel`, `/artikel/[slug]`.
- Tentang dipangkas jadi 1 kalimat + profil + Pendidikan. Section Perjalanan dihapus.
- Section baru: Sertifikat (ID + verifikasi), Keahlian (per kelompok).
- Layanan dan Cara kerja dihapus sebagai section. Layanan pindah ke Kontak.
- Kontak jadi oranye. Hero dapat tombol Unduh CV.
- Halaman 404.
- Konten dipisah ke `src/content/`.

## 2026-10-03 (foto diperbesar)
- Desktop (lg ke atas): foto 140 persen tinggi hero, mulai 9 persen dari atas, terpotong di bawah layar.
- Tablet (md): foto di kanan atas, lebar 58 persen, kepala sampai dada.
- Mobile: foto penuh lebar di atas nama, kepala sampai dada, bawahnya memudar.
- Dicek di 360, 390, 768, 1440, 1920 px tanpa scroll horizontal.

## 2026-10-03 (foto lama, rahang disesuaikan)
- Kembali ke foto lama (taman bunga), sesuai permintaan Raey.
- Rahang dan dagu di-warp (displacement field, OpenCV remap) supaya lebih bulat dan berisi seperti foto webcam.
- Cahaya grading digeser sedikit ke bawah supaya garis rahang ikut terang.
- Layout foto kembali ke versi sebelumnya (kanan bawah, lebar 48 sampai 55 persen).
- Foto webcam disimpan sebagai referensi struktur wajah saja.

## 2026-10-03 (foto webcam)
- Foto hero diganti ke foto webcam (kepala dan bahu). Alasan: AI upscale foto lama membuat dagu terlalu lancip.
- Proses: denoise, hapus background (isnet-general-use), grading A, tanpa upscale.
- Foto dirapatkan ke kanan bawah. Kontainer foto desktop 55 sampai 60 persen lebar.
- Earphone dan kabel dibiarkan (pilihan Raey).

## 2026-10-03 (nama dan foto final)
- Nama lengkap: Muhammad Yahya Ar Rayhan (panggilan Raey). Hero: "Muhammad" kecil + "Yahya Ar / Rayhan" besar.
- Foto di-upscale 4x dengan Real-ESRGAN (x4plus), lalu background dihapus ulang dan grading A (gelap sedang, cahaya dari arah wajah, rim light oranye).
- Animasi hero sekarang per baris nama, bukan per huruf.

## 2026-10-03 (foto hero)
- Background foto Raey dihapus (rembg, model isnet-general-use), disimpan ke `public/hero.png`.
- Foto asli hanya 525x437, jadi tampak pecah di desktop. Sementara.
- Mobile: foto di atas nama supaya teks tetap terbaca.

## 2026-10-03 (UI v2)
- Arah UI baru: gaya template Matteo versi minimal.
- 6 section: Hero sticky, Tentang, Proyek, Layanan + Cara kerja, Perjalanan, Kontak.
- Hapus: toggle tema (next-themes), announcement bar, mockup dashboard, header dan footer lama.
- Font diganti ke Big Shoulders Display + Inter.
- Konten dipusatkan di `src/lib/site.ts`, termasuk proyek, layanan, proses, perjalanan.
- Jam lokal WIB di hero.

## 2026-10-03 (v1)
- Tambah knowledge base `brain/` (18 file).
- Scaffold project: Next.js 16, React 19, Tailwind 4, next-themes, lucide-react.
- Token warna oranye `#FF5B14` (terang) dan `#FF6A2B` (gelap).
- Komponen: SiteHeader, Hero, BrowserMock, ThemeToggle, SiteFooter.
- Section di bawah hero berupa kerangka "Belum diisi".
- Raey menyatakan kurang suka hasil UI. Keputusan visual ditahan sampai ada jawaban.
