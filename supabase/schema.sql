create table public.guestbook_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 80),
  message text not null check (char_length(btrim(message)) between 1 and 1000),
  created_at timestamptz not null default now()
);

alter table public.guestbook_messages enable row level security;

create policy "Guestbook messages are publicly readable"
  on public.guestbook_messages
  for select
  to anon
  using (true);

create policy "Anyone can post a guestbook message"
  on public.guestbook_messages
  for insert
  to anon
  with check (
    char_length(btrim(name)) between 1 and 80
    and char_length(btrim(message)) between 1 and 1000
  );

grant select, insert on table public.guestbook_messages to anon;
