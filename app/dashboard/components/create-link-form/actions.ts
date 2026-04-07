"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createLink } from "@/data/links";

const CreateLinkSchema = z.object({
  originalUrl: z.url({ error: "Please enter a valid URL" }),
  shortCode: z
    .string()
    .min(1, "Short code is required")
    .max(32, "Short code must be 32 characters or fewer")
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, hyphens, and underscores are allowed"),
});

type CreateLinkInput = z.infer<typeof CreateLinkSchema>;

export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = CreateLinkSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  try {
    const link = await createLink({ ...parsed.data, userId });
    revalidatePath("/dashboard");
    return { success: true, data: link };
  } catch {
    return { error: "Failed to create link. The short code may already be taken." };
  }
}
