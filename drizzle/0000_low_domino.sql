CREATE TABLE "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"short_code" varchar(32) NOT NULL,
	"original_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "links_short_code_unique_idx" ON "links" USING btree ("short_code");--> statement-breakpoint
CREATE INDEX "links_user_id_idx" ON "links" USING btree ("user_id");