# 10 SECURITY

## Aturan
- **Tidak ada rahasia di repo.** Token, API key, password, `.env` tidak boleh di-commit. `.env*.local` sudah di `.gitignore`.
- **Jangan tempel token ke chat atau tools online.** Kalau terlanjur, revoke dan buat baru.
- Tautan eksternal pakai `rel="noopener noreferrer"` saat `target="_blank"`.
- Email di halaman: pertimbangkan obfuscation ringan untuk kurangi spam.
- Header keamanan dasar (CSP, X-Frame-Options, Referrer-Policy) lewat `next.config.ts` sebelum produksi.

## Supabase
- Web hanya memakai publishable key (`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, nama lama `..._ANON_KEY` juga diterima). service_role key tidak boleh ada di kode, env frontend, atau chat.
- Hak tulis dijaga RLS (`is_admin()`), bukan tampilan dashboard. Diuji 29 Okt 2026: anon dan user non-admin ditolak insert, update, upload, dan menambah diri ke admins.
- Matikan pendaftaran user baru di Supabase setelah akun admin dibuat.
- Dashboard `/admin` diberi `noindex`.

## Privasi
- Jangan tampilkan alamat rumah, nomor pribadi yang tidak perlu, atau data keluarga.
- Jangan pasang pelacak pihak ketiga tanpa alasan jelas.

## Dependensi
- Jalankan `npm audit` sebelum rilis.
- Kunci versi lewat `package-lock.json` (dibuat saat `npm install` pertama).
