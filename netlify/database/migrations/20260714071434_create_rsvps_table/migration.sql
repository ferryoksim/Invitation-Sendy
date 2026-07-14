CREATE TABLE "rsvps" (
	"id" serial PRIMARY KEY,
	"full_name" text NOT NULL,
	"phone_number" text NOT NULL,
	"attending" boolean NOT NULL,
	"message" text DEFAULT '',
	"created_at" timestamp DEFAULT now()
);
