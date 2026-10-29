# 17 DECISIONS

Format: ID, tanggal, keputusan, alasan, status.

## D01 | 2026-10-03 | Satu halaman, tiga target sekaligus
Alasan: PKL, freelance, dan kuliah dilayani lewat urutan section, bukan tiga situs. CTA utama satu: Lihat proyek.
Status: Aktif.

## D02 | 2026-10-03 | Fokus web development dulu
Alasan: pesan tidak kabur. Bidang lain ditambah setelah v1.
Status: Aktif. Diputuskan Raey.

## D03 | 2026-10-03 | Aksen warna oranye
Alasan: pilihan Raey. Dipusatkan di token CSS supaya mudah diganti.
Status: Aktif. Nuansa tepatnya boleh berubah.

## D04 | 2026-10-03 | Next.js + Tailwind, tanpa shadcn dulu
Alasan: ringan dan sederhana. Komponen dasar ditulis manual. Pasang shadcn kalau butuh komponen kompleks.
Status: Aktif.

## D05 | 2026-10-03 | Bangun lewat kode, bukan mockup statis
Alasan: Raey web developer, iterasi di browser lebih cepat dan bisa dirasakan (scroll, hover, dark mode).
Status: Aktif.

## D06 | 2026-10-03 | Jangan salin situs referensi
Alasan: hanya pola yang diambil. Konten dan aset tetap milik pembuatnya. Portfolio kembar merugikan.
Status: Aktif.

## D07 | 2026-10-03 | Keputusan UI wajib persetujuan Raey
Alasan: Raey kurang suka hasil pertama dan meminta jawabannya ditunggu sebelum keputusan UI diambil.
Status: Aktif. Berlaku untuk semua perubahan visual.

## D08 | 2026-10-03 | Hero versi 1 (mockup kos) ditinjau ulang
Alasan: Raey tidak puas.
Status: Selesai. Diganti D09.

## D09 | 2026-10-03 | Gaya Matteo versi minimal
Alasan: Raey suka template Matteo tapi menilai terlalu rame. Ambil palet, tipografi condensed, dan hero full-bleed. Buang sisanya.
Status: Aktif. Diputuskan Raey.

## D10 | 2026-10-03 | Tanpa toggle tema, section bergantian gelap dan terang
Alasan: pilihan Raey. Lebih konsisten dengan gaya Matteo. Menggantikan dark mode di D04.
Status: Aktif.

## D11 | 2026-10-03 | 6 section + sticky hero
Alasan: pilihan Raey. Skill digabung ke Tentang, Layanan digabung dengan Cara kerja. Sticky hanya di hero.
Status: Diganti D16.

## D12 | 2026-10-03 | Hero pakai foto besar
Alasan: Raey punya foto berkualitas. Placeholder dipakai sampai foto diunggah.
Status: Aktif.

## D13 | 2026-10-03 | Nama hero dan grading foto
Nama lengkap Muhammad Yahya Ar Rayhan. Hero: "Muhammad" kecil di atas, "Yahya Ar / Rayhan" besar. Foto pakai grading A dan AI upscale 4x.
Status: Aktif. Diputuskan Raey.

## D14 | 2026-10-03 | Foto hero pakai foto webcam, tanpa AI upscale
Alasan: AI upscale foto lama mengarang bentuk rahang sehingga dagu terlalu lancip. Foto webcam menunjukkan wajah asli. Kabel earphone dibiarkan.
Status: Aktif. Diputuskan Raey. Menggantikan bagian foto di D13.

## D15 | 2026-10-03 | Foto lama dengan struktur rahang dari foto webcam
Alasan: Raey lebih suka pose foto lama, tapi bentuk rahang harus seperti foto webcam. Rahang di-warp, bukan diganti wajah.
Status: Aktif. Menggantikan D14.

## D16 | 2026-10-03 | Struktur dan fitur mengikuti situs teman, gaya tetap Matteo
Navigasi sticky, halaman detail proyek bertahap, Artikel, Tentang + Pendidikan, Sertifikat, Keahlian, Kontak. Teks dan aset teman tidak disalin. Toggle tema dan bahasa tetap tidak dipasang (D10).
Status: Aktif. Diputuskan Raey. Menggantikan D11.

