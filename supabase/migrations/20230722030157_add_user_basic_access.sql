alter table "public"."projects" alter column "name" set not null;

alter table "public"."projects" alter column "stack" set not null;

create policy "Enable read access for all users"
on "public"."portfolio_menus"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."portfolio_options"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."portfolio_texts"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."projects"
as permissive
for select
to public
using (true);



