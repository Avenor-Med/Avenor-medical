-- Avenor Medical — production schema v2
-- Postgres 15 / Supabase. Run in SQL Editor, or via supabase db push.
--
-- Design notes:
--   * Every table has RLS enabled with explicit policies.
--   * Soft deletes via deleted_at; queries filter on it.
--   * updated_at maintained by trigger.
--   * audit_log is append-only (no update/delete policies at all).

-- ---------------------------------------------------------------
-- Roles + profiles
-- ---------------------------------------------------------------
create type user_role as enum ('practitioner', 'recruiter', 'cs', 'facility', 'admin');

create table profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  role        user_role not null default 'practitioner',
  full_name   text,
  phone       text,
  facility_id uuid,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

-- Auto-create a profile when a user signs up.
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ---------------------------------------------------------------
-- Facilities + jobs
-- ---------------------------------------------------------------
create table facilities (
  id          uuid primary key default gen_random_uuid(),
  source_id   text unique,
  name        text not null,
  city        text,
  state       char(2),
  type        text,
  ats_source  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create table jobs (
  id                text primary key,          -- "{source}::{source_id}"
  source            text not null,
  facility_id       uuid references facilities (id),
  title             text not null,
  profession        text,
  specialty         text,
  city              text,
  state             char(2),
  shift_type        text,
  hours_per_week    int,
  duration_weeks    int,
  rate_usd          numeric(10,2),
  job_type          text,
  visa_support      boolean default false,
  signing_bonus_usd int,
  requirements      text,
  description       text,
  status            text not null default 'open',
  posted_at         timestamptz,
  expires_at        timestamptz,
  last_seen_at      timestamptz not null default now(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  deleted_at        timestamptz
);

-- Search-path indexes: the job board filters on these constantly.
create index jobs_status_idx      on jobs (status) where deleted_at is null;
create index jobs_state_idx       on jobs (state) where deleted_at is null;
create index jobs_specialty_idx   on jobs (specialty) where deleted_at is null;
create index jobs_profession_idx  on jobs (profession) where deleted_at is null;
create index jobs_posted_at_idx   on jobs (posted_at desc) where deleted_at is null;
create index jobs_source_seen_idx on jobs (source, last_seen_at);

-- ---------------------------------------------------------------
-- Decision makers — facility-side CRM
--
-- Who signs, who influences, who gates. Buying preferences and personal
-- notes live here so any recruiter can pick up an account without
-- starting the relationship cold.
-- ---------------------------------------------------------------
create type dm_level      as enum ('primary', 'influencer', 'gatekeeper', 'executive', 'billing');
create type dm_contact    as enum ('phone', 'email', 'text');
create type dm_relationship as enum ('new', 'warm', 'active_client', 'former_client');

create table decision_makers (
  id          uuid primary key default gen_random_uuid(),
  facility_id uuid references facilities (id) on delete cascade,

  -- Basic information
  first_name   text not null,
  last_name    text not null,
  job_title    text,
  department   text,
  email        text,
  direct_phone text,
  mobile_phone text,
  extension    text,

  -- Decision information
  level              dm_level not null default 'influencer',
  hiring_authority   boolean not null default false,
  can_sign_contracts boolean not null default false,
  budget_owner       boolean not null default false,

  -- Communication
  preferred_contact dm_contact default 'email',
  best_time_to_call text,
  time_zone         text,
  last_contact_at   date,
  next_follow_up_at date,

  -- Relationship
  relationship   dm_relationship not null default 'new',
  last_notes     text,
  personal_notes text,

  -- Staffing responsibilities (what they hire for)
  hires text[] default '{}',   -- Physicians, Nurse Practitioners, Physician
                               -- Assistants, CRNAs, RNs, Allied Health,
                               -- Locum Tenens, Permanent Placement

  -- Buying preferences
  typical_fill_time        text,
  preferred_contract_length text,
  uses_msp_vms             boolean,
  vendor_credentialing_req boolean,
  uses_internal_recruiters boolean,
  current_vendor           text,
  annual_spend_usd         numeric(14,2),

  owner_id   uuid references profiles (id),   -- assigned recruiter
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- Follow-up queue is the most-hit query: "who do I call today?"
create index dm_follow_up_idx on decision_makers (next_follow_up_at)
  where deleted_at is null;
create index dm_facility_idx  on decision_makers (facility_id) where deleted_at is null;
create index dm_owner_idx     on decision_makers (owner_id) where deleted_at is null;
create index dm_level_idx     on decision_makers (level) where deleted_at is null;

-- Contact activity — every call, email, and meeting, append-only in practice.
create table decision_maker_activity (
  id               bigint generated always as identity primary key,
  decision_maker_id uuid not null references decision_makers (id) on delete cascade,
  actor_id         uuid references profiles (id),
  activity_type    text not null,   -- call | email | meeting | note | proposal
  summary          text,
  occurred_at      timestamptz not null default now()
);

create index dm_activity_idx on decision_maker_activity (decision_maker_id, occurred_at desc);

-- ---------------------------------------------------------------
-- Resumes + parsing
-- ---------------------------------------------------------------
create table resumes (
  id                uuid primary key default gen_random_uuid(),
  owner_id          uuid references profiles (id),
  original_filename text not null,
  storage_path      text not null,             -- private bucket path
  raw_text          text,
  status            text not null default 'pending',  -- pending|parsed|matched|failed
  error_message     text,
  -- Parse failures are recoverable: the file is already stored, so the hourly
  -- retry cron re-attempts until this hits the cap.
  retry_count       int not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  deleted_at        timestamptz
);

create index resumes_owner_idx  on resumes (owner_id) where deleted_at is null;
create index resumes_status_idx on resumes (status) where deleted_at is null;
-- Keeps the retry sweep cheap as volume grows.
create index resumes_retry_idx  on resumes (status, retry_count, created_at)
  where deleted_at is null and status in ('pending','failed');

create table parsed_profiles (
  resume_id           uuid primary key references resumes (id) on delete cascade,
  full_name           text,
  email               text,
  phone               text,
  profession          text,
  specialty           text,
  sub_specialties     text[],
  years_experience    int,
  certifications      text[],
  spoken_languages    text[],
  willing_to_travel   boolean,
  visa_status         text,
  preferred_locations text[],
  summary             text,
  parsed_at           timestamptz not null default now()
);

create table licenses (
  id                  bigint generated always as identity primary key,
  resume_id           uuid not null references resumes (id) on delete cascade,
  state               char(2),
  license_number      text,
  profession          text,
  expiration_date     date,
  verification_status text not null default 'unverified',
  verified_at         timestamptz
);

create index licenses_resume_idx on licenses (resume_id);
create index licenses_expiry_idx on licenses (expiration_date);

create table job_matches (
  id          bigint generated always as identity primary key,
  resume_id   uuid not null references resumes (id) on delete cascade,
  job_id      text not null references jobs (id),
  match_pct   int not null check (match_pct between 0 and 100),
  score       numeric(8,3),
  reasons     jsonb,
  flags       jsonb,
  computed_at timestamptz not null default now(),
  unique (resume_id, job_id)
);

create index job_matches_resume_idx on job_matches (resume_id, match_pct desc);

-- ---------------------------------------------------------------
-- Audit log — append-only
-- ---------------------------------------------------------------
create table audit_log (
  id          bigint generated always as identity primary key,
  actor_id    uuid,
  action      text not null,       -- login, upload, download, role_change, ...
  entity      text,
  entity_id   text,
  detail      jsonb,
  ip          inet,
  occurred_at timestamptz not null default now()
);

create index audit_log_actor_idx    on audit_log (actor_id, occurred_at desc);
create index audit_log_occurred_idx on audit_log (occurred_at desc);

-- ---------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger dm_touch         before update on decision_makers for each row execute function touch_updated_at();
create trigger profiles_touch   before update on profiles   for each row execute function touch_updated_at();
create trigger facilities_touch before update on facilities for each row execute function touch_updated_at();
create trigger jobs_touch       before update on jobs       for each row execute function touch_updated_at();
create trigger resumes_touch    before update on resumes    for each row execute function touch_updated_at();

-- ---------------------------------------------------------------
-- Row-Level Security
-- ---------------------------------------------------------------
alter table profiles        enable row level security;
alter table facilities      enable row level security;
alter table jobs            enable row level security;
alter table resumes         enable row level security;
alter table parsed_profiles enable row level security;
alter table licenses        enable row level security;
alter table job_matches     enable row level security;
alter table audit_log       enable row level security;
alter table decision_makers enable row level security;
alter table decision_maker_activity enable row level security;

-- Helper: current user's role.
create or replace function current_role_of()
returns user_role language sql stable security definer set search_path = public as $$
  select role from profiles where id = auth.uid();
$$;

-- profiles: users see themselves; staff see all; only admin changes roles.
create policy "own profile read"  on profiles for select using (id = auth.uid());
create policy "staff read all"    on profiles for select using (current_role_of() in ('recruiter','cs','admin'));
create policy "own profile write" on profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = (select role from profiles where id = auth.uid()));
create policy "admin write"       on profiles for update using (current_role_of() = 'admin');

-- jobs + facilities: public read (job board), staff write.
create policy "public jobs read"       on jobs       for select using (deleted_at is null and status = 'open');
create policy "staff jobs read"        on jobs       for select using (current_role_of() in ('recruiter','cs','admin'));
create policy "staff jobs write"       on jobs       for all    using (current_role_of() in ('cs','admin'));
create policy "public facilities read" on facilities for select using (deleted_at is null);
create policy "staff facilities write" on facilities for all    using (current_role_of() in ('cs','admin'));

-- resumes: owners + staff only. Facilities never see raw resumes.
create policy "own resume"        on resumes for select using (owner_id = auth.uid());
create policy "own resume insert" on resumes for insert with check (owner_id = auth.uid());
create policy "staff resume read" on resumes for select using (current_role_of() in ('recruiter','cs','admin'));

create policy "own parsed"        on parsed_profiles for select using (resume_id in (select id from resumes where owner_id = auth.uid()));
create policy "staff parsed read" on parsed_profiles for select using (current_role_of() in ('recruiter','cs','admin'));

create policy "own licenses"        on licenses for select using (resume_id in (select id from resumes where owner_id = auth.uid()));
create policy "staff licenses read" on licenses for select using (current_role_of() in ('recruiter','cs','admin'));

create policy "own matches"        on job_matches for select using (resume_id in (select id from resumes where owner_id = auth.uid()));
create policy "staff matches read" on job_matches for select using (current_role_of() in ('recruiter','cs','admin'));

-- decision_makers: internal sales data. Staff only — practitioners and
-- facility users must never see contact intel or spend figures.
create policy "staff dm read"  on decision_makers for select
  using (current_role_of() in ('recruiter','cs','admin'));
create policy "staff dm write" on decision_makers for all
  using (current_role_of() in ('recruiter','cs','admin'));
create policy "staff dm activity read"  on decision_maker_activity for select
  using (current_role_of() in ('recruiter','cs','admin'));
create policy "staff dm activity write" on decision_maker_activity for insert
  with check (current_role_of() in ('recruiter','cs','admin'));

-- audit_log: admin read-only. No update/delete policies exist — append-only.
create policy "admin audit read" on audit_log for select using (current_role_of() = 'admin');
create policy "any insert"       on audit_log for insert with check (true);

-- ---------------------------------------------------------------
-- Storage: private resumes bucket
-- ---------------------------------------------------------------
insert into storage.buckets (id, name, public) values ('resumes', 'resumes', false);

create policy "own files read"  on storage.objects for select using (bucket_id = 'resumes' and owner = auth.uid());
create policy "own files write" on storage.objects for insert with check (bucket_id = 'resumes' and owner = auth.uid());
