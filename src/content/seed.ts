import type { ContentBundle } from "@/lib/content-types";

/*
  Isi awal web. Dipakai kalau Supabase belum disambungkan (env kosong),
  dan sumber untuk supabase/seed.sql. Setelah Supabase aktif, ubah isi lewat /admin, bukan di sini.
  Semua yang bertanda PLACEHOLDER di dashboard wajib diganti dengan data asli.
*/
export const seed: ContentBundle = {
  "profile": {
    "id": 1,
    "name": "Muhammad Yahya Ar Rayhan",
    "nickname": "Raey",
    "short_name": "Rayhan",
    "hero_lead": "Muhammad",
    "hero_lines": [
      "Yahya Ar",
      "Rayhan"
    ],
    "role": "Web developer",
    "city": "Malang, Indonesia",
    "timezone": "Asia/Jakarta",
    "email": "array248@gmail.com",
    "whatsapp": "https://wa.me/6285770048248",
    "cv_url": "/cv/CV-Muhammad-Yahya-Ar-Rayhan-EN.pdf",
    "photo_url": "/hero.png",
    "socials": [
      {
        "label": "GitHub",
        "href": "https://github.com/aarayhan"
      }
    ],
    "stats": [
      {
        "value": 200,
        "suffix": "+",
        "label": {
          "id": "commit di proyek web",
          "en": "commits across web projects"
        }
      },
      {
        "value": 400,
        "suffix": "",
        "label": {
          "id": "test otomatis di tiga proyek",
          "en": "automated tests across three projects"
        }
      },
      {
        "value": 8,
        "suffix": "",
        "label": {
          "id": "proyek di portfolio ini",
          "en": "projects in this portfolio"
        }
      }
    ],
    "i18n": {
      "id": {
        "availability": "Terbuka untuk PKL mulai Maret 2027 dan freelance",
        "intro": "Saya bangun web dan sistem yang dipakai orang setiap hari, dari landing page sampai aplikasi manajemen.",
        "about": "Saya merapikan pekerjaan manual jadi sistem web yang jalan.",
        "about_detail": "Fokus saya di web development dengan Laravel dan Filament. Proyek utama saya GrandKos, sistem yang dipakai keluarga saya untuk menjalankan kos, dan MyKos.id, versi SaaS-nya untuk pemilik kos lain. Sekarang saya siswa Rekayasa Perangkat Lunak di SMK IDN Boarding School dan sedang mencari tempat PKL.",
        "cv_url": "/cv/CV-Muhammad-Yahya-Ar-Rayhan-ID.pdf"
      },
      "en": {
        "availability": "Open to internships from March 2027 and freelance work",
        "intro": "I build websites and systems people use every day, from landing pages to management apps.",
        "about": "I turn manual work into web systems that actually run.",
        "about_detail": "My focus is web development with Laravel and Filament. My main projects are GrandKos, the system my family uses to run our boarding house, and MyKos.id, its SaaS version for other owners. I am a Software Engineering student at SMK IDN Boarding School, looking for an internship.",
        "cv_url": "/cv/CV-Muhammad-Yahya-Ar-Rayhan-EN.pdf"
      }
    }
  },
  "projects": [
    {
      "slug": "mykos-id",
      "sort": 1,
      "published": true,
      "stack": [
        "Laravel 13",
        "Filament 5",
        "PostgreSQL 18",
        "Livewire",
        "Tailwind"
      ],
      "year": "2026",
      "thumbnail": null,
      "live_url": null,
      "repo_url": null,
      "i18n": {
        "en": {
          "title": "MyKos.id",
          "summary": "A boarding house management SaaS where every owner gets a workspace isolated at database level.",
          "problem": "Small boarding house owners track rooms, tenants and payments in notebooks and chat. Apps that exist are either single-owner or expensive.",
          "solution": "A multi-tenant version of GrandKos. Each owner is an organization, and PostgreSQL Row Level Security makes sure the app can only ever read that organization's rows.",
          "result": "241 automated tests as of Sep 2026. Preparing a free beta for 15 to 20 owners.",
          "role": "Co-founder, full-stack developer",
          "body": "## Background\nMyKos.id grew out of GrandKos, the system my family uses for our own boarding house. Other owners wanted the same thing, so it became a SaaS. It is a separate codebase and database: GrandKos is never touched or used as the first tenant.\n\n## Architecture\n- **Tenancy in the database, not only in code.** Every table with tenant data has a Row Level Security policy. A query without an organization set returns zero rows, not an error and not every row.\n- **Two database roles.** `maykos_app` serves web requests and can only read and write, under RLS. `maykos_system` runs migrations and system jobs, and the app role can never switch to it.\n- **Two Filament panels**: one for owners and staff, one read-only panel for the platform team.\n\n## Features\n- Rooms, residents, invoices, deposits and a front desk view.\n- Resident sign-up form with encrypted ID numbers and ID photos in private storage. An owner cannot download another owner's files even with the exact path.\n- WhatsApp payment reminders three days and one day before the due date, sent from each owner's own WhatsApp number, with a daily quota.\n- A public invoice page that never renders sensitive columns.\n\n## Testing\nEach security rule has a test, and each phase has at least one negative test: the safeguard is switched off, the test must fail, then the safeguard comes back. Example: a reminder job for one owner never uses another owner's WhatsApp instance.\n\n| Phase | What it covered | Tests |\n|---|---|---|\n| 4C | Resident WhatsApp numbers | 161 |\n| 5E | Payment reminders | 197 |\n| UX-1 | Owner panel wording and labels | 219 |\n| 5E patch 1 | Reminders sent at most once | 241 |\n\n## Next\nA free beta for 15 to 20 owners on a home server, then a move to a VPS before the first paid plan. Next feature: an AI assistant that owners command through WhatsApp, with the web dashboard kept alongside it.\n\n> The repository is private because the product is still in development."
        },
        "id": {
          "title": "MyKos.id",
          "summary": "SaaS manajemen kos, setiap pemilik punya ruang kerja yang dipisah di level database.",
          "problem": "Pemilik kos kecil mencatat kamar, penyewa, dan pembayaran di buku dan chat. Aplikasi yang ada hanya untuk satu pemilik atau mahal.",
          "solution": "Versi multi-tenant dari GrandKos. Setiap pemilik adalah satu organisasi, dan PostgreSQL Row Level Security memastikan aplikasi hanya bisa membaca baris milik organisasi itu.",
          "result": "241 test otomatis per September 2026. Sedang menyiapkan beta gratis untuk 15 sampai 20 pemilik.",
          "role": "Co-founder, full-stack developer",
          "body": "## Latar belakang\nMyKos.id berawal dari GrandKos, sistem yang dipakai keluarga saya untuk kos kami sendiri. Pemilik kos lain ingin hal yang sama, jadi sistemnya dijadikan SaaS. Kode dan databasenya terpisah: GrandKos tidak pernah disentuh atau dijadikan tenant pertama.\n\n## Arsitektur\n- **Pemisahan data di database, bukan hanya di kode.** Setiap tabel berisi data tenant punya aturan Row Level Security. Query tanpa organisasi yang diset mengembalikan nol baris, bukan error dan bukan semua baris.\n- **Dua role database.** `maykos_app` melayani request web dan hanya bisa baca tulis di bawah RLS. `maykos_system` menjalankan migrasi dan job sistem, dan role aplikasi tidak pernah bisa pindah ke role itu.\n- **Dua panel Filament**: satu untuk pemilik dan staf, satu panel baca saja untuk tim platform.\n\n## Fitur\n- Kamar, penyewa, tagihan, uang jaminan, dan halaman frontdesk.\n- Form pendaftaran penyewa dengan NIK terenkripsi dan foto KTP di storage privat. Pemilik tidak bisa mengunduh file pemilik lain walaupun tahu path-nya.\n- Pengingat tagihan WhatsApp H-3 dan H-1 dari nomor WhatsApp masing-masing pemilik, dengan kuota harian.\n- Halaman tagihan publik yang tidak pernah menampilkan kolom sensitif.\n\n## Pengujian\nSetiap aturan keamanan punya test, dan setiap fase punya minimal satu test negatif: pengaman dimatikan, test harus gagal, lalu pengaman dikembalikan. Contoh: job pengingat milik satu pemilik tidak pernah memakai instance WhatsApp pemilik lain.\n\n| Fase | Isi | Test |\n|---|---|---|\n| 4C | Nomor WhatsApp penyewa | 161 |\n| 5E | Pengingat tagihan | 197 |\n| UX-1 | Bahasa dan label panel pemilik | 219 |\n| 5E patch 1 | Pengingat terkirim paling banyak sekali | 241 |\n\n## Berikutnya\nBeta gratis untuk 15 sampai 20 pemilik di server rumah, lalu pindah ke VPS sebelum paket berbayar pertama. Fitur berikutnya: asisten AI yang diperintah pemilik lewat WhatsApp, dengan dashboard web tetap tersedia.\n\n> Repository-nya privat karena produk masih dalam pengembangan."
        }
      },
      "id": "b5e32027-6c97-5bac-a271-d489b9077ba9"
    },
    {
      "slug": "grandkos",
      "sort": 2,
      "published": true,
      "stack": [
        "Laravel 13",
        "Filament 5",
        "PostgreSQL",
        "Filament Shield",
        "WhatsApp API"
      ],
      "year": "2026",
      "thumbnail": null,
      "live_url": null,
      "repo_url": null,
      "i18n": {
        "en": {
          "title": "GrandKos",
          "summary": "The management system my family uses to run our boarding house, Grand Kedawung Syariah.",
          "problem": "The family ran the boarding house on a paid third-party app. Billing, reminders and reports still needed manual work, and the data was not ours to extend.",
          "solution": "A Laravel and Filament system built around how we actually run the place, with the old app's data imported.",
          "result": "In daily use since 2026. 63 commits and 105 automated tests.",
          "role": "Full-stack developer",
          "body": "## Background\nGrand Kedawung Syariah is a boarding house run by my family. I built GrandKos between July and September 2026 to replace the paid app we used, then imported all of the old data into it.\n\n## Features\n- **Billing**: invoices created automatically every month, multi-month cycles (quarter, semester, year), deposits, late fees and partial refunds.\n- **WhatsApp**: payment reminders and a monthly report, sent with a random delay and a per-minute limit so the number is not flagged.\n- **Accounting reports**: cash flow, profit and loss, general ledger and balance sheet, plus recurring expenses.\n- **Dashboard**: occupancy, paid this month, income versus expenses, tenants with arrears.\n- **Two properties** in one app, each with its own rooms and tenants.\n- **Security**: email OTP two-factor login for admins, roles with Filament Shield (super admin and operational admin), daily database backup.\n\n## Stack\nLaravel 13, Filament 5 and PostgreSQL, with DomPDF for documents and a WhatsApp API for messages.\n\n## Testing\n105 automated tests, including race conditions on bookings and spoofed payment proofs.\n\n> The repository is private because it holds real tenant and family data."
        },
        "id": {
          "title": "GrandKos",
          "summary": "Sistem manajemen yang dipakai keluarga saya untuk menjalankan kos Grand Kedawung Syariah.",
          "problem": "Kos keluarga sebelumnya memakai aplikasi pihak ketiga berbayar. Penagihan, pengingat, dan laporan masih banyak dikerjakan manual, dan datanya tidak bisa kami kembangkan sendiri.",
          "solution": "Sistem Laravel dan Filament yang dibuat sesuai cara kami menjalankan kos, dengan data dari aplikasi lama diimpor.",
          "result": "Dipakai sehari-hari sejak 2026. 63 commit dan 105 test otomatis.",
          "role": "Full-stack developer",
          "body": "## Latar belakang\nGrand Kedawung Syariah adalah kos yang dikelola keluarga saya. Saya membangun GrandKos antara Juli dan September 2026 untuk menggantikan aplikasi berbayar yang kami pakai, lalu mengimpor semua data lama ke dalamnya.\n\n## Fitur\n- **Tagihan**: dibuat otomatis setiap bulan, siklus beberapa bulan (kuartal, semester, tahun), uang jaminan, denda, dan refund sebagian.\n- **WhatsApp**: pengingat bayar dan laporan bulanan, dikirim dengan jeda acak dan batas per menit supaya nomor tidak diblokir.\n- **Laporan akuntansi**: arus kas, laba rugi, buku besar, dan neraca, ditambah pengeluaran berulang.\n- **Dashboard**: okupansi, lunas bulan ini, pemasukan dan pengeluaran, penyewa yang menunggak.\n- **Dua properti** dalam satu aplikasi, masing-masing dengan kamar dan penyewanya sendiri.\n- **Keamanan**: login dua langkah OTP email untuk admin, hak akses dengan Filament Shield (super admin dan admin operasional), backup database harian.\n\n## Stack\nLaravel 13, Filament 5, dan PostgreSQL, dengan DomPDF untuk dokumen dan API WhatsApp untuk pesan.\n\n## Pengujian\n105 test otomatis, termasuk race condition saat booking dan bukti transfer palsu.\n\n> Repository-nya privat karena berisi data penyewa dan keluarga yang asli."
        }
      },
      "id": "1c57fcca-1520-5b47-9f9f-d38ba5aa204d"
    },
    {
      "slug": "paywind",
      "sort": 3,
      "published": true,
      "stack": [
        "Laravel",
        "Livewire",
        "Flux",
        "MySQL",
        "Docker"
      ],
      "year": "2026",
      "thumbnail": null,
      "live_url": null,
      "repo_url": "https://github.com/aarayhan/PayWind",
      "i18n": {
        "en": {
          "title": "PayWind",
          "summary": "Payroll for Indonesian companies, with BPJS and PPh 21 TER tax calculation.",
          "problem": "Indonesian payroll has its own rules: PTKP status, PPh 21 TER brackets and BPJS. Spreadsheets get these wrong easily.",
          "solution": "A Laravel monolith with Livewire and Flux that calculates salaries from components and tax tables, in payroll batches.",
          "result": "54 automated tests and a Docker image for deployment.",
          "role": "Full-stack developer",
          "body": "## Features\n- Employees with PTKP status and salary components (allowances and deductions).\n- Payroll batches: process a whole month at once, with a detail line per employee.\n- PPh 21 TER brackets and BPJS calculation.\n- Admin and employee roles, and an audit log for every payroll action.\n- Settings for company payroll rules.\n\n## Stack\nLaravel, Livewire with Flux UI, Fortify for authentication, MySQL, Tailwind CSS. A Docker image for deployment.\n\n## Testing\n54 automated tests covering authentication, the dashboard and payroll management."
        },
        "id": {
          "title": "PayWind",
          "summary": "Penggajian untuk perusahaan Indonesia, dengan perhitungan BPJS dan PPh 21 TER.",
          "problem": "Penggajian di Indonesia punya aturan sendiri: status PTKP, tarif PPh 21 TER, dan BPJS. Di spreadsheet, perhitungan ini mudah salah.",
          "solution": "Aplikasi Laravel dengan Livewire dan Flux yang menghitung gaji dari komponen dan tabel pajak, diproses per batch.",
          "result": "54 test otomatis dan image Docker untuk deploy.",
          "role": "Full-stack developer",
          "body": "## Fitur\n- Data karyawan dengan status PTKP dan komponen gaji (tunjangan dan potongan).\n- Batch penggajian: proses satu bulan sekaligus, dengan rincian per karyawan.\n- Perhitungan PPh 21 TER dan BPJS.\n- Peran admin dan karyawan, serta log audit untuk setiap aksi penggajian.\n- Pengaturan aturan penggajian perusahaan.\n\n## Stack\nLaravel, Livewire dengan Flux UI, Fortify untuk login, MySQL, Tailwind CSS. Image Docker untuk deploy.\n\n## Pengujian\n54 test otomatis untuk login, dashboard, dan pengelolaan penggajian."
        }
      },
      "id": "90bcf0ac-7e31-5ecc-9fad-3125c499d85e"
    },
    {
      "slug": "pomeloo",
      "sort": 4,
      "published": true,
      "stack": [
        "Python",
        "PySide6",
        "C",
        "GitHub Actions"
      ],
      "year": "2026",
      "thumbnail": null,
      "live_url": "https://pomeloo.netlify.app/",
      "repo_url": "https://github.com/aarayhan/PomeloO",
      "i18n": {
        "en": {
          "title": "PomeloO",
          "summary": "A file converter and toolbox for Windows: drag a file, tap a key, pick a format.",
          "problem": "Converting a file usually means uploading it to a website, or opening a heavy app for one small task.",
          "solution": "A desktop app that shows a wheel of formats under the cursor while you drag a file. Everything runs on the user's PC.",
          "result": "Released for Windows 10 and 11 with an installer, automatic updates and a website.",
          "role": "Developer",
          "body": "## What it does\nWhile you drag a file in Explorer, tap Shift and a wheel of formats appears under the cursor. Drop the file on one and the converted copy appears next to the original. Ctrl opens tools, Alt opens actions, and a \"notch\" at the top of the screen gives drop zones such as Fit WhatsApp and Fit Email.\n\n- 275+ conversions: images, audio, video, PDF, Word, Markdown, EPUB, slides, spreadsheets, subtitles and archives.\n- 34 tools: compress to a size, crop, redact with face and text detection, PDF merge and split, OCR, and more.\n- Send to Phone over Wi-Fi with a QR code.\n\n## Build and release\nPython with PySide6 for the interface and small native parts in C. GitHub Actions builds each release and rebuilds the website after every push. The app checks for updates daily and installs them when the PC is idle.\n\n## Note\nThis is a desktop project, outside my web focus. It is here because it shipped to real users."
        },
        "id": {
          "title": "PomeloO",
          "summary": "Konverter file dan kumpulan alat untuk Windows: seret file, tekan satu tombol, pilih format.",
          "problem": "Mengubah format file biasanya berarti mengunggahnya ke website, atau membuka aplikasi berat untuk satu tugas kecil.",
          "solution": "Aplikasi desktop yang memunculkan roda format di bawah kursor saat file diseret. Semua diproses di PC pengguna.",
          "result": "Dirilis untuk Windows 10 dan 11 dengan installer, update otomatis, dan website.",
          "role": "Developer",
          "body": "## Fungsinya\nSaat menyeret file di Explorer, tekan Shift dan roda format muncul di bawah kursor. Lepas file di salah satu format, dan hasilnya muncul di sebelah file asli. Ctrl membuka alat, Alt membuka aksi, dan \"notch\" di atas layar menyediakan zona seperti Fit WhatsApp dan Fit Email.\n\n- 275+ jenis konversi: gambar, audio, video, PDF, Word, Markdown, EPUB, slide, spreadsheet, subtitle, dan arsip.\n- 34 alat: kompres ke ukuran tertentu, crop, sensor wajah dan teks otomatis, gabung dan pisah PDF, OCR, dan lainnya.\n- Kirim ke HP lewat Wi-Fi dengan kode QR.\n\n## Build dan rilis\nPython dengan PySide6 untuk tampilan, ditambah bagian kecil native dalam C. GitHub Actions membangun setiap rilis dan membangun ulang website setiap ada perubahan. Aplikasi mengecek update setiap hari dan memasangnya saat PC sedang tidak dipakai.\n\n## Catatan\nIni proyek desktop, di luar fokus web saya. Saya cantumkan karena sudah dirilis dan dipakai orang."
        }
      },
      "id": "6cf58bea-fb08-585d-83cd-973af6501f53"
    },
    {
      "slug": "bibliotheca",
      "sort": 5,
      "published": true,
      "stack": [
        "Laravel",
        "Inertia",
        "React",
        "TypeScript",
        "Google Books API"
      ],
      "year": "2026",
      "thumbnail": null,
      "live_url": null,
      "repo_url": "https://github.com/aarayhan/bibliotheca-Elibrary",
      "i18n": {
        "en": {
          "title": "Bibliotheca",
          "summary": "An e-library to search books and keep a personal reading list.",
          "problem": "Readers want one place to find books and track what they read.",
          "solution": "Laravel with Inertia and React, using the Google Books API for search and book details.",
          "result": "Search, save to a collection, and mark books as finished.",
          "role": "Full-stack developer",
          "body": "## Features\n- Search books through the Google Books API.\n- Save books to a personal collection and update their reading status.\n- Accounts with Laravel Fortify.\n\n## Stack\nLaravel, Inertia, React with TypeScript, Tailwind CSS and Radix UI components."
        },
        "id": {
          "title": "Bibliotheca",
          "summary": "Perpustakaan digital untuk mencari buku dan menyimpan daftar bacaan pribadi.",
          "problem": "Pembaca butuh satu tempat untuk mencari buku dan mencatat bacaan.",
          "solution": "Laravel dengan Inertia dan React, memakai Google Books API untuk pencarian dan detail buku.",
          "result": "Cari buku, simpan ke koleksi, dan tandai sudah dibaca.",
          "role": "Full-stack developer",
          "body": "## Fitur\n- Cari buku lewat Google Books API.\n- Simpan buku ke koleksi pribadi dan ubah status bacanya.\n- Akun pengguna dengan Laravel Fortify.\n\n## Stack\nLaravel, Inertia, React dengan TypeScript, Tailwind CSS, dan komponen Radix UI."
        }
      },
      "id": "3305d056-051a-538b-900b-fca671640077"
    },
    {
      "slug": "filmer",
      "sort": 6,
      "published": true,
      "stack": [
        "Laravel",
        "Tailwind",
        "TMDB API"
      ],
      "year": "2026",
      "thumbnail": null,
      "live_url": null,
      "repo_url": "https://github.com/aarayhan/filmer",
      "i18n": {
        "en": {
          "title": "Filmer",
          "summary": "A movie catalog with a personal watchlist, powered by the TMDB API.",
          "problem": "Keeping track of films to watch across apps and notes.",
          "solution": "A Laravel app that browses TMDB and saves films to a watchlist with a status.",
          "result": "Catalog, watchlist, and watched or not watched status per film.",
          "role": "Full-stack developer",
          "body": "## Features\n- Browse films from the TMDB API.\n- Add films to a watchlist, change their status, or remove them.\n- Login required for personal lists.\n\n## Stack\nLaravel with the MVC pattern, Blade, Tailwind CSS."
        },
        "id": {
          "title": "Filmer",
          "summary": "Katalog film dengan watchlist pribadi, memakai TMDB API.",
          "problem": "Daftar film yang ingin ditonton tersebar di banyak aplikasi dan catatan.",
          "solution": "Aplikasi Laravel untuk menjelajah TMDB dan menyimpan film ke watchlist dengan status.",
          "result": "Katalog, watchlist, dan status sudah atau belum ditonton per film.",
          "role": "Full-stack developer",
          "body": "## Fitur\n- Jelajah film dari TMDB API.\n- Tambah film ke watchlist, ubah statusnya, atau hapus.\n- Login untuk daftar pribadi.\n\n## Stack\nLaravel dengan pola MVC, Blade, Tailwind CSS."
        }
      },
      "id": "b362d85c-dfc2-5739-915d-f4a41ca7ce2f"
    },
    {
      "slug": "padviolett",
      "sort": 7,
      "published": true,
      "stack": [
        "PHP",
        "MySQL",
        "Tailwind"
      ],
      "year": "2026",
      "thumbnail": null,
      "live_url": null,
      "repo_url": "https://github.com/aarayhan/project-ecommerce",
      "i18n": {
        "en": {
          "title": "PadViolett",
          "summary": "A bookstore e-commerce site built with native PHP.",
          "problem": "Practice project: build a full store without a framework.",
          "solution": "Native PHP and MySQL with a storefront, cart, orders and an admin panel.",
          "result": "Working store with login, cart and book management.",
          "role": "Full-stack developer",
          "body": "## Features\n- Book catalog and product pages.\n- Register, login and a shopping cart with orders.\n- Admin panel to add, edit and delete books.\n\n## Stack\nNative PHP, MySQL, Tailwind CSS. No framework, to learn what one does for you."
        },
        "id": {
          "title": "PadViolett",
          "summary": "Toko buku online yang dibuat dengan PHP native.",
          "problem": "Proyek latihan: membangun toko lengkap tanpa framework.",
          "solution": "PHP native dan MySQL dengan etalase, keranjang, pesanan, dan panel admin.",
          "result": "Toko yang berjalan dengan login, keranjang, dan pengelolaan buku.",
          "role": "Full-stack developer",
          "body": "## Fitur\n- Katalog dan halaman detail buku.\n- Daftar, login, dan keranjang belanja dengan pesanan.\n- Panel admin untuk menambah, mengubah, dan menghapus buku.\n\n## Stack\nPHP native, MySQL, Tailwind CSS. Tanpa framework, supaya paham apa yang dikerjakan framework."
        }
      },
      "id": "d94435fe-5a3e-58bf-b9eb-1db7d3f2ab0e"
    },
    {
      "slug": "trackify",
      "sort": 8,
      "published": true,
      "stack": [
        "JavaScript",
        "HTML",
        "Tailwind"
      ],
      "year": "2025",
      "thumbnail": null,
      "live_url": null,
      "repo_url": "https://github.com/aarayhan/Productivity-Tracker",
      "i18n": {
        "en": {
          "title": "Trackify",
          "summary": "A productivity tracker with a Pomodoro timer, task log and analytics.",
          "problem": "Keeping focus and seeing where the day went.",
          "solution": "A front-end app in plain JavaScript with separate pages for the timer, tasks, analytics and settings.",
          "result": "Pomodoro sessions, daily tasks and charts of work habits.",
          "role": "Front-end developer",
          "body": "## Features\n- Pomodoro timer.\n- Daily task log.\n- Analytics of completed sessions and tasks.\n- Settings page.\n\n## Stack\nHTML, JavaScript, Tailwind CSS."
        },
        "id": {
          "title": "Trackify",
          "summary": "Pelacak produktivitas dengan timer Pomodoro, catatan tugas, dan analitik.",
          "problem": "Menjaga fokus dan melihat ke mana waktu sehari habis.",
          "solution": "Aplikasi front-end dengan JavaScript biasa, dengan halaman terpisah untuk timer, tugas, analitik, dan pengaturan.",
          "result": "Sesi Pomodoro, tugas harian, dan grafik kebiasaan kerja.",
          "role": "Front-end developer",
          "body": "## Fitur\n- Timer Pomodoro.\n- Catatan tugas harian.\n- Analitik sesi dan tugas yang selesai.\n- Halaman pengaturan.\n\n## Stack\nHTML, JavaScript, Tailwind CSS."
        }
      },
      "id": "ab2a4184-7932-5cbd-8a56-642f40c99ea2"
    }
  ],
  "articles": [
    {
      "id": "7e0d9ac0-fe93-4a46-b5c1-360abe4abd56",
      "slug": "belajar-ulang-dasar-web",
      "published": false,
      "date": "2026-09-30",
      "cover": null,
      "i18n": {
        "id": {
          "title": "Kenapa saya belajar ulang dasar web dari nol",
          "summary": "Persiapan PKL dan kuliah, dimulai dari HTML lagi.",
          "body": "## Alasannya\n\nTulis alasannya di sini.\n\n## Rencana belajar\n\n1. HTML dan CSS.\n2. JavaScript.\n3. Framework."
        },
        "en": {
          "title": "Why I am relearning web basics from scratch",
          "summary": "Getting ready for an internship and university, starting from HTML again.",
          "body": "## The reason\n\nWrite the reason here.\n\n## Learning plan\n\n1. HTML and CSS.\n2. JavaScript.\n3. Frameworks."
        }
      }
    },
    {
      "id": "1f53e2d2-4fec-4efc-8d1e-6836e0d1a7dc",
      "slug": "catatan-membangun-sistem-kos",
      "published": false,
      "date": "2026-09-20",
      "cover": null,
      "i18n": {
        "id": {
          "title": "Catatan membangun sistem kos pertama saya",
          "summary": "Apa yang berhasil, apa yang salah, dan apa yang akan saya ubah.",
          "body": "## Awal mula\n\nTulis ceritanya di sini.\n\n## Yang saya pelajari\n\n- Pelajaran pertama.\n- Pelajaran kedua."
        },
        "en": {
          "title": "Notes from building my first boarding house system",
          "summary": "What worked, what went wrong, and what I would change.",
          "body": "## How it started\n\nWrite the story here.\n\n## What I learned\n\n- First lesson.\n- Second lesson."
        }
      }
    }
  ],
  "experiences": [
    {
      "id": "87c2f07e-41dd-5382-8bf8-a5972799bae9",
      "sort": 1,
      "kind": "education",
      "url": null,
      "i18n": {
        "en": {
          "period": "2025 to 2027 (ongoing)",
          "title": "SMK IDN Boarding School",
          "place": "Solo, Karanganyar",
          "description": "Software Engineering"
        },
        "id": {
          "period": "2025 sampai 2027 (berjalan)",
          "title": "SMK IDN Boarding School",
          "place": "Solo, Karanganyar",
          "description": "Rekayasa Perangkat Lunak"
        }
      }
    },
    {
      "id": "f7b126ae-f33e-5d20-991c-0a483bdcd12b",
      "sort": 2,
      "kind": "education",
      "url": null,
      "i18n": {
        "en": {
          "period": "2022 to 2025",
          "title": "SMP IDN Boarding School",
          "place": "Jonggol, Bogor",
          "description": ""
        },
        "id": {
          "period": "2022 sampai 2025",
          "title": "SMP IDN Boarding School",
          "place": "Jonggol, Bogor",
          "description": ""
        }
      }
    },
    {
      "id": "c0bfaeda-398b-5403-b90f-f487f3d05101",
      "sort": 3,
      "kind": "education",
      "url": null,
      "i18n": {
        "en": {
          "period": "Since 2022",
          "title": "Self-taught programming",
          "place": "",
          "description": "Web development, PHP, JavaScript and Laravel through personal projects and online courses."
        },
        "id": {
          "period": "Sejak 2022",
          "title": "Belajar pemrograman mandiri",
          "place": "",
          "description": "Web development, PHP, JavaScript, dan Laravel lewat proyek pribadi dan kursus online."
        }
      }
    },
    {
      "id": "12c876ef-2d13-5413-b112-1e0b716629c7",
      "sort": 4,
      "kind": "work",
      "url": null,
      "i18n": {
        "en": {
          "period": "Sep 2026 to now",
          "title": "Co-founder and developer",
          "place": "MyKos.id",
          "description": "Building a boarding house management SaaS on Laravel, Filament and PostgreSQL."
        },
        "id": {
          "period": "Sep 2026 sampai sekarang",
          "title": "Co-founder dan developer",
          "place": "MyKos.id",
          "description": "Membangun SaaS manajemen kos dengan Laravel, Filament, dan PostgreSQL."
        }
      }
    },
    {
      "id": "7bc3dcad-431a-5e99-952f-4f4bffdb98ee",
      "sort": 5,
      "kind": "work",
      "url": null,
      "i18n": {
        "en": {
          "period": "Jul 2026 to now",
          "title": "Developer",
          "place": "Grand Kedawung Syariah (family business)",
          "description": "Built and maintain GrandKos, the system used to run the family boarding house."
        },
        "id": {
          "period": "Jul 2026 sampai sekarang",
          "title": "Developer",
          "place": "Grand Kedawung Syariah (usaha keluarga)",
          "description": "Membangun dan merawat GrandKos, sistem yang dipakai untuk menjalankan kos keluarga."
        }
      }
    },
    {
      "id": "ead68394-873c-5d43-9ec1-8ae31440c222",
      "sort": 6,
      "kind": "achievement",
      "url": null,
      "i18n": {
        "en": {
          "period": "Oct 2026",
          "title": "IT FEST 2026 participant",
          "place": "Institut STTS",
          "description": "Team of 3. Designed SiklusKu, a privacy-first period tracker web app. My part was the solution design."
        },
        "id": {
          "period": "Okt 2026",
          "title": "Peserta IT FEST 2026",
          "place": "Institut STTS",
          "description": "Tim 3 orang. Merancang SiklusKu, web app pencatat siklus menstruasi yang mengutamakan privasi. Bagian saya rancangan solusi."
        }
      }
    },
    {
      "id": "d7b5d2a5-c92e-5d1f-bf68-a93a5fb629b8",
      "sort": 7,
      "kind": "organization",
      "url": null,
      "i18n": {
        "en": {
          "period": "Oct 2026",
          "title": "IDN Mengajar outreach",
          "place": "SMK IDN Boarding School",
          "description": "Offered the school's teaching program to about 48 high schools and vocational schools in Malang, by email."
        },
        "id": {
          "period": "Okt 2026",
          "title": "Penawaran program IDN Mengajar",
          "place": "SMK IDN Boarding School",
          "description": "Menawarkan program mengajar sekolah ke sekitar 48 SMA dan SMK di Malang lewat email."
        }
      }
    }
  ],
  "certificates": [
    {
      "id": "fc1f0dab-0e1a-5e5f-afc5-d780921437a7",
      "sort": 1,
      "title": "Getting Started with Full Stack JavaScript Development",
      "issuer": "",
      "year": "2026",
      "credential_id": "",
      "verify_url": ""
    },
    {
      "id": "9f4c1a76-0e2d-5bfe-84b1-9ecd1ff39fc3",
      "sort": 2,
      "title": "Introduction to PHP",
      "issuer": "",
      "year": "2026",
      "credential_id": "",
      "verify_url": ""
    },
    {
      "id": "d837ddca-f5ce-5203-bf9a-ff92221b4c03",
      "sort": 3,
      "title": "SQL Projects",
      "issuer": "",
      "year": "2026",
      "credential_id": "",
      "verify_url": ""
    },
    {
      "id": "7d43eca9-e05a-51db-b20b-eb8804884cfe",
      "sort": 4,
      "title": "Belajar Membuat Front-End Web untuk Pemula",
      "issuer": "Dicoding",
      "year": "2026",
      "credential_id": "",
      "verify_url": ""
    },
    {
      "id": "152a035a-73ae-5f10-a73c-f09523b0b45f",
      "sort": 5,
      "title": "Belajar Dasar Pemrograman JavaScript",
      "issuer": "Dicoding",
      "year": "2025",
      "credential_id": "",
      "verify_url": ""
    },
    {
      "id": "d5fa2a79-94f0-5415-af86-14e28f0dde79",
      "sort": 6,
      "title": "Belajar Dasar Pemrograman Web",
      "issuer": "Dicoding",
      "year": "2025",
      "credential_id": "",
      "verify_url": ""
    }
  ],
  "skillGroups": [
    {
      "id": "5b7ef234-8056-5dc0-8db4-7733bdafd9cc",
      "sort": 1,
      "name": "Backend",
      "items": [
        "PHP",
        "Laravel",
        "Filament",
        "Livewire",
        "Inertia",
        "REST API"
      ]
    },
    {
      "id": "136ea17f-84c6-52a8-abe5-153a94294e1d",
      "sort": 2,
      "name": "Frontend",
      "items": [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind"
      ]
    },
    {
      "id": "ba8282d0-e4f8-576d-b804-a4b4f4a23e3d",
      "sort": 3,
      "name": "Database",
      "items": [
        "PostgreSQL",
        "MySQL"
      ]
    },
    {
      "id": "3e5e6e8a-47e6-55d9-8758-85a0db4af4e7",
      "sort": 4,
      "name": "Testing & tools",
      "items": [
        "PHPUnit",
        "Git",
        "GitHub",
        "GitHub Actions",
        "Docker",
        "Composer",
        "Vite",
        "Figma"
      ]
    },
    {
      "id": "bd8241b1-4f51-56e3-bc96-bad703528adf",
      "sort": 5,
      "name": "Other",
      "items": [
        "Python"
      ]
    }
  ],
  "services": [
    {
      "id": "526b79be-b520-4f87-9080-a4916b9c2f71",
      "sort": 1,
      "i18n": {
        "id": {
          "title": "Landing page",
          "output": "Satu halaman cepat dan siap dibagikan.",
          "duration": "1 sampai 2 minggu"
        },
        "en": {
          "title": "Landing page",
          "output": "One fast page, ready to share.",
          "duration": "1 to 2 weeks"
        }
      }
    },
    {
      "id": "447feefc-7b26-446a-b074-946d20d946b8",
      "sort": 2,
      "i18n": {
        "id": {
          "title": "Sistem custom",
          "output": "Dashboard dan alur kerja sesuai kebutuhan usahamu.",
          "duration": "3 sampai 8 minggu"
        },
        "en": {
          "title": "Custom system",
          "output": "Dashboards and workflows built around your business.",
          "duration": "3 to 8 weeks"
        }
      }
    },
    {
      "id": "720f7499-7b55-4c89-a963-2ab0356d3bf8",
      "sort": 3,
      "i18n": {
        "id": {
          "title": "Perbaikan web",
          "output": "Benahi web lama yang lambat, rusak, atau sulit dipakai.",
          "duration": "Mulai 3 hari"
        },
        "en": {
          "title": "Website fixes",
          "output": "Fix an old site that is slow, broken, or hard to use.",
          "duration": "From 3 days"
        }
      }
    }
  ]
};
