<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Instructions – Link Shortener Project

> ## ⛔ HARD REQUIREMENT — NO EXCEPTIONS
> **You MUST read the relevant file(s) from the `/docs` directory BEFORE writing, generating, or modifying ANY code.**
> Skipping this step is not allowed under any circumstances — not for small changes, not for "obvious" fixes, not for boilerplate.
> If a task touches authentication, UI, or any other domain listed below: **open and read the file first, then write code.**

The `/docs` directory is the authoritative source for this project's coding standards. Each file defines strict rules for its domain. Violating these rules will produce incorrect output that must be redone.

**Required reading workflow:**
1. Identify which domain(s) the task touches (see table below).
2. Read each relevant `/docs` file in full using the file-reading tool.
3. Only then generate or modify code.

| Domain | File | Key topics |
|---|---|---|
| Authentication | [docs/auth-clerk.md](docs/auth-clerk.md) | Clerk v7, middleware, protected routes, modal sign-in/up, redirect logic |
| UI Components | [docs/ui-shadcn.md](docs/ui-shadcn.md) | shadcn/ui only, CLI install, import paths, variants, lucide icons, anti-patterns |


