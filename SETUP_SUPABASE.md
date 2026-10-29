# Menyambungkan dashboard ke Supabase

Sebelum langkah ini selesai, web tetap jalan dengan isi bawaan (`src/content/seed.ts`). Dashboard di `/admin` hanya menampilkan petunjuk.

## 1. Buat project
1. Daftar atau masuk di supabase.com, lalu klik **New project**.
2. Pilih region **Southeast Asia (Singapore)** supaya dekat dengan Indonesia.
3. Simpan password database di password manager. Password ini tidak dipakai web, tapi perlu kalau suatu saat mau akses langsung.

## 2. Buat tabel dan isi awal
1. Buka **SQL Editor**, lalu **New query**.
2. Tempel seluruh isi `supabase/schema.sql`, lalu klik **Run**.
3. Buat query baru, tempel isi `supabase/seed.sql`, lalu **Run**. Ini mengisi data contoh yang sama dengan web sekarang.

Dua file itu aman dijalankan ulang. Seed tidak menimpa data yang sudah ada.

## 3. Buat akun admin
1. Buka **Authentication > Users > Add user > Create new user**.
2. Isi email dan password, centang **Auto Confirm User**.
3. Salin **User UID** akun itu.
4. Di SQL Editor jalankan:
   ```sql
   insert into public.admins (user_id) values ('TEMPEL-USER-UID-DI-SINI');
   ```
5. Buka **Authentication > Sign In / Providers**, lalu matikan **Allow new users to sign up**. Orang lain tetap tidak bisa mengubah isi meskipun berhasil mendaftar, tapi lebih aman kalau pendaftaran ditutup sama sekali.

## 4. Sambungkan ke web
1. Buka **Project Settings > API Keys**. Salin **publishable key** (`sb_publishable_...`). Project URL ada di tombol **Connect** di atas, atau menu **Data API**.
   Jangan pakai **service_role / secret key**. Kunci itu bisa melewati semua aturan akses.
2. Di folder project, salin `.env.example` jadi `.env.local`, lalu isi:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   ```
3. Hentikan `npm run dev`, lalu jalankan lagi.
4. Buka `http://localhost:3000/admin` dan masuk dengan akun dari langkah 3.

## 5. Saat deploy ke Vercel
Isi dua variabel yang sama di **Project Settings > Environment Variables**, lalu deploy ulang.

## Cara kerja singkat
- Pengunjung hanya bisa **membaca**. Proyek dan artikel yang tidak dicentang **Tayang** tidak muncul di web.
- Hanya user yang ada di tabel `admins` yang bisa **menulis** dan **mengunggah file**. Aturan ini dijaga database (Row Level Security), bukan hanya tampilan dashboard.
- Setelah kamu klik **Simpan**, cache web langsung dibuang, jadi perubahan tampil saat halaman dibuka lagi.
- Isi detail proyek dan artikel ditulis dalam Markdown. Klik **Cara menulis** di editor untuk melihat contohnya.
- Gambar dan CV disimpan di bucket `media`, maksimal 8 MB per file.
