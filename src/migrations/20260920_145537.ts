import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en');
  CREATE TYPE "public"."enum_sections_blocks_areas_we_serve_towns_column" AS ENUM('main', 'map');
  CREATE TYPE "public"."enum_sections_blocks_photo_heading_band_heading_size" AS ENUM('title', 'display');
  CREATE TYPE "public"."enum_sections_blocks_photo_heading_band_text_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_sections_blocks_photo_heading_band_overlay_color" AS ENUM('none', '#35ba57');
  CREATE TYPE "public"."enum_sections_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__sections_v_blocks_areas_we_serve_towns_column" AS ENUM('main', 'map');
  CREATE TYPE "public"."enum__sections_v_blocks_photo_heading_band_heading_size" AS ENUM('title', 'display');
  CREATE TYPE "public"."enum__sections_v_blocks_photo_heading_band_text_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__sections_v_blocks_photo_heading_band_overlay_color" AS ENUM('none', '#35ba57');
  CREATE TYPE "public"."enum__sections_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__sections_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_pages_blocks_areas_we_serve_towns_column" AS ENUM('main', 'map');
  CREATE TYPE "public"."enum_pages_blocks_photo_heading_band_heading_size" AS ENUM('title', 'display');
  CREATE TYPE "public"."enum_pages_blocks_photo_heading_band_text_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_photo_heading_band_overlay_color" AS ENUM('none', '#35ba57');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_areas_we_serve_towns_column" AS ENUM('main', 'map');
  CREATE TYPE "public"."enum__pages_v_blocks_photo_heading_band_heading_size" AS ENUM('title', 'display');
  CREATE TYPE "public"."enum__pages_v_blocks_photo_heading_band_text_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_photo_heading_band_overlay_color" AS ENUM('none', '#35ba57');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_site_globals_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_globals_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_globals_v_published_locale" AS ENUM('en');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "sections_blocks_navbar_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "sections_blocks_navbar_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_navbar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"search_action" varchar,
  	"services_href" varchar,
  	"call_href" varchar,
  	"primary_href" varchar,
  	"how_it_works_href" varchar,
  	"faqs_href" varchar,
  	"contact_href" varchar,
  	"facebook_href" varchar,
  	"instagram_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_navbar_locales" (
  	"search_placeholder" varchar,
  	"services_label" varchar,
  	"call_label" varchar,
  	"primary_label" varchar,
  	"how_it_works_label" varchar,
  	"faqs_label" varchar,
  	"contact_label" varchar,
  	"brand_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_announcement_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_announcement_bar_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"review_button_href" varchar,
  	"search_action" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_hero_locales" (
  	"headline_line1" varchar,
  	"headline_line2" varchar,
  	"review_eyebrow" varchar,
  	"review_heading" varchar,
  	"reviewer_name" varchar,
  	"review_text" varchar,
  	"review_button_label" varchar,
  	"powered_by_label" varchar,
  	"search_placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_services_overview_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "sections_blocks_services_overview_pills_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_services_overview_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "sections_blocks_services_overview_bullets_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_services_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"learn_more_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_services_overview_locales" (
  	"heading" varchar,
  	"learn_more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_service_highlights_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"call_href" varchar,
  	"book_us_now_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_service_highlights_strip_locales" (
  	"heading" varchar,
  	"junk_removal_label" varchar,
  	"cleanouts_label" varchar,
  	"light_demolitions_label" varchar,
  	"location_line1" varchar,
  	"location_line2" varchar,
  	"call_label" varchar,
  	"book_us_now_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_our_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_our_mission_locales" (
  	"heading" varchar,
  	"mission_paragraph1" varchar,
  	"mission_paragraph2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "sections_blocks_how_it_works_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"book_us_now_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_how_it_works_locales" (
  	"heading" varchar,
  	"book_us_now_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_brand_divider1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_brand_divider1_locales" (
  	"tagline_line1" varchar,
  	"tagline_line2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_our_services_triptych" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_our_services_triptych_locales" (
  	"heading" varchar,
  	"residential_label" varchar,
  	"commercial_label" varchar,
  	"light_demolition_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_our_results_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"before_image_id" integer,
  	"after_image_id" integer
  );
  
  CREATE TABLE "sections_blocks_our_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"watermark_logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_our_results_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_areas_we_serve_towns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"column" "enum_sections_blocks_areas_we_serve_towns_column" DEFAULT 'main'
  );
  
  CREATE TABLE "sections_blocks_areas_we_serve_towns_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_areas_we_serve" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"map_embed_url" varchar,
  	"map_link_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_areas_we_serve_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "sections_blocks_faq_accordion_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_faq_accordion_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_brand_divider2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_brand_divider2_locales" (
  	"tagline_line1" varchar,
  	"tagline_line2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_contact_us_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "sections_blocks_contact_us_hours_locales" (
  	"day" varchar,
  	"hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_contact_us_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "sections_blocks_contact_us_categories_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_contact_us_weekly_template_slots" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "sections_blocks_contact_us_weekly_template_slots_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_contact_us_weekly_template" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"closed" boolean DEFAULT false
  );
  
  CREATE TABLE "sections_blocks_contact_us_weekly_template_locales" (
  	"day_label" varchar,
  	"closed_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"steps_icon_id" integer,
  	"next_month_href" varchar,
  	"form_action" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_contact_us_locales" (
  	"heading" varchar,
  	"intro_line1" varchar,
  	"intro_line2" varchar,
  	"intro_note" varchar,
  	"steps_heading" varchar,
  	"hours_heading" varchar,
  	"tell_us_more_label" varchar,
  	"search_placeholder" varchar,
  	"next_month_label" varchar,
  	"available_label" varchar,
  	"selected_label" varchar,
  	"closed_legend_label" varchar,
  	"details_label" varchar,
  	"details_placeholder" varchar,
  	"upload_label" varchar,
  	"submit_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"services_href" varchar,
  	"privacy_href" varchar,
  	"terms_href" varchar,
  	"facebook_href" varchar,
  	"instagram_href" varchar,
  	"logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_footer_locales" (
  	"services_label" varchar,
  	"privacy_label" varchar,
  	"terms_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_photo_heading_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"heading_size" "enum_sections_blocks_photo_heading_band_heading_size" DEFAULT 'title',
  	"text_align" "enum_sections_blocks_photo_heading_band_text_align" DEFAULT 'left',
  	"overlay_color" "enum_sections_blocks_photo_heading_band_overlay_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_photo_heading_band_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_what_do_you_need" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_what_do_you_need_locales" (
  	"headline" varchar,
  	"paragraph" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_highlight_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections_blocks_highlight_bar_locales" (
  	"residential_label" varchar,
  	"same_day_label" varchar,
  	"no_heavy_lifting_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_services_selector_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_href" varchar
  );
  
  CREATE TABLE "sections_blocks_services_selector_items_locales" (
  	"label" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_blocks_services_selector" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_sections_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_navbar_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_navbar_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_navbar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"search_action" varchar,
  	"services_href" varchar,
  	"call_href" varchar,
  	"primary_href" varchar,
  	"how_it_works_href" varchar,
  	"faqs_href" varchar,
  	"contact_href" varchar,
  	"facebook_href" varchar,
  	"instagram_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_navbar_locales" (
  	"search_placeholder" varchar,
  	"services_label" varchar,
  	"call_label" varchar,
  	"primary_label" varchar,
  	"how_it_works_label" varchar,
  	"faqs_label" varchar,
  	"contact_label" varchar,
  	"brand_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_announcement_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_announcement_bar_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"review_button_href" varchar,
  	"search_action" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_hero_locales" (
  	"headline_line1" varchar,
  	"headline_line2" varchar,
  	"review_eyebrow" varchar,
  	"review_heading" varchar,
  	"reviewer_name" varchar,
  	"review_text" varchar,
  	"review_button_label" varchar,
  	"powered_by_label" varchar,
  	"search_placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_services_overview_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_services_overview_pills_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_services_overview_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_services_overview_bullets_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_services_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"learn_more_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_services_overview_locales" (
  	"heading" varchar,
  	"learn_more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_service_highlights_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"call_href" varchar,
  	"book_us_now_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_service_highlights_strip_locales" (
  	"heading" varchar,
  	"junk_removal_label" varchar,
  	"cleanouts_label" varchar,
  	"light_demolitions_label" varchar,
  	"location_line1" varchar,
  	"location_line2" varchar,
  	"call_label" varchar,
  	"book_us_now_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_our_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_our_mission_locales" (
  	"heading" varchar,
  	"mission_paragraph1" varchar,
  	"mission_paragraph2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_how_it_works_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"book_us_now_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_how_it_works_locales" (
  	"heading" varchar,
  	"book_us_now_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_brand_divider1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_brand_divider1_locales" (
  	"tagline_line1" varchar,
  	"tagline_line2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_our_services_triptych" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_our_services_triptych_locales" (
  	"heading" varchar,
  	"residential_label" varchar,
  	"commercial_label" varchar,
  	"light_demolition_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_our_results_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"before_image_id" integer,
  	"after_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_our_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"watermark_logo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_our_results_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_areas_we_serve_towns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"column" "enum__sections_v_blocks_areas_we_serve_towns_column" DEFAULT 'main',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_areas_we_serve_towns_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_areas_we_serve" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"map_embed_url" varchar,
  	"map_link_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_areas_we_serve_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_faq_accordion_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_faq_accordion_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_brand_divider2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_brand_divider2_locales" (
  	"tagline_line1" varchar,
  	"tagline_line2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_contact_us_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_contact_us_hours_locales" (
  	"day" varchar,
  	"hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_contact_us_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_contact_us_categories_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_contact_us_weekly_template_slots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_contact_us_weekly_template_slots_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_contact_us_weekly_template" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"closed" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_contact_us_weekly_template_locales" (
  	"day_label" varchar,
  	"closed_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"steps_icon_id" integer,
  	"next_month_href" varchar,
  	"form_action" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_contact_us_locales" (
  	"heading" varchar,
  	"intro_line1" varchar,
  	"intro_line2" varchar,
  	"intro_note" varchar,
  	"steps_heading" varchar,
  	"hours_heading" varchar,
  	"tell_us_more_label" varchar,
  	"search_placeholder" varchar,
  	"next_month_label" varchar,
  	"available_label" varchar,
  	"selected_label" varchar,
  	"closed_legend_label" varchar,
  	"details_label" varchar,
  	"details_placeholder" varchar,
  	"upload_label" varchar,
  	"submit_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"services_href" varchar,
  	"privacy_href" varchar,
  	"terms_href" varchar,
  	"facebook_href" varchar,
  	"instagram_href" varchar,
  	"logo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_footer_locales" (
  	"services_label" varchar,
  	"privacy_label" varchar,
  	"terms_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_photo_heading_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"heading_size" "enum__sections_v_blocks_photo_heading_band_heading_size" DEFAULT 'title',
  	"text_align" "enum__sections_v_blocks_photo_heading_band_text_align" DEFAULT 'left',
  	"overlay_color" "enum__sections_v_blocks_photo_heading_band_overlay_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_photo_heading_band_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_what_do_you_need" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_what_do_you_need_locales" (
  	"headline" varchar,
  	"paragraph" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_highlight_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_highlight_bar_locales" (
  	"residential_label" varchar,
  	"same_day_label" varchar,
  	"no_heavy_lifting_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_services_selector_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sections_v_blocks_services_selector_items_locales" (
  	"label" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sections_v_blocks_services_selector" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sections_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__sections_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__sections_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_sections_v_locales" (
  	"version_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_navbar_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_navbar_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_navbar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"search_action" varchar,
  	"services_href" varchar,
  	"call_href" varchar,
  	"primary_href" varchar,
  	"how_it_works_href" varchar,
  	"faqs_href" varchar,
  	"contact_href" varchar,
  	"facebook_href" varchar,
  	"instagram_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_navbar_locales" (
  	"search_placeholder" varchar,
  	"services_label" varchar,
  	"call_label" varchar,
  	"primary_label" varchar,
  	"how_it_works_label" varchar,
  	"faqs_label" varchar,
  	"contact_label" varchar,
  	"brand_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_announcement_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_announcement_bar_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"review_button_href" varchar,
  	"search_action" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"headline_line1" varchar,
  	"headline_line2" varchar,
  	"review_eyebrow" varchar,
  	"review_heading" varchar,
  	"reviewer_name" varchar,
  	"review_text" varchar,
  	"review_button_label" varchar,
  	"powered_by_label" varchar,
  	"search_placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_overview_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_services_overview_pills_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_overview_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_overview_bullets_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"learn_more_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_overview_locales" (
  	"heading" varchar,
  	"learn_more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_highlights_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"call_href" varchar,
  	"book_us_now_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_highlights_strip_locales" (
  	"heading" varchar,
  	"junk_removal_label" varchar,
  	"cleanouts_label" varchar,
  	"light_demolitions_label" varchar,
  	"location_line1" varchar,
  	"location_line2" varchar,
  	"call_label" varchar,
  	"book_us_now_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_our_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_our_mission_locales" (
  	"heading" varchar,
  	"mission_paragraph1" varchar,
  	"mission_paragraph2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_how_it_works_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"book_us_now_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_how_it_works_locales" (
  	"heading" varchar,
  	"book_us_now_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_brand_divider1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_brand_divider1_locales" (
  	"tagline_line1" varchar,
  	"tagline_line2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_our_services_triptych" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_our_services_triptych_locales" (
  	"heading" varchar,
  	"residential_label" varchar,
  	"commercial_label" varchar,
  	"light_demolition_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_our_results_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"before_image_id" integer,
  	"after_image_id" integer
  );
  
  CREATE TABLE "pages_blocks_our_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"watermark_logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_our_results_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_areas_we_serve_towns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"column" "enum_pages_blocks_areas_we_serve_towns_column" DEFAULT 'main'
  );
  
  CREATE TABLE "pages_blocks_areas_we_serve_towns_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_areas_we_serve" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"map_embed_url" varchar,
  	"map_link_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_areas_we_serve_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_accordion_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_accordion_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_brand_divider2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_brand_divider2_locales" (
  	"tagline_line1" varchar,
  	"tagline_line2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_us_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_us_hours_locales" (
  	"day" varchar,
  	"hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_us_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_us_categories_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_us_weekly_template_slots" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_us_weekly_template_slots_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_us_weekly_template" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"closed" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_contact_us_weekly_template_locales" (
  	"day_label" varchar,
  	"closed_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"steps_icon_id" integer,
  	"next_month_href" varchar,
  	"form_action" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_us_locales" (
  	"heading" varchar,
  	"intro_line1" varchar,
  	"intro_line2" varchar,
  	"intro_note" varchar,
  	"steps_heading" varchar,
  	"hours_heading" varchar,
  	"tell_us_more_label" varchar,
  	"search_placeholder" varchar,
  	"next_month_label" varchar,
  	"available_label" varchar,
  	"selected_label" varchar,
  	"closed_legend_label" varchar,
  	"details_label" varchar,
  	"details_placeholder" varchar,
  	"upload_label" varchar,
  	"submit_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"services_href" varchar,
  	"privacy_href" varchar,
  	"terms_href" varchar,
  	"facebook_href" varchar,
  	"instagram_href" varchar,
  	"logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_locales" (
  	"services_label" varchar,
  	"privacy_label" varchar,
  	"terms_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_photo_heading_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"heading_size" "enum_pages_blocks_photo_heading_band_heading_size" DEFAULT 'title',
  	"text_align" "enum_pages_blocks_photo_heading_band_text_align" DEFAULT 'left',
  	"overlay_color" "enum_pages_blocks_photo_heading_band_overlay_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_photo_heading_band_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_what_do_you_need" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_what_do_you_need_locales" (
  	"headline" varchar,
  	"paragraph" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_highlight_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_highlight_bar_locales" (
  	"residential_label" varchar,
  	"same_day_label" varchar,
  	"no_heavy_lifting_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_selector_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_href" varchar
  );
  
  CREATE TABLE "pages_blocks_services_selector_items_locales" (
  	"label" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_selector" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"metadata_title_template" varchar DEFAULT '{title}',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sections_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_navbar_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_navbar_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_navbar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"search_action" varchar,
  	"services_href" varchar,
  	"call_href" varchar,
  	"primary_href" varchar,
  	"how_it_works_href" varchar,
  	"faqs_href" varchar,
  	"contact_href" varchar,
  	"facebook_href" varchar,
  	"instagram_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_navbar_locales" (
  	"search_placeholder" varchar,
  	"services_label" varchar,
  	"call_label" varchar,
  	"primary_label" varchar,
  	"how_it_works_label" varchar,
  	"faqs_label" varchar,
  	"contact_label" varchar,
  	"brand_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_announcement_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_announcement_bar_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"review_button_href" varchar,
  	"search_action" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"headline_line1" varchar,
  	"headline_line2" varchar,
  	"review_eyebrow" varchar,
  	"review_heading" varchar,
  	"reviewer_name" varchar,
  	"review_text" varchar,
  	"review_button_label" varchar,
  	"powered_by_label" varchar,
  	"search_placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_services_overview_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_overview_pills_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_services_overview_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_overview_bullets_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_services_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"learn_more_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_overview_locales" (
  	"heading" varchar,
  	"learn_more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_service_highlights_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"call_href" varchar,
  	"book_us_now_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_highlights_strip_locales" (
  	"heading" varchar,
  	"junk_removal_label" varchar,
  	"cleanouts_label" varchar,
  	"light_demolitions_label" varchar,
  	"location_line1" varchar,
  	"location_line2" varchar,
  	"call_label" varchar,
  	"book_us_now_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_our_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_mission_locales" (
  	"heading" varchar,
  	"mission_paragraph1" varchar,
  	"mission_paragraph2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"book_us_now_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works_locales" (
  	"heading" varchar,
  	"book_us_now_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_brand_divider1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_brand_divider1_locales" (
  	"tagline_line1" varchar,
  	"tagline_line2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_our_services_triptych" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_services_triptych_locales" (
  	"heading" varchar,
  	"residential_label" varchar,
  	"commercial_label" varchar,
  	"light_demolition_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_our_results_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"before_image_id" integer,
  	"after_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"watermark_logo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_results_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_areas_we_serve_towns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"column" "enum__pages_v_blocks_areas_we_serve_towns_column" DEFAULT 'main',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_areas_we_serve_towns_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_areas_we_serve" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"map_embed_url" varchar,
  	"map_link_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_areas_we_serve_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_brand_divider2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_brand_divider2_locales" (
  	"tagline_line1" varchar,
  	"tagline_line2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_hours_locales" (
  	"day" varchar,
  	"hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_categories_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_weekly_template_slots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_weekly_template_slots_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_weekly_template" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"closed" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_weekly_template_locales" (
  	"day_label" varchar,
  	"closed_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"steps_icon_id" integer,
  	"next_month_href" varchar,
  	"form_action" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_locales" (
  	"heading" varchar,
  	"intro_line1" varchar,
  	"intro_line2" varchar,
  	"intro_note" varchar,
  	"steps_heading" varchar,
  	"hours_heading" varchar,
  	"tell_us_more_label" varchar,
  	"search_placeholder" varchar,
  	"next_month_label" varchar,
  	"available_label" varchar,
  	"selected_label" varchar,
  	"closed_legend_label" varchar,
  	"details_label" varchar,
  	"details_placeholder" varchar,
  	"upload_label" varchar,
  	"submit_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"services_href" varchar,
  	"privacy_href" varchar,
  	"terms_href" varchar,
  	"facebook_href" varchar,
  	"instagram_href" varchar,
  	"logo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_locales" (
  	"services_label" varchar,
  	"privacy_label" varchar,
  	"terms_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_photo_heading_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"heading_size" "enum__pages_v_blocks_photo_heading_band_heading_size" DEFAULT 'title',
  	"text_align" "enum__pages_v_blocks_photo_heading_band_text_align" DEFAULT 'left',
  	"overlay_color" "enum__pages_v_blocks_photo_heading_band_overlay_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_photo_heading_band_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_what_do_you_need" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_what_do_you_need_locales" (
  	"headline" varchar,
  	"paragraph" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_highlight_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_highlight_bar_locales" (
  	"residential_label" varchar,
  	"same_day_label" varchar,
  	"no_heavy_lifting_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_services_selector_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_selector_items_locales" (
  	"label" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_services_selector" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_metadata_title_template" varchar DEFAULT '{title}',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sections_id" integer
  );
  
  CREATE TABLE "payload_mcp_api_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"pages_find" boolean DEFAULT false,
  	"pages_create" boolean DEFAULT false,
  	"pages_update" boolean DEFAULT false,
  	"site_globals_find" boolean DEFAULT false,
  	"site_globals_update" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"sections_id" integer,
  	"pages_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_globals_components" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"component_id" integer
  );
  
  CREATE TABLE "site_globals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_logo_id" integer,
  	"brand_favicon_id" integer,
  	"_status" "enum_site_globals_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_globals_locales" (
  	"brand_logo_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_globals_v_version_components" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"component_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_globals_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_brand_logo_id" integer,
  	"version_brand_favicon_id" integer,
  	"version__status" "enum__site_globals_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_globals_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_globals_v_locales" (
  	"version_brand_logo_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_navbar_links" ADD CONSTRAINT "sections_blocks_navbar_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_navbar_links_locales" ADD CONSTRAINT "sections_blocks_navbar_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_navbar_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_navbar" ADD CONSTRAINT "sections_blocks_navbar_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_blocks_navbar" ADD CONSTRAINT "sections_blocks_navbar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_navbar_locales" ADD CONSTRAINT "sections_blocks_navbar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_announcement_bar" ADD CONSTRAINT "sections_blocks_announcement_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_announcement_bar_locales" ADD CONSTRAINT "sections_blocks_announcement_bar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_announcement_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_hero" ADD CONSTRAINT "sections_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_blocks_hero" ADD CONSTRAINT "sections_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_hero_locales" ADD CONSTRAINT "sections_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_services_overview_pills" ADD CONSTRAINT "sections_blocks_services_overview_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_services_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_services_overview_pills_locales" ADD CONSTRAINT "sections_blocks_services_overview_pills_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_services_overview_pills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_services_overview_bullets" ADD CONSTRAINT "sections_blocks_services_overview_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_services_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_services_overview_bullets_locales" ADD CONSTRAINT "sections_blocks_services_overview_bullets_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_services_overview_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_services_overview" ADD CONSTRAINT "sections_blocks_services_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_services_overview_locales" ADD CONSTRAINT "sections_blocks_services_overview_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_services_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_service_highlights_strip" ADD CONSTRAINT "sections_blocks_service_highlights_strip_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_blocks_service_highlights_strip" ADD CONSTRAINT "sections_blocks_service_highlights_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_service_highlights_strip_locales" ADD CONSTRAINT "sections_blocks_service_highlights_strip_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_service_highlights_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_our_mission" ADD CONSTRAINT "sections_blocks_our_mission_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_blocks_our_mission" ADD CONSTRAINT "sections_blocks_our_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_our_mission_locales" ADD CONSTRAINT "sections_blocks_our_mission_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_our_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_how_it_works_steps" ADD CONSTRAINT "sections_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_how_it_works_steps_locales" ADD CONSTRAINT "sections_blocks_how_it_works_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_how_it_works_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_how_it_works" ADD CONSTRAINT "sections_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_how_it_works_locales" ADD CONSTRAINT "sections_blocks_how_it_works_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_brand_divider1" ADD CONSTRAINT "sections_blocks_brand_divider1_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_blocks_brand_divider1" ADD CONSTRAINT "sections_blocks_brand_divider1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_brand_divider1_locales" ADD CONSTRAINT "sections_blocks_brand_divider1_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_brand_divider1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_our_services_triptych" ADD CONSTRAINT "sections_blocks_our_services_triptych_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_blocks_our_services_triptych" ADD CONSTRAINT "sections_blocks_our_services_triptych_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_our_services_triptych_locales" ADD CONSTRAINT "sections_blocks_our_services_triptych_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_our_services_triptych"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_our_results_items" ADD CONSTRAINT "sections_blocks_our_results_items_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_blocks_our_results_items" ADD CONSTRAINT "sections_blocks_our_results_items_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_blocks_our_results_items" ADD CONSTRAINT "sections_blocks_our_results_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_our_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_our_results" ADD CONSTRAINT "sections_blocks_our_results_watermark_logo_id_media_id_fk" FOREIGN KEY ("watermark_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_blocks_our_results" ADD CONSTRAINT "sections_blocks_our_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_our_results_locales" ADD CONSTRAINT "sections_blocks_our_results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_our_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_areas_we_serve_towns" ADD CONSTRAINT "sections_blocks_areas_we_serve_towns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_areas_we_serve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_areas_we_serve_towns_locales" ADD CONSTRAINT "sections_blocks_areas_we_serve_towns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_areas_we_serve_towns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_areas_we_serve" ADD CONSTRAINT "sections_blocks_areas_we_serve_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_areas_we_serve_locales" ADD CONSTRAINT "sections_blocks_areas_we_serve_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_areas_we_serve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_faq_accordion_items" ADD CONSTRAINT "sections_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_faq_accordion_items_locales" ADD CONSTRAINT "sections_blocks_faq_accordion_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_faq_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_faq_accordion" ADD CONSTRAINT "sections_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_faq_accordion_locales" ADD CONSTRAINT "sections_blocks_faq_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_brand_divider2" ADD CONSTRAINT "sections_blocks_brand_divider2_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_blocks_brand_divider2" ADD CONSTRAINT "sections_blocks_brand_divider2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_brand_divider2_locales" ADD CONSTRAINT "sections_blocks_brand_divider2_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_brand_divider2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_contact_us_hours" ADD CONSTRAINT "sections_blocks_contact_us_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_contact_us_hours_locales" ADD CONSTRAINT "sections_blocks_contact_us_hours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_contact_us_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_contact_us_categories" ADD CONSTRAINT "sections_blocks_contact_us_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_contact_us_categories_locales" ADD CONSTRAINT "sections_blocks_contact_us_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_contact_us_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_contact_us_weekly_template_slots" ADD CONSTRAINT "sections_blocks_contact_us_weekly_template_slots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_contact_us_weekly_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_contact_us_weekly_template_slots_locales" ADD CONSTRAINT "sections_blocks_contact_us_weekly_template_slots_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_contact_us_weekly_template_slots"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_contact_us_weekly_template" ADD CONSTRAINT "sections_blocks_contact_us_weekly_template_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_contact_us_weekly_template_locales" ADD CONSTRAINT "sections_blocks_contact_us_weekly_template_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_contact_us_weekly_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_contact_us" ADD CONSTRAINT "sections_blocks_contact_us_steps_icon_id_media_id_fk" FOREIGN KEY ("steps_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_blocks_contact_us" ADD CONSTRAINT "sections_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_contact_us_locales" ADD CONSTRAINT "sections_blocks_contact_us_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_footer" ADD CONSTRAINT "sections_blocks_footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_blocks_footer" ADD CONSTRAINT "sections_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_footer_locales" ADD CONSTRAINT "sections_blocks_footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_photo_heading_band" ADD CONSTRAINT "sections_blocks_photo_heading_band_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_blocks_photo_heading_band" ADD CONSTRAINT "sections_blocks_photo_heading_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_photo_heading_band_locales" ADD CONSTRAINT "sections_blocks_photo_heading_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_photo_heading_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_what_do_you_need" ADD CONSTRAINT "sections_blocks_what_do_you_need_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_what_do_you_need_locales" ADD CONSTRAINT "sections_blocks_what_do_you_need_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_what_do_you_need"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_highlight_bar" ADD CONSTRAINT "sections_blocks_highlight_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_highlight_bar_locales" ADD CONSTRAINT "sections_blocks_highlight_bar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_highlight_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_services_selector_items" ADD CONSTRAINT "sections_blocks_services_selector_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_services_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_services_selector_items_locales" ADD CONSTRAINT "sections_blocks_services_selector_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_blocks_services_selector_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_blocks_services_selector" ADD CONSTRAINT "sections_blocks_services_selector_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_locales" ADD CONSTRAINT "sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_navbar_links" ADD CONSTRAINT "_sections_v_blocks_navbar_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_navbar_links_locales" ADD CONSTRAINT "_sections_v_blocks_navbar_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_navbar_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_navbar" ADD CONSTRAINT "_sections_v_blocks_navbar_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_navbar" ADD CONSTRAINT "_sections_v_blocks_navbar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_navbar_locales" ADD CONSTRAINT "_sections_v_blocks_navbar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_announcement_bar" ADD CONSTRAINT "_sections_v_blocks_announcement_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_announcement_bar_locales" ADD CONSTRAINT "_sections_v_blocks_announcement_bar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_announcement_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_hero" ADD CONSTRAINT "_sections_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_hero" ADD CONSTRAINT "_sections_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_hero_locales" ADD CONSTRAINT "_sections_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_services_overview_pills" ADD CONSTRAINT "_sections_v_blocks_services_overview_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_services_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_services_overview_pills_locales" ADD CONSTRAINT "_sections_v_blocks_services_overview_pills_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_services_overview_pills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_services_overview_bullets" ADD CONSTRAINT "_sections_v_blocks_services_overview_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_services_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_services_overview_bullets_locales" ADD CONSTRAINT "_sections_v_blocks_services_overview_bullets_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_services_overview_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_services_overview" ADD CONSTRAINT "_sections_v_blocks_services_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_services_overview_locales" ADD CONSTRAINT "_sections_v_blocks_services_overview_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_services_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_service_highlights_strip" ADD CONSTRAINT "_sections_v_blocks_service_highlights_strip_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_service_highlights_strip" ADD CONSTRAINT "_sections_v_blocks_service_highlights_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_service_highlights_strip_locales" ADD CONSTRAINT "_sections_v_blocks_service_highlights_strip_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_service_highlights_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_our_mission" ADD CONSTRAINT "_sections_v_blocks_our_mission_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_our_mission" ADD CONSTRAINT "_sections_v_blocks_our_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_our_mission_locales" ADD CONSTRAINT "_sections_v_blocks_our_mission_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_our_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_how_it_works_steps" ADD CONSTRAINT "_sections_v_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_how_it_works_steps_locales" ADD CONSTRAINT "_sections_v_blocks_how_it_works_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_how_it_works_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_how_it_works" ADD CONSTRAINT "_sections_v_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_how_it_works_locales" ADD CONSTRAINT "_sections_v_blocks_how_it_works_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_brand_divider1" ADD CONSTRAINT "_sections_v_blocks_brand_divider1_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_brand_divider1" ADD CONSTRAINT "_sections_v_blocks_brand_divider1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_brand_divider1_locales" ADD CONSTRAINT "_sections_v_blocks_brand_divider1_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_brand_divider1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_our_services_triptych" ADD CONSTRAINT "_sections_v_blocks_our_services_triptych_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_our_services_triptych" ADD CONSTRAINT "_sections_v_blocks_our_services_triptych_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_our_services_triptych_locales" ADD CONSTRAINT "_sections_v_blocks_our_services_triptych_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_our_services_triptych"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_our_results_items" ADD CONSTRAINT "_sections_v_blocks_our_results_items_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_our_results_items" ADD CONSTRAINT "_sections_v_blocks_our_results_items_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_our_results_items" ADD CONSTRAINT "_sections_v_blocks_our_results_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_our_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_our_results" ADD CONSTRAINT "_sections_v_blocks_our_results_watermark_logo_id_media_id_fk" FOREIGN KEY ("watermark_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_our_results" ADD CONSTRAINT "_sections_v_blocks_our_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_our_results_locales" ADD CONSTRAINT "_sections_v_blocks_our_results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_our_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_areas_we_serve_towns" ADD CONSTRAINT "_sections_v_blocks_areas_we_serve_towns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_areas_we_serve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_areas_we_serve_towns_locales" ADD CONSTRAINT "_sections_v_blocks_areas_we_serve_towns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_areas_we_serve_towns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_areas_we_serve" ADD CONSTRAINT "_sections_v_blocks_areas_we_serve_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_areas_we_serve_locales" ADD CONSTRAINT "_sections_v_blocks_areas_we_serve_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_areas_we_serve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_faq_accordion_items" ADD CONSTRAINT "_sections_v_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_faq_accordion_items_locales" ADD CONSTRAINT "_sections_v_blocks_faq_accordion_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_faq_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_faq_accordion" ADD CONSTRAINT "_sections_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_faq_accordion_locales" ADD CONSTRAINT "_sections_v_blocks_faq_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_brand_divider2" ADD CONSTRAINT "_sections_v_blocks_brand_divider2_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_brand_divider2" ADD CONSTRAINT "_sections_v_blocks_brand_divider2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_brand_divider2_locales" ADD CONSTRAINT "_sections_v_blocks_brand_divider2_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_brand_divider2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_contact_us_hours" ADD CONSTRAINT "_sections_v_blocks_contact_us_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_contact_us_hours_locales" ADD CONSTRAINT "_sections_v_blocks_contact_us_hours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_contact_us_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_contact_us_categories" ADD CONSTRAINT "_sections_v_blocks_contact_us_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_contact_us_categories_locales" ADD CONSTRAINT "_sections_v_blocks_contact_us_categories_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_contact_us_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_contact_us_weekly_template_slots" ADD CONSTRAINT "_sections_v_blocks_contact_us_weekly_template_slots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_contact_us_weekly_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_contact_us_weekly_template_slots_locales" ADD CONSTRAINT "_sections_v_blocks_contact_us_weekly_template_slots_local_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_contact_us_weekly_template_slots"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_contact_us_weekly_template" ADD CONSTRAINT "_sections_v_blocks_contact_us_weekly_template_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_contact_us_weekly_template_locales" ADD CONSTRAINT "_sections_v_blocks_contact_us_weekly_template_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_contact_us_weekly_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_contact_us" ADD CONSTRAINT "_sections_v_blocks_contact_us_steps_icon_id_media_id_fk" FOREIGN KEY ("steps_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_contact_us" ADD CONSTRAINT "_sections_v_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_contact_us_locales" ADD CONSTRAINT "_sections_v_blocks_contact_us_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_footer" ADD CONSTRAINT "_sections_v_blocks_footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_footer" ADD CONSTRAINT "_sections_v_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_footer_locales" ADD CONSTRAINT "_sections_v_blocks_footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_photo_heading_band" ADD CONSTRAINT "_sections_v_blocks_photo_heading_band_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_photo_heading_band" ADD CONSTRAINT "_sections_v_blocks_photo_heading_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_photo_heading_band_locales" ADD CONSTRAINT "_sections_v_blocks_photo_heading_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_photo_heading_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_what_do_you_need" ADD CONSTRAINT "_sections_v_blocks_what_do_you_need_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_what_do_you_need_locales" ADD CONSTRAINT "_sections_v_blocks_what_do_you_need_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_what_do_you_need"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_highlight_bar" ADD CONSTRAINT "_sections_v_blocks_highlight_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_highlight_bar_locales" ADD CONSTRAINT "_sections_v_blocks_highlight_bar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_highlight_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_services_selector_items" ADD CONSTRAINT "_sections_v_blocks_services_selector_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_services_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_services_selector_items_locales" ADD CONSTRAINT "_sections_v_blocks_services_selector_items_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v_blocks_services_selector_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v_blocks_services_selector" ADD CONSTRAINT "_sections_v_blocks_services_selector_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sections_v" ADD CONSTRAINT "_sections_v_parent_id_sections_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sections_v_locales" ADD CONSTRAINT "_sections_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_navbar_links" ADD CONSTRAINT "pages_blocks_navbar_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_navbar_links_locales" ADD CONSTRAINT "pages_blocks_navbar_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_navbar_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_navbar" ADD CONSTRAINT "pages_blocks_navbar_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_navbar" ADD CONSTRAINT "pages_blocks_navbar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_navbar_locales" ADD CONSTRAINT "pages_blocks_navbar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_announcement_bar" ADD CONSTRAINT "pages_blocks_announcement_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_announcement_bar_locales" ADD CONSTRAINT "pages_blocks_announcement_bar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_announcement_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_overview_pills" ADD CONSTRAINT "pages_blocks_services_overview_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_overview_pills_locales" ADD CONSTRAINT "pages_blocks_services_overview_pills_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_overview_pills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_overview_bullets" ADD CONSTRAINT "pages_blocks_services_overview_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_overview_bullets_locales" ADD CONSTRAINT "pages_blocks_services_overview_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_overview_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_overview" ADD CONSTRAINT "pages_blocks_services_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_overview_locales" ADD CONSTRAINT "pages_blocks_services_overview_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_highlights_strip" ADD CONSTRAINT "pages_blocks_service_highlights_strip_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_highlights_strip" ADD CONSTRAINT "pages_blocks_service_highlights_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_highlights_strip_locales" ADD CONSTRAINT "pages_blocks_service_highlights_strip_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_highlights_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_mission" ADD CONSTRAINT "pages_blocks_our_mission_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_mission" ADD CONSTRAINT "pages_blocks_our_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_mission_locales" ADD CONSTRAINT "pages_blocks_our_mission_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_our_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works_steps" ADD CONSTRAINT "pages_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works_steps_locales" ADD CONSTRAINT "pages_blocks_how_it_works_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_it_works_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works" ADD CONSTRAINT "pages_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works_locales" ADD CONSTRAINT "pages_blocks_how_it_works_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_divider1" ADD CONSTRAINT "pages_blocks_brand_divider1_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_divider1" ADD CONSTRAINT "pages_blocks_brand_divider1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_divider1_locales" ADD CONSTRAINT "pages_blocks_brand_divider1_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brand_divider1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_services_triptych" ADD CONSTRAINT "pages_blocks_our_services_triptych_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_services_triptych" ADD CONSTRAINT "pages_blocks_our_services_triptych_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_services_triptych_locales" ADD CONSTRAINT "pages_blocks_our_services_triptych_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_our_services_triptych"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_results_items" ADD CONSTRAINT "pages_blocks_our_results_items_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_results_items" ADD CONSTRAINT "pages_blocks_our_results_items_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_results_items" ADD CONSTRAINT "pages_blocks_our_results_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_our_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_results" ADD CONSTRAINT "pages_blocks_our_results_watermark_logo_id_media_id_fk" FOREIGN KEY ("watermark_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_results" ADD CONSTRAINT "pages_blocks_our_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_results_locales" ADD CONSTRAINT "pages_blocks_our_results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_our_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_areas_we_serve_towns" ADD CONSTRAINT "pages_blocks_areas_we_serve_towns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_areas_we_serve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_areas_we_serve_towns_locales" ADD CONSTRAINT "pages_blocks_areas_we_serve_towns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_areas_we_serve_towns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_areas_we_serve" ADD CONSTRAINT "pages_blocks_areas_we_serve_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_areas_we_serve_locales" ADD CONSTRAINT "pages_blocks_areas_we_serve_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_areas_we_serve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion_items" ADD CONSTRAINT "pages_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion_items_locales" ADD CONSTRAINT "pages_blocks_faq_accordion_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion" ADD CONSTRAINT "pages_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion_locales" ADD CONSTRAINT "pages_blocks_faq_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_divider2" ADD CONSTRAINT "pages_blocks_brand_divider2_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_divider2" ADD CONSTRAINT "pages_blocks_brand_divider2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_divider2_locales" ADD CONSTRAINT "pages_blocks_brand_divider2_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brand_divider2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us_hours" ADD CONSTRAINT "pages_blocks_contact_us_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us_hours_locales" ADD CONSTRAINT "pages_blocks_contact_us_hours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us_categories" ADD CONSTRAINT "pages_blocks_contact_us_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us_categories_locales" ADD CONSTRAINT "pages_blocks_contact_us_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us_weekly_template_slots" ADD CONSTRAINT "pages_blocks_contact_us_weekly_template_slots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us_weekly_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us_weekly_template_slots_locales" ADD CONSTRAINT "pages_blocks_contact_us_weekly_template_slots_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us_weekly_template_slots"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us_weekly_template" ADD CONSTRAINT "pages_blocks_contact_us_weekly_template_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us_weekly_template_locales" ADD CONSTRAINT "pages_blocks_contact_us_weekly_template_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us_weekly_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us" ADD CONSTRAINT "pages_blocks_contact_us_steps_icon_id_media_id_fk" FOREIGN KEY ("steps_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us" ADD CONSTRAINT "pages_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us_locales" ADD CONSTRAINT "pages_blocks_contact_us_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer" ADD CONSTRAINT "pages_blocks_footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer" ADD CONSTRAINT "pages_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_locales" ADD CONSTRAINT "pages_blocks_footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_photo_heading_band" ADD CONSTRAINT "pages_blocks_photo_heading_band_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_photo_heading_band" ADD CONSTRAINT "pages_blocks_photo_heading_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_photo_heading_band_locales" ADD CONSTRAINT "pages_blocks_photo_heading_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_photo_heading_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_what_do_you_need" ADD CONSTRAINT "pages_blocks_what_do_you_need_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_what_do_you_need_locales" ADD CONSTRAINT "pages_blocks_what_do_you_need_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_what_do_you_need"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_highlight_bar" ADD CONSTRAINT "pages_blocks_highlight_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_highlight_bar_locales" ADD CONSTRAINT "pages_blocks_highlight_bar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_highlight_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_selector_items" ADD CONSTRAINT "pages_blocks_services_selector_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_selector_items_locales" ADD CONSTRAINT "pages_blocks_services_selector_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_selector_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_selector" ADD CONSTRAINT "pages_blocks_services_selector_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_sections_fk" FOREIGN KEY ("sections_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navbar_links" ADD CONSTRAINT "_pages_v_blocks_navbar_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navbar_links_locales" ADD CONSTRAINT "_pages_v_blocks_navbar_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_navbar_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navbar" ADD CONSTRAINT "_pages_v_blocks_navbar_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navbar" ADD CONSTRAINT "_pages_v_blocks_navbar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navbar_locales" ADD CONSTRAINT "_pages_v_blocks_navbar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_announcement_bar" ADD CONSTRAINT "_pages_v_blocks_announcement_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_announcement_bar_locales" ADD CONSTRAINT "_pages_v_blocks_announcement_bar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_announcement_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_overview_pills" ADD CONSTRAINT "_pages_v_blocks_services_overview_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_overview_pills_locales" ADD CONSTRAINT "_pages_v_blocks_services_overview_pills_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_overview_pills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_overview_bullets" ADD CONSTRAINT "_pages_v_blocks_services_overview_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_overview_bullets_locales" ADD CONSTRAINT "_pages_v_blocks_services_overview_bullets_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_overview_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_overview" ADD CONSTRAINT "_pages_v_blocks_services_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_overview_locales" ADD CONSTRAINT "_pages_v_blocks_services_overview_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_highlights_strip" ADD CONSTRAINT "_pages_v_blocks_service_highlights_strip_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_highlights_strip" ADD CONSTRAINT "_pages_v_blocks_service_highlights_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_highlights_strip_locales" ADD CONSTRAINT "_pages_v_blocks_service_highlights_strip_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_highlights_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_mission" ADD CONSTRAINT "_pages_v_blocks_our_mission_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_mission" ADD CONSTRAINT "_pages_v_blocks_our_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_mission_locales" ADD CONSTRAINT "_pages_v_blocks_our_mission_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_our_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps" ADD CONSTRAINT "_pages_v_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps_locales" ADD CONSTRAINT "_pages_v_blocks_how_it_works_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_it_works_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works" ADD CONSTRAINT "_pages_v_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works_locales" ADD CONSTRAINT "_pages_v_blocks_how_it_works_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_divider1" ADD CONSTRAINT "_pages_v_blocks_brand_divider1_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_divider1" ADD CONSTRAINT "_pages_v_blocks_brand_divider1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_divider1_locales" ADD CONSTRAINT "_pages_v_blocks_brand_divider1_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_brand_divider1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_services_triptych" ADD CONSTRAINT "_pages_v_blocks_our_services_triptych_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_services_triptych" ADD CONSTRAINT "_pages_v_blocks_our_services_triptych_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_services_triptych_locales" ADD CONSTRAINT "_pages_v_blocks_our_services_triptych_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_our_services_triptych"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_results_items" ADD CONSTRAINT "_pages_v_blocks_our_results_items_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_results_items" ADD CONSTRAINT "_pages_v_blocks_our_results_items_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_results_items" ADD CONSTRAINT "_pages_v_blocks_our_results_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_our_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_results" ADD CONSTRAINT "_pages_v_blocks_our_results_watermark_logo_id_media_id_fk" FOREIGN KEY ("watermark_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_results" ADD CONSTRAINT "_pages_v_blocks_our_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_results_locales" ADD CONSTRAINT "_pages_v_blocks_our_results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_our_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_areas_we_serve_towns" ADD CONSTRAINT "_pages_v_blocks_areas_we_serve_towns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_areas_we_serve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_areas_we_serve_towns_locales" ADD CONSTRAINT "_pages_v_blocks_areas_we_serve_towns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_areas_we_serve_towns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_areas_we_serve" ADD CONSTRAINT "_pages_v_blocks_areas_we_serve_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_areas_we_serve_locales" ADD CONSTRAINT "_pages_v_blocks_areas_we_serve_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_areas_we_serve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion_items" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion_locales" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_divider2" ADD CONSTRAINT "_pages_v_blocks_brand_divider2_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_divider2" ADD CONSTRAINT "_pages_v_blocks_brand_divider2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_divider2_locales" ADD CONSTRAINT "_pages_v_blocks_brand_divider2_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_brand_divider2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_hours" ADD CONSTRAINT "_pages_v_blocks_contact_us_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_hours_locales" ADD CONSTRAINT "_pages_v_blocks_contact_us_hours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_categories" ADD CONSTRAINT "_pages_v_blocks_contact_us_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_categories_locales" ADD CONSTRAINT "_pages_v_blocks_contact_us_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_weekly_template_slots" ADD CONSTRAINT "_pages_v_blocks_contact_us_weekly_template_slots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us_weekly_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_weekly_template_slots_locales" ADD CONSTRAINT "_pages_v_blocks_contact_us_weekly_template_slots_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us_weekly_template_slots"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_weekly_template" ADD CONSTRAINT "_pages_v_blocks_contact_us_weekly_template_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_weekly_template_locales" ADD CONSTRAINT "_pages_v_blocks_contact_us_weekly_template_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us_weekly_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us" ADD CONSTRAINT "_pages_v_blocks_contact_us_steps_icon_id_media_id_fk" FOREIGN KEY ("steps_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us" ADD CONSTRAINT "_pages_v_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_locales" ADD CONSTRAINT "_pages_v_blocks_contact_us_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer" ADD CONSTRAINT "_pages_v_blocks_footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer" ADD CONSTRAINT "_pages_v_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_locales" ADD CONSTRAINT "_pages_v_blocks_footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_photo_heading_band" ADD CONSTRAINT "_pages_v_blocks_photo_heading_band_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_photo_heading_band" ADD CONSTRAINT "_pages_v_blocks_photo_heading_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_photo_heading_band_locales" ADD CONSTRAINT "_pages_v_blocks_photo_heading_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_photo_heading_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_what_do_you_need" ADD CONSTRAINT "_pages_v_blocks_what_do_you_need_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_what_do_you_need_locales" ADD CONSTRAINT "_pages_v_blocks_what_do_you_need_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_what_do_you_need"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_highlight_bar" ADD CONSTRAINT "_pages_v_blocks_highlight_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_highlight_bar_locales" ADD CONSTRAINT "_pages_v_blocks_highlight_bar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_highlight_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_selector_items" ADD CONSTRAINT "_pages_v_blocks_services_selector_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_selector_items_locales" ADD CONSTRAINT "_pages_v_blocks_services_selector_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_selector_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_selector" ADD CONSTRAINT "_pages_v_blocks_services_selector_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_sections_fk" FOREIGN KEY ("sections_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sections_fk" FOREIGN KEY ("sections_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_globals_components" ADD CONSTRAINT "site_globals_components_component_id_sections_id_fk" FOREIGN KEY ("component_id") REFERENCES "public"."sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_globals_components" ADD CONSTRAINT "site_globals_components_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_globals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_globals" ADD CONSTRAINT "site_globals_brand_logo_id_media_id_fk" FOREIGN KEY ("brand_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_globals" ADD CONSTRAINT "site_globals_brand_favicon_id_media_id_fk" FOREIGN KEY ("brand_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_globals_locales" ADD CONSTRAINT "site_globals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_globals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_globals_v_version_components" ADD CONSTRAINT "_site_globals_v_version_components_component_id_sections_id_fk" FOREIGN KEY ("component_id") REFERENCES "public"."sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_globals_v_version_components" ADD CONSTRAINT "_site_globals_v_version_components_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_globals_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_globals_v" ADD CONSTRAINT "_site_globals_v_version_brand_logo_id_media_id_fk" FOREIGN KEY ("version_brand_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_globals_v" ADD CONSTRAINT "_site_globals_v_version_brand_favicon_id_media_id_fk" FOREIGN KEY ("version_brand_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_globals_v_locales" ADD CONSTRAINT "_site_globals_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_globals_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "sections_blocks_navbar_links_order_idx" ON "sections_blocks_navbar_links" USING btree ("_order");
  CREATE INDEX "sections_blocks_navbar_links_parent_id_idx" ON "sections_blocks_navbar_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_blocks_navbar_links_locales_locale_parent_id_unique" ON "sections_blocks_navbar_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_navbar_order_idx" ON "sections_blocks_navbar" USING btree ("_order");
  CREATE INDEX "sections_blocks_navbar_parent_id_idx" ON "sections_blocks_navbar" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_navbar_path_idx" ON "sections_blocks_navbar" USING btree ("_path");
  CREATE INDEX "sections_blocks_navbar_logo_idx" ON "sections_blocks_navbar" USING btree ("logo_id");
  CREATE UNIQUE INDEX "sections_blocks_navbar_locales_locale_parent_id_unique" ON "sections_blocks_navbar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_announcement_bar_order_idx" ON "sections_blocks_announcement_bar" USING btree ("_order");
  CREATE INDEX "sections_blocks_announcement_bar_parent_id_idx" ON "sections_blocks_announcement_bar" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_announcement_bar_path_idx" ON "sections_blocks_announcement_bar" USING btree ("_path");
  CREATE UNIQUE INDEX "sections_blocks_announcement_bar_locales_locale_parent_id_un" ON "sections_blocks_announcement_bar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_hero_order_idx" ON "sections_blocks_hero" USING btree ("_order");
  CREATE INDEX "sections_blocks_hero_parent_id_idx" ON "sections_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_hero_path_idx" ON "sections_blocks_hero" USING btree ("_path");
  CREATE INDEX "sections_blocks_hero_background_image_idx" ON "sections_blocks_hero" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "sections_blocks_hero_locales_locale_parent_id_unique" ON "sections_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_services_overview_pills_order_idx" ON "sections_blocks_services_overview_pills" USING btree ("_order");
  CREATE INDEX "sections_blocks_services_overview_pills_parent_id_idx" ON "sections_blocks_services_overview_pills" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_blocks_services_overview_pills_locales_locale_paren" ON "sections_blocks_services_overview_pills_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_services_overview_bullets_order_idx" ON "sections_blocks_services_overview_bullets" USING btree ("_order");
  CREATE INDEX "sections_blocks_services_overview_bullets_parent_id_idx" ON "sections_blocks_services_overview_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_blocks_services_overview_bullets_locales_locale_par" ON "sections_blocks_services_overview_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_services_overview_order_idx" ON "sections_blocks_services_overview" USING btree ("_order");
  CREATE INDEX "sections_blocks_services_overview_parent_id_idx" ON "sections_blocks_services_overview" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_services_overview_path_idx" ON "sections_blocks_services_overview" USING btree ("_path");
  CREATE UNIQUE INDEX "sections_blocks_services_overview_locales_locale_parent_id_u" ON "sections_blocks_services_overview_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_service_highlights_strip_order_idx" ON "sections_blocks_service_highlights_strip" USING btree ("_order");
  CREATE INDEX "sections_blocks_service_highlights_strip_parent_id_idx" ON "sections_blocks_service_highlights_strip" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_service_highlights_strip_path_idx" ON "sections_blocks_service_highlights_strip" USING btree ("_path");
  CREATE INDEX "sections_blocks_service_highlights_strip_background_imag_idx" ON "sections_blocks_service_highlights_strip" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "sections_blocks_service_highlights_strip_locales_locale_pare" ON "sections_blocks_service_highlights_strip_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_our_mission_order_idx" ON "sections_blocks_our_mission" USING btree ("_order");
  CREATE INDEX "sections_blocks_our_mission_parent_id_idx" ON "sections_blocks_our_mission" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_our_mission_path_idx" ON "sections_blocks_our_mission" USING btree ("_path");
  CREATE INDEX "sections_blocks_our_mission_background_image_idx" ON "sections_blocks_our_mission" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "sections_blocks_our_mission_locales_locale_parent_id_unique" ON "sections_blocks_our_mission_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_how_it_works_steps_order_idx" ON "sections_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "sections_blocks_how_it_works_steps_parent_id_idx" ON "sections_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_blocks_how_it_works_steps_locales_locale_parent_id_" ON "sections_blocks_how_it_works_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_how_it_works_order_idx" ON "sections_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "sections_blocks_how_it_works_parent_id_idx" ON "sections_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_how_it_works_path_idx" ON "sections_blocks_how_it_works" USING btree ("_path");
  CREATE UNIQUE INDEX "sections_blocks_how_it_works_locales_locale_parent_id_unique" ON "sections_blocks_how_it_works_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_brand_divider1_order_idx" ON "sections_blocks_brand_divider1" USING btree ("_order");
  CREATE INDEX "sections_blocks_brand_divider1_parent_id_idx" ON "sections_blocks_brand_divider1" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_brand_divider1_path_idx" ON "sections_blocks_brand_divider1" USING btree ("_path");
  CREATE INDEX "sections_blocks_brand_divider1_logo_idx" ON "sections_blocks_brand_divider1" USING btree ("logo_id");
  CREATE UNIQUE INDEX "sections_blocks_brand_divider1_locales_locale_parent_id_uniq" ON "sections_blocks_brand_divider1_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_our_services_triptych_order_idx" ON "sections_blocks_our_services_triptych" USING btree ("_order");
  CREATE INDEX "sections_blocks_our_services_triptych_parent_id_idx" ON "sections_blocks_our_services_triptych" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_our_services_triptych_path_idx" ON "sections_blocks_our_services_triptych" USING btree ("_path");
  CREATE INDEX "sections_blocks_our_services_triptych_background_image_idx" ON "sections_blocks_our_services_triptych" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "sections_blocks_our_services_triptych_locales_locale_parent_" ON "sections_blocks_our_services_triptych_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_our_results_items_order_idx" ON "sections_blocks_our_results_items" USING btree ("_order");
  CREATE INDEX "sections_blocks_our_results_items_parent_id_idx" ON "sections_blocks_our_results_items" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_our_results_items_before_image_idx" ON "sections_blocks_our_results_items" USING btree ("before_image_id");
  CREATE INDEX "sections_blocks_our_results_items_after_image_idx" ON "sections_blocks_our_results_items" USING btree ("after_image_id");
  CREATE INDEX "sections_blocks_our_results_order_idx" ON "sections_blocks_our_results" USING btree ("_order");
  CREATE INDEX "sections_blocks_our_results_parent_id_idx" ON "sections_blocks_our_results" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_our_results_path_idx" ON "sections_blocks_our_results" USING btree ("_path");
  CREATE INDEX "sections_blocks_our_results_watermark_logo_idx" ON "sections_blocks_our_results" USING btree ("watermark_logo_id");
  CREATE UNIQUE INDEX "sections_blocks_our_results_locales_locale_parent_id_unique" ON "sections_blocks_our_results_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_areas_we_serve_towns_order_idx" ON "sections_blocks_areas_we_serve_towns" USING btree ("_order");
  CREATE INDEX "sections_blocks_areas_we_serve_towns_parent_id_idx" ON "sections_blocks_areas_we_serve_towns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_blocks_areas_we_serve_towns_locales_locale_parent_i" ON "sections_blocks_areas_we_serve_towns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_areas_we_serve_order_idx" ON "sections_blocks_areas_we_serve" USING btree ("_order");
  CREATE INDEX "sections_blocks_areas_we_serve_parent_id_idx" ON "sections_blocks_areas_we_serve" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_areas_we_serve_path_idx" ON "sections_blocks_areas_we_serve" USING btree ("_path");
  CREATE UNIQUE INDEX "sections_blocks_areas_we_serve_locales_locale_parent_id_uniq" ON "sections_blocks_areas_we_serve_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_faq_accordion_items_order_idx" ON "sections_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "sections_blocks_faq_accordion_items_parent_id_idx" ON "sections_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_blocks_faq_accordion_items_locales_locale_parent_id" ON "sections_blocks_faq_accordion_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_faq_accordion_order_idx" ON "sections_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "sections_blocks_faq_accordion_parent_id_idx" ON "sections_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_faq_accordion_path_idx" ON "sections_blocks_faq_accordion" USING btree ("_path");
  CREATE UNIQUE INDEX "sections_blocks_faq_accordion_locales_locale_parent_id_uniqu" ON "sections_blocks_faq_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_brand_divider2_order_idx" ON "sections_blocks_brand_divider2" USING btree ("_order");
  CREATE INDEX "sections_blocks_brand_divider2_parent_id_idx" ON "sections_blocks_brand_divider2" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_brand_divider2_path_idx" ON "sections_blocks_brand_divider2" USING btree ("_path");
  CREATE INDEX "sections_blocks_brand_divider2_logo_idx" ON "sections_blocks_brand_divider2" USING btree ("logo_id");
  CREATE UNIQUE INDEX "sections_blocks_brand_divider2_locales_locale_parent_id_uniq" ON "sections_blocks_brand_divider2_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_contact_us_hours_order_idx" ON "sections_blocks_contact_us_hours" USING btree ("_order");
  CREATE INDEX "sections_blocks_contact_us_hours_parent_id_idx" ON "sections_blocks_contact_us_hours" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_blocks_contact_us_hours_locales_locale_parent_id_un" ON "sections_blocks_contact_us_hours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_contact_us_categories_order_idx" ON "sections_blocks_contact_us_categories" USING btree ("_order");
  CREATE INDEX "sections_blocks_contact_us_categories_parent_id_idx" ON "sections_blocks_contact_us_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_blocks_contact_us_categories_locales_locale_parent_" ON "sections_blocks_contact_us_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_contact_us_weekly_template_slots_order_idx" ON "sections_blocks_contact_us_weekly_template_slots" USING btree ("_order");
  CREATE INDEX "sections_blocks_contact_us_weekly_template_slots_parent_id_idx" ON "sections_blocks_contact_us_weekly_template_slots" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_blocks_contact_us_weekly_template_slots_locales_loc" ON "sections_blocks_contact_us_weekly_template_slots_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_contact_us_weekly_template_order_idx" ON "sections_blocks_contact_us_weekly_template" USING btree ("_order");
  CREATE INDEX "sections_blocks_contact_us_weekly_template_parent_id_idx" ON "sections_blocks_contact_us_weekly_template" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_blocks_contact_us_weekly_template_locales_locale_pa" ON "sections_blocks_contact_us_weekly_template_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_contact_us_order_idx" ON "sections_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "sections_blocks_contact_us_parent_id_idx" ON "sections_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_contact_us_path_idx" ON "sections_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "sections_blocks_contact_us_steps_icon_idx" ON "sections_blocks_contact_us" USING btree ("steps_icon_id");
  CREATE UNIQUE INDEX "sections_blocks_contact_us_locales_locale_parent_id_unique" ON "sections_blocks_contact_us_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_footer_order_idx" ON "sections_blocks_footer" USING btree ("_order");
  CREATE INDEX "sections_blocks_footer_parent_id_idx" ON "sections_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_footer_path_idx" ON "sections_blocks_footer" USING btree ("_path");
  CREATE INDEX "sections_blocks_footer_logo_idx" ON "sections_blocks_footer" USING btree ("logo_id");
  CREATE UNIQUE INDEX "sections_blocks_footer_locales_locale_parent_id_unique" ON "sections_blocks_footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_photo_heading_band_order_idx" ON "sections_blocks_photo_heading_band" USING btree ("_order");
  CREATE INDEX "sections_blocks_photo_heading_band_parent_id_idx" ON "sections_blocks_photo_heading_band" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_photo_heading_band_path_idx" ON "sections_blocks_photo_heading_band" USING btree ("_path");
  CREATE INDEX "sections_blocks_photo_heading_band_background_image_idx" ON "sections_blocks_photo_heading_band" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "sections_blocks_photo_heading_band_locales_locale_parent_id_" ON "sections_blocks_photo_heading_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_what_do_you_need_order_idx" ON "sections_blocks_what_do_you_need" USING btree ("_order");
  CREATE INDEX "sections_blocks_what_do_you_need_parent_id_idx" ON "sections_blocks_what_do_you_need" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_what_do_you_need_path_idx" ON "sections_blocks_what_do_you_need" USING btree ("_path");
  CREATE UNIQUE INDEX "sections_blocks_what_do_you_need_locales_locale_parent_id_un" ON "sections_blocks_what_do_you_need_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_highlight_bar_order_idx" ON "sections_blocks_highlight_bar" USING btree ("_order");
  CREATE INDEX "sections_blocks_highlight_bar_parent_id_idx" ON "sections_blocks_highlight_bar" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_highlight_bar_path_idx" ON "sections_blocks_highlight_bar" USING btree ("_path");
  CREATE UNIQUE INDEX "sections_blocks_highlight_bar_locales_locale_parent_id_uniqu" ON "sections_blocks_highlight_bar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_services_selector_items_order_idx" ON "sections_blocks_services_selector_items" USING btree ("_order");
  CREATE INDEX "sections_blocks_services_selector_items_parent_id_idx" ON "sections_blocks_services_selector_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_blocks_services_selector_items_locales_locale_paren" ON "sections_blocks_services_selector_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_blocks_services_selector_order_idx" ON "sections_blocks_services_selector" USING btree ("_order");
  CREATE INDEX "sections_blocks_services_selector_parent_id_idx" ON "sections_blocks_services_selector" USING btree ("_parent_id");
  CREATE INDEX "sections_blocks_services_selector_path_idx" ON "sections_blocks_services_selector" USING btree ("_path");
  CREATE UNIQUE INDEX "sections_slug_idx" ON "sections" USING btree ("slug");
  CREATE INDEX "sections_updated_at_idx" ON "sections" USING btree ("updated_at");
  CREATE INDEX "sections_created_at_idx" ON "sections" USING btree ("created_at");
  CREATE INDEX "sections__status_idx" ON "sections" USING btree ("_status");
  CREATE UNIQUE INDEX "sections_locales_locale_parent_id_unique" ON "sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_navbar_links_order_idx" ON "_sections_v_blocks_navbar_links" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_navbar_links_parent_id_idx" ON "_sections_v_blocks_navbar_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_navbar_links_locales_locale_parent_id_uni" ON "_sections_v_blocks_navbar_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_navbar_order_idx" ON "_sections_v_blocks_navbar" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_navbar_parent_id_idx" ON "_sections_v_blocks_navbar" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_navbar_path_idx" ON "_sections_v_blocks_navbar" USING btree ("_path");
  CREATE INDEX "_sections_v_blocks_navbar_logo_idx" ON "_sections_v_blocks_navbar" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_navbar_locales_locale_parent_id_unique" ON "_sections_v_blocks_navbar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_announcement_bar_order_idx" ON "_sections_v_blocks_announcement_bar" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_announcement_bar_parent_id_idx" ON "_sections_v_blocks_announcement_bar" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_announcement_bar_path_idx" ON "_sections_v_blocks_announcement_bar" USING btree ("_path");
  CREATE UNIQUE INDEX "_sections_v_blocks_announcement_bar_locales_locale_parent_id" ON "_sections_v_blocks_announcement_bar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_hero_order_idx" ON "_sections_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_hero_parent_id_idx" ON "_sections_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_hero_path_idx" ON "_sections_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_sections_v_blocks_hero_background_image_idx" ON "_sections_v_blocks_hero" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_hero_locales_locale_parent_id_unique" ON "_sections_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_services_overview_pills_order_idx" ON "_sections_v_blocks_services_overview_pills" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_services_overview_pills_parent_id_idx" ON "_sections_v_blocks_services_overview_pills" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_services_overview_pills_locales_locale_pa" ON "_sections_v_blocks_services_overview_pills_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_services_overview_bullets_order_idx" ON "_sections_v_blocks_services_overview_bullets" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_services_overview_bullets_parent_id_idx" ON "_sections_v_blocks_services_overview_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_services_overview_bullets_locales_locale_" ON "_sections_v_blocks_services_overview_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_services_overview_order_idx" ON "_sections_v_blocks_services_overview" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_services_overview_parent_id_idx" ON "_sections_v_blocks_services_overview" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_services_overview_path_idx" ON "_sections_v_blocks_services_overview" USING btree ("_path");
  CREATE UNIQUE INDEX "_sections_v_blocks_services_overview_locales_locale_parent_i" ON "_sections_v_blocks_services_overview_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_service_highlights_strip_order_idx" ON "_sections_v_blocks_service_highlights_strip" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_service_highlights_strip_parent_id_idx" ON "_sections_v_blocks_service_highlights_strip" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_service_highlights_strip_path_idx" ON "_sections_v_blocks_service_highlights_strip" USING btree ("_path");
  CREATE INDEX "_sections_v_blocks_service_highlights_strip_background_i_idx" ON "_sections_v_blocks_service_highlights_strip" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_service_highlights_strip_locales_locale_p" ON "_sections_v_blocks_service_highlights_strip_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_our_mission_order_idx" ON "_sections_v_blocks_our_mission" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_our_mission_parent_id_idx" ON "_sections_v_blocks_our_mission" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_our_mission_path_idx" ON "_sections_v_blocks_our_mission" USING btree ("_path");
  CREATE INDEX "_sections_v_blocks_our_mission_background_image_idx" ON "_sections_v_blocks_our_mission" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_our_mission_locales_locale_parent_id_uniq" ON "_sections_v_blocks_our_mission_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_how_it_works_steps_order_idx" ON "_sections_v_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_how_it_works_steps_parent_id_idx" ON "_sections_v_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_how_it_works_steps_locales_locale_parent_" ON "_sections_v_blocks_how_it_works_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_how_it_works_order_idx" ON "_sections_v_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_how_it_works_parent_id_idx" ON "_sections_v_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_how_it_works_path_idx" ON "_sections_v_blocks_how_it_works" USING btree ("_path");
  CREATE UNIQUE INDEX "_sections_v_blocks_how_it_works_locales_locale_parent_id_uni" ON "_sections_v_blocks_how_it_works_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_brand_divider1_order_idx" ON "_sections_v_blocks_brand_divider1" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_brand_divider1_parent_id_idx" ON "_sections_v_blocks_brand_divider1" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_brand_divider1_path_idx" ON "_sections_v_blocks_brand_divider1" USING btree ("_path");
  CREATE INDEX "_sections_v_blocks_brand_divider1_logo_idx" ON "_sections_v_blocks_brand_divider1" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_brand_divider1_locales_locale_parent_id_u" ON "_sections_v_blocks_brand_divider1_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_our_services_triptych_order_idx" ON "_sections_v_blocks_our_services_triptych" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_our_services_triptych_parent_id_idx" ON "_sections_v_blocks_our_services_triptych" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_our_services_triptych_path_idx" ON "_sections_v_blocks_our_services_triptych" USING btree ("_path");
  CREATE INDEX "_sections_v_blocks_our_services_triptych_background_imag_idx" ON "_sections_v_blocks_our_services_triptych" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_our_services_triptych_locales_locale_pare" ON "_sections_v_blocks_our_services_triptych_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_our_results_items_order_idx" ON "_sections_v_blocks_our_results_items" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_our_results_items_parent_id_idx" ON "_sections_v_blocks_our_results_items" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_our_results_items_before_image_idx" ON "_sections_v_blocks_our_results_items" USING btree ("before_image_id");
  CREATE INDEX "_sections_v_blocks_our_results_items_after_image_idx" ON "_sections_v_blocks_our_results_items" USING btree ("after_image_id");
  CREATE INDEX "_sections_v_blocks_our_results_order_idx" ON "_sections_v_blocks_our_results" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_our_results_parent_id_idx" ON "_sections_v_blocks_our_results" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_our_results_path_idx" ON "_sections_v_blocks_our_results" USING btree ("_path");
  CREATE INDEX "_sections_v_blocks_our_results_watermark_logo_idx" ON "_sections_v_blocks_our_results" USING btree ("watermark_logo_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_our_results_locales_locale_parent_id_uniq" ON "_sections_v_blocks_our_results_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_areas_we_serve_towns_order_idx" ON "_sections_v_blocks_areas_we_serve_towns" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_areas_we_serve_towns_parent_id_idx" ON "_sections_v_blocks_areas_we_serve_towns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_areas_we_serve_towns_locales_locale_paren" ON "_sections_v_blocks_areas_we_serve_towns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_areas_we_serve_order_idx" ON "_sections_v_blocks_areas_we_serve" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_areas_we_serve_parent_id_idx" ON "_sections_v_blocks_areas_we_serve" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_areas_we_serve_path_idx" ON "_sections_v_blocks_areas_we_serve" USING btree ("_path");
  CREATE UNIQUE INDEX "_sections_v_blocks_areas_we_serve_locales_locale_parent_id_u" ON "_sections_v_blocks_areas_we_serve_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_faq_accordion_items_order_idx" ON "_sections_v_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_faq_accordion_items_parent_id_idx" ON "_sections_v_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_faq_accordion_items_locales_locale_parent" ON "_sections_v_blocks_faq_accordion_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_faq_accordion_order_idx" ON "_sections_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_faq_accordion_parent_id_idx" ON "_sections_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_faq_accordion_path_idx" ON "_sections_v_blocks_faq_accordion" USING btree ("_path");
  CREATE UNIQUE INDEX "_sections_v_blocks_faq_accordion_locales_locale_parent_id_un" ON "_sections_v_blocks_faq_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_brand_divider2_order_idx" ON "_sections_v_blocks_brand_divider2" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_brand_divider2_parent_id_idx" ON "_sections_v_blocks_brand_divider2" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_brand_divider2_path_idx" ON "_sections_v_blocks_brand_divider2" USING btree ("_path");
  CREATE INDEX "_sections_v_blocks_brand_divider2_logo_idx" ON "_sections_v_blocks_brand_divider2" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_brand_divider2_locales_locale_parent_id_u" ON "_sections_v_blocks_brand_divider2_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_contact_us_hours_order_idx" ON "_sections_v_blocks_contact_us_hours" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_contact_us_hours_parent_id_idx" ON "_sections_v_blocks_contact_us_hours" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_contact_us_hours_locales_locale_parent_id" ON "_sections_v_blocks_contact_us_hours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_contact_us_categories_order_idx" ON "_sections_v_blocks_contact_us_categories" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_contact_us_categories_parent_id_idx" ON "_sections_v_blocks_contact_us_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_contact_us_categories_locales_locale_pare" ON "_sections_v_blocks_contact_us_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_contact_us_weekly_template_slots_order_idx" ON "_sections_v_blocks_contact_us_weekly_template_slots" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_contact_us_weekly_template_slots_parent_id_idx" ON "_sections_v_blocks_contact_us_weekly_template_slots" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_contact_us_weekly_template_slots_locales_" ON "_sections_v_blocks_contact_us_weekly_template_slots_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_contact_us_weekly_template_order_idx" ON "_sections_v_blocks_contact_us_weekly_template" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_contact_us_weekly_template_parent_id_idx" ON "_sections_v_blocks_contact_us_weekly_template" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_contact_us_weekly_template_locales_locale" ON "_sections_v_blocks_contact_us_weekly_template_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_contact_us_order_idx" ON "_sections_v_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_contact_us_parent_id_idx" ON "_sections_v_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_contact_us_path_idx" ON "_sections_v_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "_sections_v_blocks_contact_us_steps_icon_idx" ON "_sections_v_blocks_contact_us" USING btree ("steps_icon_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_contact_us_locales_locale_parent_id_uniqu" ON "_sections_v_blocks_contact_us_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_footer_order_idx" ON "_sections_v_blocks_footer" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_footer_parent_id_idx" ON "_sections_v_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_footer_path_idx" ON "_sections_v_blocks_footer" USING btree ("_path");
  CREATE INDEX "_sections_v_blocks_footer_logo_idx" ON "_sections_v_blocks_footer" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_footer_locales_locale_parent_id_unique" ON "_sections_v_blocks_footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_photo_heading_band_order_idx" ON "_sections_v_blocks_photo_heading_band" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_photo_heading_band_parent_id_idx" ON "_sections_v_blocks_photo_heading_band" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_photo_heading_band_path_idx" ON "_sections_v_blocks_photo_heading_band" USING btree ("_path");
  CREATE INDEX "_sections_v_blocks_photo_heading_band_background_image_idx" ON "_sections_v_blocks_photo_heading_band" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_photo_heading_band_locales_locale_parent_" ON "_sections_v_blocks_photo_heading_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_what_do_you_need_order_idx" ON "_sections_v_blocks_what_do_you_need" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_what_do_you_need_parent_id_idx" ON "_sections_v_blocks_what_do_you_need" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_what_do_you_need_path_idx" ON "_sections_v_blocks_what_do_you_need" USING btree ("_path");
  CREATE UNIQUE INDEX "_sections_v_blocks_what_do_you_need_locales_locale_parent_id" ON "_sections_v_blocks_what_do_you_need_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_highlight_bar_order_idx" ON "_sections_v_blocks_highlight_bar" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_highlight_bar_parent_id_idx" ON "_sections_v_blocks_highlight_bar" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_highlight_bar_path_idx" ON "_sections_v_blocks_highlight_bar" USING btree ("_path");
  CREATE UNIQUE INDEX "_sections_v_blocks_highlight_bar_locales_locale_parent_id_un" ON "_sections_v_blocks_highlight_bar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_services_selector_items_order_idx" ON "_sections_v_blocks_services_selector_items" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_services_selector_items_parent_id_idx" ON "_sections_v_blocks_services_selector_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_sections_v_blocks_services_selector_items_locales_locale_pa" ON "_sections_v_blocks_services_selector_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sections_v_blocks_services_selector_order_idx" ON "_sections_v_blocks_services_selector" USING btree ("_order");
  CREATE INDEX "_sections_v_blocks_services_selector_parent_id_idx" ON "_sections_v_blocks_services_selector" USING btree ("_parent_id");
  CREATE INDEX "_sections_v_blocks_services_selector_path_idx" ON "_sections_v_blocks_services_selector" USING btree ("_path");
  CREATE INDEX "_sections_v_parent_idx" ON "_sections_v" USING btree ("parent_id");
  CREATE INDEX "_sections_v_version_version_slug_idx" ON "_sections_v" USING btree ("version_slug");
  CREATE INDEX "_sections_v_version_version_updated_at_idx" ON "_sections_v" USING btree ("version_updated_at");
  CREATE INDEX "_sections_v_version_version_created_at_idx" ON "_sections_v" USING btree ("version_created_at");
  CREATE INDEX "_sections_v_version_version__status_idx" ON "_sections_v" USING btree ("version__status");
  CREATE INDEX "_sections_v_created_at_idx" ON "_sections_v" USING btree ("created_at");
  CREATE INDEX "_sections_v_updated_at_idx" ON "_sections_v" USING btree ("updated_at");
  CREATE INDEX "_sections_v_snapshot_idx" ON "_sections_v" USING btree ("snapshot");
  CREATE INDEX "_sections_v_published_locale_idx" ON "_sections_v" USING btree ("published_locale");
  CREATE INDEX "_sections_v_latest_idx" ON "_sections_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_sections_v_locales_locale_parent_id_unique" ON "_sections_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_navbar_links_order_idx" ON "pages_blocks_navbar_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_navbar_links_parent_id_idx" ON "pages_blocks_navbar_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_navbar_links_locales_locale_parent_id_unique" ON "pages_blocks_navbar_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_navbar_order_idx" ON "pages_blocks_navbar" USING btree ("_order");
  CREATE INDEX "pages_blocks_navbar_parent_id_idx" ON "pages_blocks_navbar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_navbar_path_idx" ON "pages_blocks_navbar" USING btree ("_path");
  CREATE INDEX "pages_blocks_navbar_logo_idx" ON "pages_blocks_navbar" USING btree ("logo_id");
  CREATE UNIQUE INDEX "pages_blocks_navbar_locales_locale_parent_id_unique" ON "pages_blocks_navbar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_announcement_bar_order_idx" ON "pages_blocks_announcement_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_announcement_bar_parent_id_idx" ON "pages_blocks_announcement_bar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_announcement_bar_path_idx" ON "pages_blocks_announcement_bar" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_announcement_bar_locales_locale_parent_id_uniqu" ON "pages_blocks_announcement_bar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_services_overview_pills_order_idx" ON "pages_blocks_services_overview_pills" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_overview_pills_parent_id_idx" ON "pages_blocks_services_overview_pills" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_services_overview_pills_locales_locale_parent_i" ON "pages_blocks_services_overview_pills_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_services_overview_bullets_order_idx" ON "pages_blocks_services_overview_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_overview_bullets_parent_id_idx" ON "pages_blocks_services_overview_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_services_overview_bullets_locales_locale_parent" ON "pages_blocks_services_overview_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_services_overview_order_idx" ON "pages_blocks_services_overview" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_overview_parent_id_idx" ON "pages_blocks_services_overview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_overview_path_idx" ON "pages_blocks_services_overview" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_services_overview_locales_locale_parent_id_uniq" ON "pages_blocks_services_overview_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_service_highlights_strip_order_idx" ON "pages_blocks_service_highlights_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_highlights_strip_parent_id_idx" ON "pages_blocks_service_highlights_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_highlights_strip_path_idx" ON "pages_blocks_service_highlights_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_highlights_strip_background_image_idx" ON "pages_blocks_service_highlights_strip" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_service_highlights_strip_locales_locale_parent_" ON "pages_blocks_service_highlights_strip_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_our_mission_order_idx" ON "pages_blocks_our_mission" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_mission_parent_id_idx" ON "pages_blocks_our_mission" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_mission_path_idx" ON "pages_blocks_our_mission" USING btree ("_path");
  CREATE INDEX "pages_blocks_our_mission_background_image_idx" ON "pages_blocks_our_mission" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_our_mission_locales_locale_parent_id_unique" ON "pages_blocks_our_mission_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_steps_order_idx" ON "pages_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_steps_parent_id_idx" ON "pages_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_how_it_works_steps_locales_locale_parent_id_uni" ON "pages_blocks_how_it_works_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_order_idx" ON "pages_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_parent_id_idx" ON "pages_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_path_idx" ON "pages_blocks_how_it_works" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_how_it_works_locales_locale_parent_id_unique" ON "pages_blocks_how_it_works_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_brand_divider1_order_idx" ON "pages_blocks_brand_divider1" USING btree ("_order");
  CREATE INDEX "pages_blocks_brand_divider1_parent_id_idx" ON "pages_blocks_brand_divider1" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brand_divider1_path_idx" ON "pages_blocks_brand_divider1" USING btree ("_path");
  CREATE INDEX "pages_blocks_brand_divider1_logo_idx" ON "pages_blocks_brand_divider1" USING btree ("logo_id");
  CREATE UNIQUE INDEX "pages_blocks_brand_divider1_locales_locale_parent_id_unique" ON "pages_blocks_brand_divider1_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_our_services_triptych_order_idx" ON "pages_blocks_our_services_triptych" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_services_triptych_parent_id_idx" ON "pages_blocks_our_services_triptych" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_services_triptych_path_idx" ON "pages_blocks_our_services_triptych" USING btree ("_path");
  CREATE INDEX "pages_blocks_our_services_triptych_background_image_idx" ON "pages_blocks_our_services_triptych" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_our_services_triptych_locales_locale_parent_id_" ON "pages_blocks_our_services_triptych_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_our_results_items_order_idx" ON "pages_blocks_our_results_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_results_items_parent_id_idx" ON "pages_blocks_our_results_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_results_items_before_image_idx" ON "pages_blocks_our_results_items" USING btree ("before_image_id");
  CREATE INDEX "pages_blocks_our_results_items_after_image_idx" ON "pages_blocks_our_results_items" USING btree ("after_image_id");
  CREATE INDEX "pages_blocks_our_results_order_idx" ON "pages_blocks_our_results" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_results_parent_id_idx" ON "pages_blocks_our_results" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_results_path_idx" ON "pages_blocks_our_results" USING btree ("_path");
  CREATE INDEX "pages_blocks_our_results_watermark_logo_idx" ON "pages_blocks_our_results" USING btree ("watermark_logo_id");
  CREATE UNIQUE INDEX "pages_blocks_our_results_locales_locale_parent_id_unique" ON "pages_blocks_our_results_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_areas_we_serve_towns_order_idx" ON "pages_blocks_areas_we_serve_towns" USING btree ("_order");
  CREATE INDEX "pages_blocks_areas_we_serve_towns_parent_id_idx" ON "pages_blocks_areas_we_serve_towns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_areas_we_serve_towns_locales_locale_parent_id_u" ON "pages_blocks_areas_we_serve_towns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_areas_we_serve_order_idx" ON "pages_blocks_areas_we_serve" USING btree ("_order");
  CREATE INDEX "pages_blocks_areas_we_serve_parent_id_idx" ON "pages_blocks_areas_we_serve" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_areas_we_serve_path_idx" ON "pages_blocks_areas_we_serve" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_areas_we_serve_locales_locale_parent_id_unique" ON "pages_blocks_areas_we_serve_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_items_order_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_items_parent_id_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_accordion_items_locales_locale_parent_id_un" ON "pages_blocks_faq_accordion_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_order_idx" ON "pages_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_parent_id_idx" ON "pages_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_path_idx" ON "pages_blocks_faq_accordion" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_accordion_locales_locale_parent_id_unique" ON "pages_blocks_faq_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_brand_divider2_order_idx" ON "pages_blocks_brand_divider2" USING btree ("_order");
  CREATE INDEX "pages_blocks_brand_divider2_parent_id_idx" ON "pages_blocks_brand_divider2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brand_divider2_path_idx" ON "pages_blocks_brand_divider2" USING btree ("_path");
  CREATE INDEX "pages_blocks_brand_divider2_logo_idx" ON "pages_blocks_brand_divider2" USING btree ("logo_id");
  CREATE UNIQUE INDEX "pages_blocks_brand_divider2_locales_locale_parent_id_unique" ON "pages_blocks_brand_divider2_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_us_hours_order_idx" ON "pages_blocks_contact_us_hours" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_us_hours_parent_id_idx" ON "pages_blocks_contact_us_hours" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_us_hours_locales_locale_parent_id_uniqu" ON "pages_blocks_contact_us_hours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_us_categories_order_idx" ON "pages_blocks_contact_us_categories" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_us_categories_parent_id_idx" ON "pages_blocks_contact_us_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_us_categories_locales_locale_parent_id_" ON "pages_blocks_contact_us_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_us_weekly_template_slots_order_idx" ON "pages_blocks_contact_us_weekly_template_slots" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_us_weekly_template_slots_parent_id_idx" ON "pages_blocks_contact_us_weekly_template_slots" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_us_weekly_template_slots_locales_locale" ON "pages_blocks_contact_us_weekly_template_slots_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_us_weekly_template_order_idx" ON "pages_blocks_contact_us_weekly_template" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_us_weekly_template_parent_id_idx" ON "pages_blocks_contact_us_weekly_template" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_us_weekly_template_locales_locale_paren" ON "pages_blocks_contact_us_weekly_template_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_us_order_idx" ON "pages_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_us_parent_id_idx" ON "pages_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_us_path_idx" ON "pages_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_us_steps_icon_idx" ON "pages_blocks_contact_us" USING btree ("steps_icon_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_us_locales_locale_parent_id_unique" ON "pages_blocks_contact_us_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_footer_order_idx" ON "pages_blocks_footer" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_parent_id_idx" ON "pages_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_path_idx" ON "pages_blocks_footer" USING btree ("_path");
  CREATE INDEX "pages_blocks_footer_logo_idx" ON "pages_blocks_footer" USING btree ("logo_id");
  CREATE UNIQUE INDEX "pages_blocks_footer_locales_locale_parent_id_unique" ON "pages_blocks_footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_photo_heading_band_order_idx" ON "pages_blocks_photo_heading_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_photo_heading_band_parent_id_idx" ON "pages_blocks_photo_heading_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_photo_heading_band_path_idx" ON "pages_blocks_photo_heading_band" USING btree ("_path");
  CREATE INDEX "pages_blocks_photo_heading_band_background_image_idx" ON "pages_blocks_photo_heading_band" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_photo_heading_band_locales_locale_parent_id_uni" ON "pages_blocks_photo_heading_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_what_do_you_need_order_idx" ON "pages_blocks_what_do_you_need" USING btree ("_order");
  CREATE INDEX "pages_blocks_what_do_you_need_parent_id_idx" ON "pages_blocks_what_do_you_need" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_what_do_you_need_path_idx" ON "pages_blocks_what_do_you_need" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_what_do_you_need_locales_locale_parent_id_uniqu" ON "pages_blocks_what_do_you_need_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_highlight_bar_order_idx" ON "pages_blocks_highlight_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_highlight_bar_parent_id_idx" ON "pages_blocks_highlight_bar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_highlight_bar_path_idx" ON "pages_blocks_highlight_bar" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_highlight_bar_locales_locale_parent_id_unique" ON "pages_blocks_highlight_bar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_services_selector_items_order_idx" ON "pages_blocks_services_selector_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_selector_items_parent_id_idx" ON "pages_blocks_services_selector_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_services_selector_items_locales_locale_parent_i" ON "pages_blocks_services_selector_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_services_selector_order_idx" ON "pages_blocks_services_selector" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_selector_parent_id_idx" ON "pages_blocks_services_selector" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_selector_path_idx" ON "pages_blocks_services_selector" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_sections_id_idx" ON "pages_rels" USING btree ("sections_id");
  CREATE INDEX "_pages_v_blocks_navbar_links_order_idx" ON "_pages_v_blocks_navbar_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_navbar_links_parent_id_idx" ON "_pages_v_blocks_navbar_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_navbar_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_navbar_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_navbar_order_idx" ON "_pages_v_blocks_navbar" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_navbar_parent_id_idx" ON "_pages_v_blocks_navbar" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_navbar_path_idx" ON "_pages_v_blocks_navbar" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_navbar_logo_idx" ON "_pages_v_blocks_navbar" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_navbar_locales_locale_parent_id_unique" ON "_pages_v_blocks_navbar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_announcement_bar_order_idx" ON "_pages_v_blocks_announcement_bar" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_announcement_bar_parent_id_idx" ON "_pages_v_blocks_announcement_bar" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_announcement_bar_path_idx" ON "_pages_v_blocks_announcement_bar" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_announcement_bar_locales_locale_parent_id_un" ON "_pages_v_blocks_announcement_bar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_background_image_idx" ON "_pages_v_blocks_hero" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_services_overview_pills_order_idx" ON "_pages_v_blocks_services_overview_pills" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_overview_pills_parent_id_idx" ON "_pages_v_blocks_services_overview_pills" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_services_overview_pills_locales_locale_paren" ON "_pages_v_blocks_services_overview_pills_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_services_overview_bullets_order_idx" ON "_pages_v_blocks_services_overview_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_overview_bullets_parent_id_idx" ON "_pages_v_blocks_services_overview_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_services_overview_bullets_locales_locale_par" ON "_pages_v_blocks_services_overview_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_services_overview_order_idx" ON "_pages_v_blocks_services_overview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_overview_parent_id_idx" ON "_pages_v_blocks_services_overview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_overview_path_idx" ON "_pages_v_blocks_services_overview" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_services_overview_locales_locale_parent_id_u" ON "_pages_v_blocks_services_overview_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_service_highlights_strip_order_idx" ON "_pages_v_blocks_service_highlights_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_highlights_strip_parent_id_idx" ON "_pages_v_blocks_service_highlights_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_highlights_strip_path_idx" ON "_pages_v_blocks_service_highlights_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_highlights_strip_background_imag_idx" ON "_pages_v_blocks_service_highlights_strip" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_service_highlights_strip_locales_locale_pare" ON "_pages_v_blocks_service_highlights_strip_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_our_mission_order_idx" ON "_pages_v_blocks_our_mission" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_mission_parent_id_idx" ON "_pages_v_blocks_our_mission" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_mission_path_idx" ON "_pages_v_blocks_our_mission" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_our_mission_background_image_idx" ON "_pages_v_blocks_our_mission" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_our_mission_locales_locale_parent_id_unique" ON "_pages_v_blocks_our_mission_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_steps_order_idx" ON "_pages_v_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_it_works_steps_parent_id_idx" ON "_pages_v_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_how_it_works_steps_locales_locale_parent_id_" ON "_pages_v_blocks_how_it_works_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_order_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_it_works_parent_id_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_path_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_how_it_works_locales_locale_parent_id_unique" ON "_pages_v_blocks_how_it_works_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_brand_divider1_order_idx" ON "_pages_v_blocks_brand_divider1" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_brand_divider1_parent_id_idx" ON "_pages_v_blocks_brand_divider1" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_brand_divider1_path_idx" ON "_pages_v_blocks_brand_divider1" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_brand_divider1_logo_idx" ON "_pages_v_blocks_brand_divider1" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_brand_divider1_locales_locale_parent_id_uniq" ON "_pages_v_blocks_brand_divider1_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_our_services_triptych_order_idx" ON "_pages_v_blocks_our_services_triptych" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_services_triptych_parent_id_idx" ON "_pages_v_blocks_our_services_triptych" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_services_triptych_path_idx" ON "_pages_v_blocks_our_services_triptych" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_our_services_triptych_background_image_idx" ON "_pages_v_blocks_our_services_triptych" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_our_services_triptych_locales_locale_parent_" ON "_pages_v_blocks_our_services_triptych_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_our_results_items_order_idx" ON "_pages_v_blocks_our_results_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_results_items_parent_id_idx" ON "_pages_v_blocks_our_results_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_results_items_before_image_idx" ON "_pages_v_blocks_our_results_items" USING btree ("before_image_id");
  CREATE INDEX "_pages_v_blocks_our_results_items_after_image_idx" ON "_pages_v_blocks_our_results_items" USING btree ("after_image_id");
  CREATE INDEX "_pages_v_blocks_our_results_order_idx" ON "_pages_v_blocks_our_results" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_results_parent_id_idx" ON "_pages_v_blocks_our_results" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_results_path_idx" ON "_pages_v_blocks_our_results" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_our_results_watermark_logo_idx" ON "_pages_v_blocks_our_results" USING btree ("watermark_logo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_our_results_locales_locale_parent_id_unique" ON "_pages_v_blocks_our_results_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_areas_we_serve_towns_order_idx" ON "_pages_v_blocks_areas_we_serve_towns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_areas_we_serve_towns_parent_id_idx" ON "_pages_v_blocks_areas_we_serve_towns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_areas_we_serve_towns_locales_locale_parent_i" ON "_pages_v_blocks_areas_we_serve_towns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_areas_we_serve_order_idx" ON "_pages_v_blocks_areas_we_serve" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_areas_we_serve_parent_id_idx" ON "_pages_v_blocks_areas_we_serve" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_areas_we_serve_path_idx" ON "_pages_v_blocks_areas_we_serve" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_areas_we_serve_locales_locale_parent_id_uniq" ON "_pages_v_blocks_areas_we_serve_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_items_order_idx" ON "_pages_v_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_items_parent_id_idx" ON "_pages_v_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_accordion_items_locales_locale_parent_id" ON "_pages_v_blocks_faq_accordion_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_order_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_parent_id_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_path_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_accordion_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_faq_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_brand_divider2_order_idx" ON "_pages_v_blocks_brand_divider2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_brand_divider2_parent_id_idx" ON "_pages_v_blocks_brand_divider2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_brand_divider2_path_idx" ON "_pages_v_blocks_brand_divider2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_brand_divider2_logo_idx" ON "_pages_v_blocks_brand_divider2" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_brand_divider2_locales_locale_parent_id_uniq" ON "_pages_v_blocks_brand_divider2_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_us_hours_order_idx" ON "_pages_v_blocks_contact_us_hours" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_us_hours_parent_id_idx" ON "_pages_v_blocks_contact_us_hours" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_us_hours_locales_locale_parent_id_un" ON "_pages_v_blocks_contact_us_hours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_us_categories_order_idx" ON "_pages_v_blocks_contact_us_categories" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_us_categories_parent_id_idx" ON "_pages_v_blocks_contact_us_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_us_categories_locales_locale_parent_" ON "_pages_v_blocks_contact_us_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_us_weekly_template_slots_order_idx" ON "_pages_v_blocks_contact_us_weekly_template_slots" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_us_weekly_template_slots_parent_id_idx" ON "_pages_v_blocks_contact_us_weekly_template_slots" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_us_weekly_template_slots_locales_loc" ON "_pages_v_blocks_contact_us_weekly_template_slots_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_us_weekly_template_order_idx" ON "_pages_v_blocks_contact_us_weekly_template" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_us_weekly_template_parent_id_idx" ON "_pages_v_blocks_contact_us_weekly_template" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_us_weekly_template_locales_locale_pa" ON "_pages_v_blocks_contact_us_weekly_template_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_us_order_idx" ON "_pages_v_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_us_parent_id_idx" ON "_pages_v_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_us_path_idx" ON "_pages_v_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_us_steps_icon_idx" ON "_pages_v_blocks_contact_us" USING btree ("steps_icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_us_locales_locale_parent_id_unique" ON "_pages_v_blocks_contact_us_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_order_idx" ON "_pages_v_blocks_footer" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_parent_id_idx" ON "_pages_v_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_path_idx" ON "_pages_v_blocks_footer" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_footer_logo_idx" ON "_pages_v_blocks_footer" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_footer_locales_locale_parent_id_unique" ON "_pages_v_blocks_footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_photo_heading_band_order_idx" ON "_pages_v_blocks_photo_heading_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_photo_heading_band_parent_id_idx" ON "_pages_v_blocks_photo_heading_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_photo_heading_band_path_idx" ON "_pages_v_blocks_photo_heading_band" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_photo_heading_band_background_image_idx" ON "_pages_v_blocks_photo_heading_band" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_photo_heading_band_locales_locale_parent_id_" ON "_pages_v_blocks_photo_heading_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_what_do_you_need_order_idx" ON "_pages_v_blocks_what_do_you_need" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_what_do_you_need_parent_id_idx" ON "_pages_v_blocks_what_do_you_need" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_what_do_you_need_path_idx" ON "_pages_v_blocks_what_do_you_need" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_what_do_you_need_locales_locale_parent_id_un" ON "_pages_v_blocks_what_do_you_need_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_highlight_bar_order_idx" ON "_pages_v_blocks_highlight_bar" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_highlight_bar_parent_id_idx" ON "_pages_v_blocks_highlight_bar" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_highlight_bar_path_idx" ON "_pages_v_blocks_highlight_bar" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_highlight_bar_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_highlight_bar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_services_selector_items_order_idx" ON "_pages_v_blocks_services_selector_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_selector_items_parent_id_idx" ON "_pages_v_blocks_services_selector_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_services_selector_items_locales_locale_paren" ON "_pages_v_blocks_services_selector_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_services_selector_order_idx" ON "_pages_v_blocks_services_selector" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_selector_parent_id_idx" ON "_pages_v_blocks_services_selector" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_selector_path_idx" ON "_pages_v_blocks_services_selector" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_sections_id_idx" ON "_pages_v_rels" USING btree ("sections_id");
  CREATE INDEX "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  CREATE INDEX "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  CREATE INDEX "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("sections_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx" ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_globals_components_order_idx" ON "site_globals_components" USING btree ("_order");
  CREATE INDEX "site_globals_components_parent_id_idx" ON "site_globals_components" USING btree ("_parent_id");
  CREATE INDEX "site_globals_components_component_idx" ON "site_globals_components" USING btree ("component_id");
  CREATE INDEX "site_globals_brand_brand_logo_idx" ON "site_globals" USING btree ("brand_logo_id");
  CREATE INDEX "site_globals_brand_brand_favicon_idx" ON "site_globals" USING btree ("brand_favicon_id");
  CREATE INDEX "site_globals__status_idx" ON "site_globals" USING btree ("_status");
  CREATE UNIQUE INDEX "site_globals_locales_locale_parent_id_unique" ON "site_globals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_globals_v_version_components_order_idx" ON "_site_globals_v_version_components" USING btree ("_order");
  CREATE INDEX "_site_globals_v_version_components_parent_id_idx" ON "_site_globals_v_version_components" USING btree ("_parent_id");
  CREATE INDEX "_site_globals_v_version_components_component_idx" ON "_site_globals_v_version_components" USING btree ("component_id");
  CREATE INDEX "_site_globals_v_version_brand_version_brand_logo_idx" ON "_site_globals_v" USING btree ("version_brand_logo_id");
  CREATE INDEX "_site_globals_v_version_brand_version_brand_favicon_idx" ON "_site_globals_v" USING btree ("version_brand_favicon_id");
  CREATE INDEX "_site_globals_v_version_version__status_idx" ON "_site_globals_v" USING btree ("version__status");
  CREATE INDEX "_site_globals_v_created_at_idx" ON "_site_globals_v" USING btree ("created_at");
  CREATE INDEX "_site_globals_v_updated_at_idx" ON "_site_globals_v" USING btree ("updated_at");
  CREATE INDEX "_site_globals_v_snapshot_idx" ON "_site_globals_v" USING btree ("snapshot");
  CREATE INDEX "_site_globals_v_published_locale_idx" ON "_site_globals_v" USING btree ("published_locale");
  CREATE INDEX "_site_globals_v_latest_idx" ON "_site_globals_v" USING btree ("latest");
  CREATE INDEX "_site_globals_v_autosave_idx" ON "_site_globals_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_site_globals_v_locales_locale_parent_id_unique" ON "_site_globals_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "sections_blocks_navbar_links" CASCADE;
  DROP TABLE "sections_blocks_navbar_links_locales" CASCADE;
  DROP TABLE "sections_blocks_navbar" CASCADE;
  DROP TABLE "sections_blocks_navbar_locales" CASCADE;
  DROP TABLE "sections_blocks_announcement_bar" CASCADE;
  DROP TABLE "sections_blocks_announcement_bar_locales" CASCADE;
  DROP TABLE "sections_blocks_hero" CASCADE;
  DROP TABLE "sections_blocks_hero_locales" CASCADE;
  DROP TABLE "sections_blocks_services_overview_pills" CASCADE;
  DROP TABLE "sections_blocks_services_overview_pills_locales" CASCADE;
  DROP TABLE "sections_blocks_services_overview_bullets" CASCADE;
  DROP TABLE "sections_blocks_services_overview_bullets_locales" CASCADE;
  DROP TABLE "sections_blocks_services_overview" CASCADE;
  DROP TABLE "sections_blocks_services_overview_locales" CASCADE;
  DROP TABLE "sections_blocks_service_highlights_strip" CASCADE;
  DROP TABLE "sections_blocks_service_highlights_strip_locales" CASCADE;
  DROP TABLE "sections_blocks_our_mission" CASCADE;
  DROP TABLE "sections_blocks_our_mission_locales" CASCADE;
  DROP TABLE "sections_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "sections_blocks_how_it_works_steps_locales" CASCADE;
  DROP TABLE "sections_blocks_how_it_works" CASCADE;
  DROP TABLE "sections_blocks_how_it_works_locales" CASCADE;
  DROP TABLE "sections_blocks_brand_divider1" CASCADE;
  DROP TABLE "sections_blocks_brand_divider1_locales" CASCADE;
  DROP TABLE "sections_blocks_our_services_triptych" CASCADE;
  DROP TABLE "sections_blocks_our_services_triptych_locales" CASCADE;
  DROP TABLE "sections_blocks_our_results_items" CASCADE;
  DROP TABLE "sections_blocks_our_results" CASCADE;
  DROP TABLE "sections_blocks_our_results_locales" CASCADE;
  DROP TABLE "sections_blocks_areas_we_serve_towns" CASCADE;
  DROP TABLE "sections_blocks_areas_we_serve_towns_locales" CASCADE;
  DROP TABLE "sections_blocks_areas_we_serve" CASCADE;
  DROP TABLE "sections_blocks_areas_we_serve_locales" CASCADE;
  DROP TABLE "sections_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "sections_blocks_faq_accordion_items_locales" CASCADE;
  DROP TABLE "sections_blocks_faq_accordion" CASCADE;
  DROP TABLE "sections_blocks_faq_accordion_locales" CASCADE;
  DROP TABLE "sections_blocks_brand_divider2" CASCADE;
  DROP TABLE "sections_blocks_brand_divider2_locales" CASCADE;
  DROP TABLE "sections_blocks_contact_us_hours" CASCADE;
  DROP TABLE "sections_blocks_contact_us_hours_locales" CASCADE;
  DROP TABLE "sections_blocks_contact_us_categories" CASCADE;
  DROP TABLE "sections_blocks_contact_us_categories_locales" CASCADE;
  DROP TABLE "sections_blocks_contact_us_weekly_template_slots" CASCADE;
  DROP TABLE "sections_blocks_contact_us_weekly_template_slots_locales" CASCADE;
  DROP TABLE "sections_blocks_contact_us_weekly_template" CASCADE;
  DROP TABLE "sections_blocks_contact_us_weekly_template_locales" CASCADE;
  DROP TABLE "sections_blocks_contact_us" CASCADE;
  DROP TABLE "sections_blocks_contact_us_locales" CASCADE;
  DROP TABLE "sections_blocks_footer" CASCADE;
  DROP TABLE "sections_blocks_footer_locales" CASCADE;
  DROP TABLE "sections_blocks_photo_heading_band" CASCADE;
  DROP TABLE "sections_blocks_photo_heading_band_locales" CASCADE;
  DROP TABLE "sections_blocks_what_do_you_need" CASCADE;
  DROP TABLE "sections_blocks_what_do_you_need_locales" CASCADE;
  DROP TABLE "sections_blocks_highlight_bar" CASCADE;
  DROP TABLE "sections_blocks_highlight_bar_locales" CASCADE;
  DROP TABLE "sections_blocks_services_selector_items" CASCADE;
  DROP TABLE "sections_blocks_services_selector_items_locales" CASCADE;
  DROP TABLE "sections_blocks_services_selector" CASCADE;
  DROP TABLE "sections" CASCADE;
  DROP TABLE "sections_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_navbar_links" CASCADE;
  DROP TABLE "_sections_v_blocks_navbar_links_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_navbar" CASCADE;
  DROP TABLE "_sections_v_blocks_navbar_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_announcement_bar" CASCADE;
  DROP TABLE "_sections_v_blocks_announcement_bar_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_hero" CASCADE;
  DROP TABLE "_sections_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_services_overview_pills" CASCADE;
  DROP TABLE "_sections_v_blocks_services_overview_pills_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_services_overview_bullets" CASCADE;
  DROP TABLE "_sections_v_blocks_services_overview_bullets_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_services_overview" CASCADE;
  DROP TABLE "_sections_v_blocks_services_overview_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_service_highlights_strip" CASCADE;
  DROP TABLE "_sections_v_blocks_service_highlights_strip_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_our_mission" CASCADE;
  DROP TABLE "_sections_v_blocks_our_mission_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "_sections_v_blocks_how_it_works_steps_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_how_it_works" CASCADE;
  DROP TABLE "_sections_v_blocks_how_it_works_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_brand_divider1" CASCADE;
  DROP TABLE "_sections_v_blocks_brand_divider1_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_our_services_triptych" CASCADE;
  DROP TABLE "_sections_v_blocks_our_services_triptych_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_our_results_items" CASCADE;
  DROP TABLE "_sections_v_blocks_our_results" CASCADE;
  DROP TABLE "_sections_v_blocks_our_results_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_areas_we_serve_towns" CASCADE;
  DROP TABLE "_sections_v_blocks_areas_we_serve_towns_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_areas_we_serve" CASCADE;
  DROP TABLE "_sections_v_blocks_areas_we_serve_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "_sections_v_blocks_faq_accordion_items_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_sections_v_blocks_faq_accordion_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_brand_divider2" CASCADE;
  DROP TABLE "_sections_v_blocks_brand_divider2_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_contact_us_hours" CASCADE;
  DROP TABLE "_sections_v_blocks_contact_us_hours_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_contact_us_categories" CASCADE;
  DROP TABLE "_sections_v_blocks_contact_us_categories_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_contact_us_weekly_template_slots" CASCADE;
  DROP TABLE "_sections_v_blocks_contact_us_weekly_template_slots_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_contact_us_weekly_template" CASCADE;
  DROP TABLE "_sections_v_blocks_contact_us_weekly_template_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_contact_us" CASCADE;
  DROP TABLE "_sections_v_blocks_contact_us_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_footer" CASCADE;
  DROP TABLE "_sections_v_blocks_footer_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_photo_heading_band" CASCADE;
  DROP TABLE "_sections_v_blocks_photo_heading_band_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_what_do_you_need" CASCADE;
  DROP TABLE "_sections_v_blocks_what_do_you_need_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_highlight_bar" CASCADE;
  DROP TABLE "_sections_v_blocks_highlight_bar_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_services_selector_items" CASCADE;
  DROP TABLE "_sections_v_blocks_services_selector_items_locales" CASCADE;
  DROP TABLE "_sections_v_blocks_services_selector" CASCADE;
  DROP TABLE "_sections_v" CASCADE;
  DROP TABLE "_sections_v_locales" CASCADE;
  DROP TABLE "pages_blocks_navbar_links" CASCADE;
  DROP TABLE "pages_blocks_navbar_links_locales" CASCADE;
  DROP TABLE "pages_blocks_navbar" CASCADE;
  DROP TABLE "pages_blocks_navbar_locales" CASCADE;
  DROP TABLE "pages_blocks_announcement_bar" CASCADE;
  DROP TABLE "pages_blocks_announcement_bar_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_services_overview_pills" CASCADE;
  DROP TABLE "pages_blocks_services_overview_pills_locales" CASCADE;
  DROP TABLE "pages_blocks_services_overview_bullets" CASCADE;
  DROP TABLE "pages_blocks_services_overview_bullets_locales" CASCADE;
  DROP TABLE "pages_blocks_services_overview" CASCADE;
  DROP TABLE "pages_blocks_services_overview_locales" CASCADE;
  DROP TABLE "pages_blocks_service_highlights_strip" CASCADE;
  DROP TABLE "pages_blocks_service_highlights_strip_locales" CASCADE;
  DROP TABLE "pages_blocks_our_mission" CASCADE;
  DROP TABLE "pages_blocks_our_mission_locales" CASCADE;
  DROP TABLE "pages_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "pages_blocks_how_it_works_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_how_it_works" CASCADE;
  DROP TABLE "pages_blocks_how_it_works_locales" CASCADE;
  DROP TABLE "pages_blocks_brand_divider1" CASCADE;
  DROP TABLE "pages_blocks_brand_divider1_locales" CASCADE;
  DROP TABLE "pages_blocks_our_services_triptych" CASCADE;
  DROP TABLE "pages_blocks_our_services_triptych_locales" CASCADE;
  DROP TABLE "pages_blocks_our_results_items" CASCADE;
  DROP TABLE "pages_blocks_our_results" CASCADE;
  DROP TABLE "pages_blocks_our_results_locales" CASCADE;
  DROP TABLE "pages_blocks_areas_we_serve_towns" CASCADE;
  DROP TABLE "pages_blocks_areas_we_serve_towns_locales" CASCADE;
  DROP TABLE "pages_blocks_areas_we_serve" CASCADE;
  DROP TABLE "pages_blocks_areas_we_serve_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion_locales" CASCADE;
  DROP TABLE "pages_blocks_brand_divider2" CASCADE;
  DROP TABLE "pages_blocks_brand_divider2_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_us_hours" CASCADE;
  DROP TABLE "pages_blocks_contact_us_hours_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_us_categories" CASCADE;
  DROP TABLE "pages_blocks_contact_us_categories_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_us_weekly_template_slots" CASCADE;
  DROP TABLE "pages_blocks_contact_us_weekly_template_slots_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_us_weekly_template" CASCADE;
  DROP TABLE "pages_blocks_contact_us_weekly_template_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_us" CASCADE;
  DROP TABLE "pages_blocks_contact_us_locales" CASCADE;
  DROP TABLE "pages_blocks_footer" CASCADE;
  DROP TABLE "pages_blocks_footer_locales" CASCADE;
  DROP TABLE "pages_blocks_photo_heading_band" CASCADE;
  DROP TABLE "pages_blocks_photo_heading_band_locales" CASCADE;
  DROP TABLE "pages_blocks_what_do_you_need" CASCADE;
  DROP TABLE "pages_blocks_what_do_you_need_locales" CASCADE;
  DROP TABLE "pages_blocks_highlight_bar" CASCADE;
  DROP TABLE "pages_blocks_highlight_bar_locales" CASCADE;
  DROP TABLE "pages_blocks_services_selector_items" CASCADE;
  DROP TABLE "pages_blocks_services_selector_items_locales" CASCADE;
  DROP TABLE "pages_blocks_services_selector" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_navbar_links" CASCADE;
  DROP TABLE "_pages_v_blocks_navbar_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_navbar" CASCADE;
  DROP TABLE "_pages_v_blocks_navbar_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_announcement_bar" CASCADE;
  DROP TABLE "_pages_v_blocks_announcement_bar_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_services_overview_pills" CASCADE;
  DROP TABLE "_pages_v_blocks_services_overview_pills_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_services_overview_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_services_overview_bullets_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_services_overview" CASCADE;
  DROP TABLE "_pages_v_blocks_services_overview_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_service_highlights_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_service_highlights_strip_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_our_mission" CASCADE;
  DROP TABLE "_pages_v_blocks_our_mission_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_divider1" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_divider1_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_our_services_triptych" CASCADE;
  DROP TABLE "_pages_v_blocks_our_services_triptych_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_our_results_items" CASCADE;
  DROP TABLE "_pages_v_blocks_our_results" CASCADE;
  DROP TABLE "_pages_v_blocks_our_results_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_areas_we_serve_towns" CASCADE;
  DROP TABLE "_pages_v_blocks_areas_we_serve_towns_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_areas_we_serve" CASCADE;
  DROP TABLE "_pages_v_blocks_areas_we_serve_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_divider2" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_divider2_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_hours" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_hours_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_categories" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_categories_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_weekly_template_slots" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_weekly_template_slots_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_weekly_template" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_weekly_template_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_footer" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_photo_heading_band" CASCADE;
  DROP TABLE "_pages_v_blocks_photo_heading_band_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_what_do_you_need" CASCADE;
  DROP TABLE "_pages_v_blocks_what_do_you_need_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_bar" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_bar_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_services_selector_items" CASCADE;
  DROP TABLE "_pages_v_blocks_services_selector_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_services_selector" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "payload_mcp_api_keys" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_globals_components" CASCADE;
  DROP TABLE "site_globals" CASCADE;
  DROP TABLE "site_globals_locales" CASCADE;
  DROP TABLE "_site_globals_v_version_components" CASCADE;
  DROP TABLE "_site_globals_v" CASCADE;
  DROP TABLE "_site_globals_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_sections_blocks_areas_we_serve_towns_column";
  DROP TYPE "public"."enum_sections_blocks_photo_heading_band_heading_size";
  DROP TYPE "public"."enum_sections_blocks_photo_heading_band_text_align";
  DROP TYPE "public"."enum_sections_blocks_photo_heading_band_overlay_color";
  DROP TYPE "public"."enum_sections_status";
  DROP TYPE "public"."enum__sections_v_blocks_areas_we_serve_towns_column";
  DROP TYPE "public"."enum__sections_v_blocks_photo_heading_band_heading_size";
  DROP TYPE "public"."enum__sections_v_blocks_photo_heading_band_text_align";
  DROP TYPE "public"."enum__sections_v_blocks_photo_heading_band_overlay_color";
  DROP TYPE "public"."enum__sections_v_version_status";
  DROP TYPE "public"."enum__sections_v_published_locale";
  DROP TYPE "public"."enum_pages_blocks_areas_we_serve_towns_column";
  DROP TYPE "public"."enum_pages_blocks_photo_heading_band_heading_size";
  DROP TYPE "public"."enum_pages_blocks_photo_heading_band_text_align";
  DROP TYPE "public"."enum_pages_blocks_photo_heading_band_overlay_color";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_areas_we_serve_towns_column";
  DROP TYPE "public"."enum__pages_v_blocks_photo_heading_band_heading_size";
  DROP TYPE "public"."enum__pages_v_blocks_photo_heading_band_text_align";
  DROP TYPE "public"."enum__pages_v_blocks_photo_heading_band_overlay_color";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_site_globals_status";
  DROP TYPE "public"."enum__site_globals_v_version_status";
  DROP TYPE "public"."enum__site_globals_v_published_locale";`)
}
