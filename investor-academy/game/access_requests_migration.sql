-- Run this in Supabase SQL editor to create the access_requests table
-- Dashboard → SQL editor → paste & run

create table if not exists public.access_requests (
    id            uuid primary key default gen_random_uuid(),
    user_id       uuid references auth.users(id) on delete cascade,
    email         text,
    requested_at  timestamptz not null default now(),
    status        text not null default 'pending',
    notes         text
);

-- Index for admin queries
create index if not exists access_requests_user_id_idx on public.access_requests(user_id);
create index if not exists access_requests_status_idx  on public.access_requests(status);

-- RLS: users can insert their own requests; only service role reads
alter table public.access_requests enable row level security;

create policy "Users can insert own access request"
    on public.access_requests for insert
    with check (auth.uid() = user_id);
