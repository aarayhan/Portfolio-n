-- 30 Okt 2026: screenshot proyek. File ada di public/projects, jadi tidak perlu upload.
-- Hanya mengisi proyek yang gambarnya masih kosong, gambar yang sudah kamu upload tidak ditimpa.
update public.projects set thumbnail = '/projects/paywind.webp' where slug = 'paywind' and (thumbnail is null or thumbnail = '');
update public.projects set thumbnail = '/projects/pomeloo.webp' where slug = 'pomeloo' and (thumbnail is null or thumbnail = '');
update public.projects set thumbnail = '/projects/bibliotheca.webp' where slug = 'bibliotheca' and (thumbnail is null or thumbnail = '');
update public.projects set thumbnail = '/projects/padviolett.webp' where slug = 'padviolett' and (thumbnail is null or thumbnail = '');
update public.projects set thumbnail = '/projects/trackify.webp' where slug = 'trackify' and (thumbnail is null or thumbnail = '');
