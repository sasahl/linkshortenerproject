import { db } from "@/db/indesx";
import { links } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function getLinksByUserId(userId: string) {
  return db.select().from(links).where(eq(links.userId, userId)).orderBy(desc(links.updatedAt));
}

export async function createLink({
  userId,
  shortCode,
  originalUrl,
}: {
  userId: string;
  shortCode: string;
  originalUrl: string;
}) {
  const result = await db
    .insert(links)
    .values({ userId, shortCode, originalUrl })
    .returning();
  return result[0];
}

export async function updateLink({
  id,
  userId,
  shortCode,
  originalUrl,
}: {
  id: number;
  userId: string;
  shortCode: string;
  originalUrl: string;
}) {
  const result = await db
    .update(links)
    .set({ shortCode, originalUrl, updatedAt: new Date() })
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();
  return result[0];
}

export async function deleteLink({ id, userId }: { id: number; userId: string }) {
  await db.delete(links).where(and(eq(links.id, id), eq(links.userId, userId)));
}

export async function getLinkByShortCode(shortCode: string) {
  const result = await db.select().from(links).where(eq(links.shortCode, shortCode)).limit(1);
  return result[0] ?? null;
}
