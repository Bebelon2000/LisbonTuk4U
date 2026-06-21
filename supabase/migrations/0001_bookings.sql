-- ──────────────────────────────────────────────────────────────
-- Tabela de reservas (preenchida pelo webhook da Stripe).
-- ──────────────────────────────────────────────────────────────
create table if not exists public.bookings (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  tour_id           text,
  tour_name         text,
  tour_date         date,
  tour_time         text,
  passengers        integer,
  tuks              integer,
  amount_total      integer,            -- em cêntimos
  currency          text default 'eur',
  customer_name     text,
  customer_email    text,
  customer_phone    text,
  customer_country  text,
  stripe_session_id text unique,
  payment_status    text default 'pending'
);

create index if not exists bookings_tour_date_idx on public.bookings (tour_date);
create index if not exists bookings_created_idx on public.bookings (created_at desc);

-- Segurança: RLS ligada e SEM políticas públicas.
-- Só a service_role (usada pelo webhook) pode ler/escrever.
-- O painel do Supabase (logado) também consegue ver as reservas.
alter table public.bookings enable row level security;
