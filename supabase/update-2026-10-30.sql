-- Saklar "Tampilkan artikel" di dashboard (Profil). Jalankan sekali di SQL Editor. Aman diulang.
alter table public.profile add column if not exists show_articles boolean not null default true;

-- Kalau belum bisa masuk dashboard, saklarnya bisa diubah langsung dari sini:
-- update public.profile set show_articles = false where id = 1;  -- sembunyikan
-- update public.profile set show_articles = true  where id = 1;  -- tampilkan
