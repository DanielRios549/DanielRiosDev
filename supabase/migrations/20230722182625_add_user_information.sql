create table "public"."users" (
    "id" uuid not null,
    "name" text not null,
    "username" text not null,
    "image" text
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_id_fkey";

create policy "Let Users Access their Information"
on "public"."users"
as permissive
for select
to public
using ((auth.uid() = id));



