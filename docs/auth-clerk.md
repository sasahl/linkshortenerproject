# Authentication – Clerk (`@clerk/nextjs` v7)

## Rules

- **Never** implement custom auth, sessions, JWTs, or NextAuth. Clerk is the only auth provider.
- **Always** use `mode="modal"` on `<SignInButton>` and `<SignUpButton>`. Never navigate to a standalone sign-in/sign-up page.
- **Always** import server-side auth utilities from `@clerk/nextjs/server`.
- **Always** import client-side components and hooks from `@clerk/nextjs`.

---

## Provider

`<ClerkProvider>` is already mounted in `app/layout.tsx`. Do not add it anywhere else.

---

## Middleware – Route Protection

`clerkMiddleware` lives in `proxy.ts` at the project root. **There is no `middleware.ts` file — do not create one.**

Add route protection by importing `createRouteMatcher` and extending the existing default export in `proxy.ts`:

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

- `/dashboard` and all sub-paths are protected; unauthenticated users are redirected to Clerk's sign-in flow.
- Do not call `auth.protect()` on public routes.
- Do **not** create a `middleware.ts` file alongside `proxy.ts`.

---

## Redirecting Signed-In Users Away From Homepage

In `app/page.tsx`, redirect authenticated users to `/dashboard` using server-side auth:

```ts
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");
  // render homepage for unauthenticated users...
}
```

---

## Sign In / Sign Up Buttons (Modal Only)

```tsx
import { SignInButton, SignUpButton } from "@clerk/nextjs";

<SignInButton mode="modal">
  <button>Sign in</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign up</button>
</SignUpButton>
```

The `mode="modal"` prop is **required**. Never omit it. Never link to `/sign-in` or `/sign-up` pages.

---

## Conditional UI Rendering

Use Clerk's `<Show>` component (already available in `@clerk/nextjs`):

```tsx
import { Show } from "@clerk/nextjs";

<Show when="signed-out">
  <SignInButton mode="modal" />
  <SignUpButton mode="modal" />
</Show>
<Show when="signed-in">
  <UserButton />
</Show>
```

---

## Reading Auth State – Server Components

```ts
import { auth, currentUser } from "@clerk/nextjs/server";

const { userId } = await auth();          // lightweight – userId only
const user = await currentUser();         // full user object when needed
```

---

## Reading Auth State – Client Components

```ts
"use client";
import { useAuth, useUser } from "@clerk/nextjs";

const { userId, isSignedIn } = useAuth();
const { user } = useUser();
```

---

## Anti-Patterns

- Do **not** create `app/sign-in/` or `app/sign-up/` route directories.
- Do **not** use `getServerSideProps` or `getStaticProps` for auth checks (App Router only).
- Do **not** read `req.cookies` or `req.headers` manually to determine auth state.
- Do **not** wrap individual pages in `<ClerkProvider>` — it is globally provided.
