-- Skema database portfolio. Jalankan sekali di Supabase: SQL Editor > New query > tempel > Run.
-- Aman dijalankan ulang (pakai "if not exists" dan "or replace").
--
-- Aturan akses:
--   - Semua orang boleh MEMBACA isi web (proyek dan artikel hanya yang published).
--   - Hanya admin yang boleh MENULIS. Admin = user yang id-nya ada di tabel admins.
--     Mendaftar akun saja tidak cukup untuk bisa mengubah isi.

-- ---------- Admin ----------

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- security definer: fungsi boleh membaca tabel admins walaupun pemanggilnya tidak bisa.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

-- ---------- Waktu ubah otomatis ----------

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- Tabel isi ----------

-- Profil: hanya satu baris (id = 1).
create table if not exists public.profile (
  id smallint primary key default 1 check (id = 1),
  name text not null,
  nickname text not null default '',
  short_name text not null default '',
  hero_lead text not null default '',
  hero_lines text[] not null default '{}',
  role text not null default '',
  city text not null default '',
  timezone text not null default 'Asia/Jakarta',
  email text not null default '',
  whatsapp text not null default '',
  cv_url text not null default '',
  photo_url text,
  socials jsonb not null default '[]' check (jsonb_typeof(socials) = 'array'),
  stats jsonb not null default '[]' check (jsonb_typeof(stats) = 'array'),
  i18n jsonb not null check (i18n ? 'id' and i18n ? 'en'),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  sort integer not null default 0,
  published boolean not null default false,
  stack text[] not null default '{}',
  year text not null default '',
  thumbnail text,
  live_url text,
  repo_url text,
  i18n jsonb not null check (i18n ? 'id' and i18n ? 'en'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  published boolean not null default false,
  date date not null default current_date,
  cover text,
  i18n jsonb not null check (i18n ? 'id' and i18n ? 'en'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Pengalaman dan pendidikan dalam satu tabel. kind menentukan tampil di daftar mana.
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  sort integer not null default 0,
  kind text not null default 'work' check (kind in ('education', 'work', 'organization', 'achievement')),
  url text,
  i18n jsonb not null check (i18n ? 'id' and i18n ? 'en'),
  updated_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  sort integer not null default 0,
  title text not null,
  issuer text not null default '',
  year text not null default '',
  credential_id text not null default '',
  verify_url text not null default '',
  updated_at timestamptz not null default now()
);
-- Ditambah 30 Okt 2026: saklar tampil/sembunyikan semua artikel.
alter table public.profile add column if not exists show_articles boolean not null default true;
-- Ditambah 29 Okt 2026: file sertifikat (gambar atau PDF) untuk penampil di web.
alter table public.certificates add column if not exists file_url text;

create table if not exists public.skill_groups (
  id uuid primary key default gen_random_uuid(),
  sort integer not null default 0,
  name text not null,
  items text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  sort integer not null default 0,
  i18n jsonb not null check (i18n ? 'id' and i18n ? 'en'),
  updated_at timestamptz not null default now()
);

-- ---------- Trigger, RLS, policy, hak akses ----------

do $$
declare
  t text;
begin
  foreach t in array array['profile', 'projects', 'articles', 'experiences', 'certificates', 'skill_groups', 'services']
  loop
    execute format('drop trigger if exists touch_updated_at on public.%I', t);
    execute format('create trigger touch_updated_at before update on public.%I for each row execute function public.touch_updated_at()', t);

    execute format('alter table public.%I enable row level security', t);

    execute format('drop policy if exists "admin menulis" on public.%I', t);
    execute format('create policy "admin menulis" on public.%I for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))', t);

    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
  end loop;
end;
$$;

-- Baca publik. Proyek dan artikel draft hanya terlihat oleh admin.
drop policy if exists "publik membaca" on public.profile;
create policy "publik membaca" on public.profile for select to anon, authenticated using (true);
drop policy if exists "publik membaca" on public.experiences;
create policy "publik membaca" on public.experiences for select to anon, authenticated using (true);
drop policy if exists "publik membaca" on public.certificates;
create policy "publik membaca" on public.certificates for select to anon, authenticated using (true);
drop policy if exists "publik membaca" on public.skill_groups;
create policy "publik membaca" on public.skill_groups for select to anon, authenticated using (true);
drop policy if exists "publik membaca" on public.services;
create policy "publik membaca" on public.services for select to anon, authenticated using (true);
drop policy if exists "publik membaca" on public.projects;
create policy "publik membaca" on public.projects for select to anon, authenticated using (published or (select public.is_admin()));
drop policy if exists "publik membaca" on public.articles;
create policy "publik membaca" on public.articles for select to anon, authenticated using (published or (select public.is_admin()));

-- Tabel admins: user hanya bisa melihat barisnya sendiri (dipakai dashboard untuk cek status admin).
-- Tidak ada policy tulis: admin ditambahkan lewat SQL Editor, bukan dari web.
alter table public.admins enable row level security;
drop policy if exists "lihat diri sendiri" on public.admins;
create policy "lihat diri sendiri" on public.admins for select to authenticated using (user_id = (select auth.uid()));
grant select on public.admins to authenticated;

grant execute on function public.is_admin() to anon, authenticated;

-- ---------- Penyimpanan file (foto, gambar proyek, CV) ----------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "admin unggah media" on storage.objects;
create policy "admin unggah media" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and (select public.is_admin()));
drop policy if exists "admin ubah media" on storage.objects;
create policy "admin ubah media" on storage.objects for update to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));
drop policy if exists "admin hapus media" on storage.objects;
create policy "admin hapus media" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));
