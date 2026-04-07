---
description: Read this file to understand how to implement data mutations (create, update, delete) using server actions in this project.
---

# Server Actions – Data Mutations

## Rules

- **Always** use server actions for all data mutations (create, update, delete). Never mutate data from API routes or directly inside components.
- **Always** call server actions from **client components** only.
- **Always** name server action files `actions.ts` and colocate them in the same directory as the client component that calls them.
- **Never** use the `FormData` TypeScript type for server action parameters. Always define explicit TypeScript types or interfaces.
- **Never** throw errors inside server actions. Always return an object with either a `success` property or an `error` property (a descriptive string).
- **Always** validate all incoming data with **Zod** before any business logic or database operations.
- **Always** check for an authenticated user at the top of every server action before proceeding. Use Clerk's `auth()` from `@clerk/nextjs/server`.
- **Never** call Drizzle queries directly inside server actions. Always use the helper functions in the `/data` directory.

---

## File Structure

```
app/
  dashboard/
    components/
      create-link-form/
        create-link-form.tsx   ← client component ("use client")
        actions.ts             ← server action ("use server")
```

---

## Server Action Template

```ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";

const CreateLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(1).max(64),
});

type CreateLinkInput = z.infer<typeof CreateLinkSchema>;

export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = CreateLinkSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  try {
    const link = await createLink({ ...parsed.data, userId });
    return { success: true, data: link };
  } catch {
    return { error: "Failed to create link" };
  }
}
```

---

## Client Component Calling the Action

```tsx
"use client";

import { createLinkAction } from "./actions";

export function CreateLinkForm() {
  async function handleSubmit(data: { url: string; slug: string }) {
    await createLinkAction(data);
  }
  // ...
}
```

---

## Anti-patterns

- Do **not** use `FormData` as parameter type — use typed objects instead.
- Do **not** import from `drizzle-orm` or `@/db` inside `actions.ts` — use `/data` helpers only.
- Do **not** place `actions.ts` in a shared or global directory; it must live next to the component that uses it.
- Do **not** skip auth checks, even for seemingly public operations.
- Do **not** `throw` inside a server action — always return `{ error: "..." }` so the client can handle failures gracefully.
