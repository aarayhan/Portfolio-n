-- 4 Nov 2026: screenshot GrandKos (data palsu dari seeder). File ada di public/projects.
update public.projects set thumbnail = '/projects/grandkos.webp' where slug = 'grandkos' and (thumbnail is null or thumbnail = '');
