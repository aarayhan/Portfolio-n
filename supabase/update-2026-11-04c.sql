-- 4 Nov 2026: screenshot MayKos (kos fiktif, data demo). File ada di public/projects.
update public.projects set thumbnail = '/projects/maykos.webp' where slug = 'maykos' and (thumbnail is null or thumbnail = '');
update public.projects set year = '2026, beta' where slug = 'maykos' and year = '2026';