## D17 | 2026-10-03 | Layanan masuk ke Kontak, Cara kerja dan Perjalanan dihapus
Alasan: situs teman tidak punya section itu, dan supaya halaman tidak rame. Layanan tetap ada untuk target freelance.
Status: Aktif.

## D18 | 2026-10-03 | Framer Motion untuk 4 animasi
Hero nama, judul section saat scroll, parallax thumbnail, transisi halaman. Dipilih Raey, sekaligus bukti skill Framer Motion. Saran awal maksimal 2 animasi, Raey memilih 4.
Status: Aktif. Menggantikan aturan "satu animasi saja" di 08_UI_SPEC.

## D19 | 2026-10-03 | Animasi diperluas ke semua section
Raey menilai 4 animasi terlalu minim. Hampir semua isi kini punya animasi masuk sekali saat terlihat, plus hover dan menu mobile. Semua tetap sekali jalan (once) dan menghormati reduced motion.
Status: Aktif. Memperluas D18.

## D20 | 2026-10-03 | 8 fitur interaksi tambahan
Dipilih Raey: transisi gambar proyek, kursor custom, marquee, kartu bertumpuk, statistik count-up, tombol magnetik, progress baca, command palette. Raey minta mengabaikan kekhawatiran "rame".
Status: Aktif.

## D21 | 2026-10-03 | Transisi proyek pakai overlay, bukan layoutId lintas halaman
Alasan: animasi layoutId antar halaman di App Router tidak stabil. Overlay di layout (yang tidak ikut dimuat ulang) lebih bisa diandalkan.
Status: Aktif.

## D22 | 2026-10-03 | Dua bahasa dengan alamat terpisah (/id dan /en)
Raey minta bahasa Inggris atau toggle dua bahasa. Dipilih toggle, karena targetnya lokal (PKL) dan internasional (kuliah, klien asing). Alamat terpisah supaya dua-duanya terindeks mesin pencari. Default Indonesia.
Status: Aktif.

## D23 | 2026-10-03 | Hapus marquee, nama RAYHAN jadi link magnetik
Raey tidak suka teks berjalan. Raey memilih baris RAYHAN memakai efek "Ayo ngobrol.", dengan garis bawah dan link ke section Tentang.
Status: Sebagian dicabut. Marquee tetap dihapus, link RAYHAN dicabut oleh D28.

## D24 | 2026-10-29 | Isi web dikelola lewat dashboard, database Supabase
Raey minta web yang bisa diupdate, bukan hard code. Pilihan Raey: Next.js + Supabase (bukan Laravel + Filament, bukan Payload). Alasan: satu project, gratis di Vercel, login dan storage sudah ada.
Status: Aktif. Menggantikan model data file. Dua bahasa (D22) tetap.

## D25 | 2026-10-29 | Isi detail ditulis Markdown, bukan blok
Form blok terlalu rumit untuk dashboard. Markdown diubah ke Section/Block yang sama, jadi tampilan halaman detail tidak berubah.
Status: Aktif.

## D26 | 2026-10-29 | Loader pembuka
Raey minta loader lingkaran yang memisah, ganti warna, lalu menyatu, dengan identitas di bawahnya. Warna dipilih Raey: oranye, hitam, krem. Latar #464b4f dipilih Claude supaya tiga warna terlihat, bisa diganti.
Batas: sekali per sesi, 1,2 sampai 3,5 detik, karena halaman statis sebenarnya sudah cepat.
Status: Aktif.

## D27 | 2026-10-29 | Font judul Bebas Neue
Raey minta Dela Gothic One atau Bebas Neue. Dibandingkan di hero: Dela Gothic One terlalu lebar (nama turun ke 3 baris, menabrak foto, scroll horizontal di HP). Raey memilih Bebas Neue. Ukuran judul tidak diubah.
Status: Aktif.

## D28 | 2026-10-29 | Nama di hero polos
Raey minta link dan garis bawah di RAYHAN dihapus. Efek magnetik ikut dihapus, karena tanpa link efek itu memberi kesan bisa diklik. Gradasi pudar juga dihapus atas permintaan Raey.
Status: Aktif.

## D29 | 2026-10-29 | Latar hero dan Kontak krem
Raey merasa latar oranye penuh kurang enak. Dari 5 pilihan (oranye, gelap, gelap nama oranye, krem, oranye gelap), Raey memilih krem. Oranye turun jadi warna aksen saja.
Status: Aktif.
