-- ================================================================
-- Botanica database schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- ================================================================

-- ── Profiles ────────────────────────────────────────────────────
-- Extends Supabase auth.users with app-specific fields.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  location_label text,         -- human-readable, e.g. "Portland, OR"
  location_lat double precision,
  location_lng double precision,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Lesson Progress ─────────────────────────────────────────────
create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  completed boolean not null default false,
  sections_completed text[] not null default '{}',
  quiz_score integer,
  quiz_attempts integer not null default 0,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "Users can view own lesson progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own lesson progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own lesson progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── User Settings (streak, achievements, etc.) ──────────────────
create table public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  unlocked_achievements text[] not null default '{}',
  streak integer not null default 0,
  last_active_date date,
  updated_at timestamptz not null default now()
);

alter table public.user_settings enable row level security;

create policy "Users can view own settings"
  on public.user_settings for select
  using (auth.uid() = user_id);

create policy "Users can insert own settings"
  on public.user_settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own settings"
  on public.user_settings for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Auto-create settings row when a profile is created
create or replace function public.handle_new_profile()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.user_settings (user_id)
  values (new.id);
  return new;
end;
$$;

create trigger on_profile_created
  after insert on public.profiles
  for each row execute function public.handle_new_profile();

-- ── Indexes ─────────────────────────────────────────────────────
create index idx_lesson_progress_user on public.lesson_progress(user_id);

-- ── Disable realtime on all tables (opt-in later if needed) ─────
-- Supabase enables realtime by default on new tables in some configs.
-- We explicitly remove them from the realtime publication if they were added.
do $$
begin
  if exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'profiles'
  ) then
    alter publication supabase_realtime drop table public.profiles;
  end if;

  if exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'lesson_progress'
  ) then
    alter publication supabase_realtime drop table public.lesson_progress;
  end if;

  if exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'user_settings'
  ) then
    alter publication supabase_realtime drop table public.user_settings;
  end if;
end;
$$;
