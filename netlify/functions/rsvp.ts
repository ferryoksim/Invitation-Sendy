// RSVP API — handles listing, creating, and deleting guest RSVP entries.
import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { rsvps } from "../../db/schema.js";

export default async (req: Request) => {
  const url = new URL(req.url);

  if (req.method === "GET") {
    const all = await db.select().from(rsvps).orderBy(rsvps.createdAt);
    return Response.json(all.reverse());
  }

  if (req.method === "POST") {
    const body = await req.json();
    const fullName = String(body.fullName || "").trim();
    const phoneNumber = String(body.phoneNumber || "").trim();
    const attending = Boolean(body.attending);
    const message = String(body.message || "").trim();

    if (!fullName || !phoneNumber) {
      return Response.json({ error: "Full name and phone number are required." }, { status: 400 });
    }

    const [created] = await db
      .insert(rsvps)
      .values({ fullName, phoneNumber, attending, message })
      .returning();

    return Response.json(created, { status: 201 });
  }

  if (req.method === "DELETE") {
    const id = Number(url.searchParams.get("id"));
    if (!id) {
      return Response.json({ error: "Missing id." }, { status: 400 });
    }
    await db.delete(rsvps).where(eq(rsvps.id, id));
    return Response.json({ success: true });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/rsvp",
};
