"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updateLink, deleteLink } from "@/data/links";

const UpdateLinkSchema = z.object({
  id: z.number().int().positive(),
  originalUrl: z.url({ error: "Please enter a valid URL" }),
  shortCode: z
    .string()
    .min(1, "Short code is required")
    .max(32, "Short code must be 32 characters or fewer")
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, hyphens, and underscores are allowed"),
});

const DeleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

type UpdateLinkInput = z.infer<typeof UpdateLinkSchema>;
type DeleteLinkInput = z.infer<typeof DeleteLinkSchema>;

export async function updateLinkAction(input: UpdateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = UpdateLinkSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  try {
    const link = await updateLink({ ...parsed.data, userId });
    if (!link) return { error: "Link not found" };
    revalidatePath("/dashboard");
    return { success: true, data: link };
  } catch {
    return { error: "Failed to update link. The short code may already be taken." };
  }
}

export async function deleteLinkAction(input: DeleteLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = DeleteLinkSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  try {
    await deleteLink({ id: parsed.data.id, userId });
    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { error: "Failed to delete link" };
  }
}
