-- 4 Nov 2026: screenshot Filmer. File ada di public/projects.
update public.projects set thumbnail = '/projects/filmer.webp' where slug = 'filmer' and (thumbnail is null or thumbnail = '');
