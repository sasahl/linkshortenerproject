---
agent: instructions-generator
---

Take the information below and generate a [NAME].instructions.md file in the /.github/instructions/ directory.
Generate an appropriate name for the [NAME] placeholder based on the domain or technology being documented so that the resulting file is named `<domain-or-technology>.instructions.md`.
Make sure the instructions are concise and not too long.

Generate a concise, LLM-optimised instruction file in this project.
If no information is provided, prompt the user to give the necessary details about the architecture or coding standard to be documented. Use the project context and existing docs to ensure consistency and avoid duplication.
IMPORTANT: The generated `<domain-or-technology>.instructions.md` file should have a frontmatter with the description property that informs copilot of when to use this set of instructions.

## Output Requirements

Create a single Markdown file following these rules:

1. **YAML front matter** — the file must include a frontmatter header with a `description` property that explains when Copilot should use this set of instructions.
2. **H1 title** — matches the domain name, e.g. `# Database – Drizzle ORM + Neon PostgreSQL`.
3. **Sections** — cover only what an LLM needs before generating code: conventions, file locations, import patterns, anti-patterns, and short code examples where they add clarity.
4. **Be prescriptive, not descriptive** — use imperative phrasing ("Always import from...", "Never use...") rather than explanatory prose.
5. **Code examples** — use fenced blocks with the correct language tag. Keep them minimal (3–10 lines).
6. **Length** — aim for 60–120 lines. Do not pad with obvious statements.