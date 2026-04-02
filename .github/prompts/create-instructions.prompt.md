---
description: "Generate a domain-specific instruction file in /docs for this project. Use when adding a new coding standard, architecture layer, or technology guide."
name: "Create Instructions File"
argument-hint: "Domain to document (e.g. 'database', 'authentication', 'API routes')"
agent: "instructions-generator"
tools: [read, edit, search]
---

Generate a concise, LLM-optimised instruction file for the `/docs` directory in this project.
If no information is provided, prompt the user to give the necessary details about the architecture or coding standard to be documented. Use the project context and existing docs to ensure consistency and avoid duplication.

## Inputs

- **Domain**: $input
- **Project context**: [AGENTS.md](../../AGENTS.md)
- **Existing docs**: reference files already in `docs/` to ensure consistent structure and avoid duplication.

## Output Requirements

Create a single Markdown file at `docs/<domain-slug>.md` following these rules:

1. **No YAML front matter** — these files are plain Markdown consumed at runtime by agent instructions, not VS Code primitives.
2. **H1 title** — matches the domain name, e.g. `# Database – Drizzle ORM + Neon PostgreSQL`.
3. **Sections** — cover only what an LLM needs before generating code: conventions, file locations, import patterns, anti-patterns, and short code examples where they add clarity.
4. **Be prescriptive, not descriptive** — use imperative phrasing ("Always import from...", "Never use...") rather than explanatory prose.
5. **Code examples** — use fenced blocks with the correct language tag. Keep them minimal (3–10 lines).
6. **Length** — aim for 60–120 lines. Do not pad with obvious statements.

## After Creating the File

Update the table in [AGENTS.md](../../AGENTS.md) to add a row for the new file so agents can discover it.
