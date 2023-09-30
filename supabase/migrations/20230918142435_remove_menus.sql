drop policy "Enable read access for all users" on "public"."portfolio_menus";

alter table "public"."portfolio_menus" drop constraint "Portfolio_Menus_pkey";

drop index if exists "public"."Portfolio_Menus_pkey";

drop table "public"."portfolio_menus";


