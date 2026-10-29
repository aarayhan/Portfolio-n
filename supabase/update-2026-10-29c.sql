-- Kolom file sertifikat (gambar atau PDF) untuk penampil di web. Jalankan sekali di SQL Editor. Aman diulang.
alter table public.certificates add column if not exists file_url text;
