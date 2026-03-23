-- ══════════════════════════════════════════════════════════════════
-- dashboard_tables.sql
-- Run in: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════════════════

-- ═══ USER_PROGRESS (game mastery + achievements) ═══
create table if not exists user_progress (
  user_id       uuid references auth.users(id) on delete cascade primary key,
  mastery_data  jsonb default '{}',
  achievements  jsonb default '{}',
  updated_at    timestamptz default now()
);

alter table user_progress enable row level security;

drop policy if exists "Users manage own progress" on user_progress;
create policy "Users manage own progress" on user_progress for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function update_updated_at_user_progress()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists trg_user_progress_updated on user_progress;
create trigger trg_user_progress_updated
  before update on user_progress
  for each row execute function update_updated_at_user_progress();


-- ═══ COURSE_PROGRESS (lesson tracking) ═══
create table if not exists course_progress (
  id                  uuid default gen_random_uuid() primary key,
  user_id             uuid references auth.users(id) on delete cascade,
  chapter             text not null,
  completed_at        timestamptz default now(),
  time_spent_seconds  int default 0,
  unique(user_id, chapter)
);

alter table course_progress enable row level security;

drop policy if exists "Users manage own course progress" on course_progress;
create policy "Users manage own course progress" on course_progress for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists idx_course_progress_user on course_progress(user_id);
