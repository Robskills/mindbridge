-- MindBridge Supabase Database Setup
-- Run this in your Supabase SQL Editor (https://app.supabase.com/project/_/sql)

-- Enable extensions
create extension if not exists "uuid-ossp";

-- =========================
-- Helper: add table to publication safely
-- =========================
do $$
begin
  -- community_groups
  begin
    alter publication supabase_realtime add table public.community_groups;
  exception
    when duplicate_object then null;
  end;

  -- group_posts
  begin
    alter publication supabase_realtime add table public.group_posts;
  exception
    when duplicate_object then null;
  end;

exception
  when others then null; -- keeps migration rerunnable even if publication exists/doesn't
end $$;

-- =========================
-- Community Groups
-- =========================
create table if not exists public.community_groups (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  description text,
  icon_emoji text default '👥',
  is_public boolean default true,
  created_at timestamp with time zone default now()
);

-- =========================
-- Group Posts
-- =========================
create table if not exists public.group_posts (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.community_groups(id) on delete cascade,
  user_id uuid references auth.users(id),
  content text not null,
  created_at timestamp with time zone default now()
);

-- =========================
-- Anonymous Journal
-- =========================
create table if not exists public.journal_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  content text not null,
  mood_tag text default 'neutral',
  created_at timestamp with time zone default now()
);

-- =========================
-- Mood Logs (PHQ-2/PHQ-9)
-- =========================
create table if not exists public.mood_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  phq2_score int default 0,
  phq9_score int,
  mood_summary text,
  created_at timestamp with time zone default now()
);

-- =========================
-- Seed MVP Groups (idempotent via upsert)
-- =========================
insert into public.community_groups (name, description, icon_emoji)
values
  ('Alcohol Anonymous', 'Peer support for managing alcohol use on campus', '🍷'),
  ('Financial Help Network', 'Share bursary tips, HELB updates, budgeting, food support', '💸'),
  ('Addiction Recovery', 'Safe space for substance recovery & relapse prevention', '🌱'),
  ('Exam Stress Support', 'Navigate academic pressure without burnout', '📚'),
  ('Cultural & Spiritual Coping', 'Faith, tradition, and community-centered grounding', '🕊️')
on conflict (name) do update
set
  description = excluded.description,
  icon_emoji = excluded.icon_emoji;

-- =========================
-- RLS Policies (Anonymous + User-owned)
-- =========================
alter table public.journal_entries enable row level security;

drop policy if exists "Users can insert own journal" on public.journal_entries;
create policy "Users can insert own journal"
on public.journal_entries
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can view own journal" on public.journal_entries;
create policy "Users can view own journal"
on public.journal_entries
for select
using (auth.uid() = user_id);

alter table public.mood_logs enable row level security;

drop policy if exists "Users can insert own mood logs" on public.mood_logs;
create policy "Users can insert own mood logs"
on public.mood_logs
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can view own mood logs" on public.mood_logs;
create policy "Users can view own mood logs"
on public.mood_logs
for select
using (auth.uid() = user_id);

alter table public.group_posts enable row level security;

drop policy if exists "Anyone can view group posts" on public.group_posts;
create policy "Anyone can view group posts"
on public.group_posts
for select
using (true);

drop policy if exists "Authenticated users can post" on public.group_posts;
create policy "Authenticated users can post"
on public.group_posts
for insert
with check (auth.uid() = user_id);
