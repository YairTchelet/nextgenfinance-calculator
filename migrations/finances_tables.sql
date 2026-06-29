-- ══════════════════════════════════════════════════════════════════
-- finances_tables.sql — הבית הפיננסי (household finance manager)
-- Phase 1 schema: accounts, categories, bills, receipts, transactions,
-- support, goals, recurring, settings + fx_rate trigger + RLS.
-- Run in: Supabase Dashboard → SQL Editor (or via MCP apply_migration).
-- Create order matters: a referenced table must exist first.
-- ══════════════════════════════════════════════════════════════════

-- ═══ ACCOUNTS ═══
create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  holder text not null check (holder in ('joint','yair','bayla')),
  type text not null check (type in ('checking','savings','credit','cash','investment','loan')),
  currency text not null default 'ILS',
  balance numeric not null default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ═══ CATEGORIES ═══
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  kind text not null check (kind in ('expense','income')),
  monthly_budget numeric,
  color text,
  icon text
);

-- ═══ BILLS (utilities + arnona + gas: amount AND consumption) ═══
-- period_start/end drive the chart x-axis — electric is BI-MONTHLY in IL.
create table if not exists bills (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('electric','water','gas','arnona','other')),
  provider text,
  period_start date,
  period_end date,
  amount numeric not null,
  currency text default 'ILS',
  consumption numeric,
  unit text,
  benefit_offset numeric default 0,
  net_amount numeric generated always as (amount - coalesce(benefit_offset,0)) stored,
  meter_reading numeric,
  created_at timestamptz default now()
);

-- ═══ RECEIPTS (a parsed PDF receipt; line items live in transactions) ═══
create table if not exists receipts (
  id uuid primary key default gen_random_uuid(),
  ts timestamptz default now(),
  account_id uuid references accounts(id),
  merchant text,
  total numeric,
  currency text default 'ILS',
  status text default 'pending' check (status in ('pending','confirmed')),
  file_ref text,
  raw_text text,
  created_at timestamptz default now()
);

-- ═══ TRANSACTIONS (every money movement) ═══
-- amount_ils is a stored generated column (amount * fx_rate) — can't be bypassed.
-- fx_rate is a LOOKUP, filled by the set_fx_rate() trigger when null.
create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  ts timestamptz not null default now(),
  account_id uuid references accounts(id),
  direction text not null check (direction in ('in','out')),
  amount numeric not null,
  currency text not null default 'ILS',
  fx_rate numeric,
  amount_ils numeric generated always as (amount * fx_rate) stored,
  category_id uuid references categories(id),
  member text check (member in ('yair','bayla','joint')),
  merchant text,
  note text,
  recurrence text not null default 'one_off' check (recurrence in ('one_off','recurring')),
  source text not null,
  support_source text,
  raw_text text,
  receipt_id uuid references receipts(id),
  created_at timestamptz default now()
);

-- ═══ SUPPORT (NON-CASH value only: exemptions) ═══
-- cash benefits live in transactions (tagged via support_source).
create table if not exists support (
  id uuid primary key default gen_random_uuid(),
  ts timestamptz default now(),
  source text not null check (source in ('army','other')),
  kind text not null default 'exemption' check (kind in ('exemption')),
  label text,
  amount numeric not null,
  currency text default 'ILS',
  recurrence text default 'recurring',
  bill_id uuid references bills(id),
  note text,
  created_at timestamptz default now()
);

-- ═══ GOALS ═══
create table if not exists goals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text,
  color text,
  target numeric not null,
  saved numeric default 0,
  target_date date,
  monthly_contribution numeric,
  account_id uuid references accounts(id),
  created_at timestamptz default now()
);

-- ═══ RECURRING ═══
create table if not exists recurring (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  direction text not null check (direction in ('in','out')),
  amount numeric not null,
  currency text default 'ILS',
  category_id uuid references categories(id),
  bill_type text,
  account_id uuid references accounts(id),
  day_of_month int,
  months int[],
  source text,
  note text,
  active boolean default true
);

-- ═══ SETTINGS (key/value, e.g. cad_to_ils) ═══
create table if not exists settings (
  key text primary key,
  value jsonb
);

-- ═══ FX RATE TRIGGER ═══════════════════════════════════════════════
-- Fills transactions.fx_rate from settings on write when null.
-- BEFORE trigger → runs before the generated amount_ils is computed.
create or replace function set_fx_rate() returns trigger as $$
begin
  if new.fx_rate is null then
    new.fx_rate := case
      when new.currency = 'ILS' then 1
      else coalesce((select (value #>> '{}')::numeric from settings where key = 'cad_to_ils'), 1)
    end;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_set_fx_rate on transactions;
create trigger trg_set_fx_rate before insert or update on transactions
  for each row execute function set_fx_rate();

-- ═══ INDEXES ═══════════════════════════════════════════════════════
create index if not exists idx_transactions_ts        on transactions (ts);
create index if not exists idx_transactions_category  on transactions (category_id);
create index if not exists idx_transactions_account   on transactions (account_id);
create index if not exists idx_transactions_support   on transactions (support_source) where support_source is not null;
create index if not exists idx_bills_type_period      on bills (type, period_start);

-- ═══ ROW LEVEL SECURITY ════════════════════════════════════════════
-- Joint pot for exactly two people (Yair + Bayla). No per-row user_id —
-- the whole household shares every row. The anon key ships in the public
-- page, so RLS is the real boundary: read/write allowed only to the two
-- whitelisted auth UIDs. Swap the two UUIDs below in this ONE function.
-- Yair  = yairtchelet@gmail.com (real UID below).
-- Bayla = TODO: replace the zero-UUID once Bayla's auth account is known
--         (no current auth.users row clearly maps to Bayla).
create or replace function is_household_member() returns boolean
language sql stable as $$
  select auth.uid() in (
    '01b96d2c-fe06-4b7f-8bad-59a0dd8cacbe'::uuid,  -- Yair
    '00000000-0000-0000-0000-000000000000'::uuid   -- Bayla — TODO replace
  );
$$;

do $$
declare t text;
begin
  foreach t in array array[
    'accounts','categories','bills','receipts','transactions',
    'support','goals','recurring','settings'
  ] loop
    execute format('alter table %I enable row level security;', t);
    execute format('drop policy if exists "Household members full access" on %I;', t);
    execute format(
      'create policy "Household members full access" on %I for all using (is_household_member()) with check (is_household_member());',
      t
    );
  end loop;
end $$;
