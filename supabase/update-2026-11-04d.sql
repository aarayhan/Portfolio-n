-- 4 Nov 2026: bingkai foto hero. Jalankan sekali di SQL Editor SEBELUM menyimpan Profil dari dashboard. Aman diulang.
-- 'none' = tanpa bingkai (PNG tanpa latar, seperti sekarang). 'framed' = foto dengan latar, tampil dalam bingkai tinta.
alter table public.profile add column if not exists photo_frame text not null default 'none' check (photo_frame in ('none', 'framed'));

-- Kalau belum bisa masuk dashboard, bingkainya bisa diubah langsung dari sini:
-- update public.profile set photo_frame = 'framed' where id = 1;  -- pakai bingkai
-- update public.profile set photo_frame = 'none'   where id = 1;  -- tanpa bingkai
