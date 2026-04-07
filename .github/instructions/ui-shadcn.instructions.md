---
description: This file describes how to use shadcn/ui components in this project. Read this when adding or modifying UI components.
---

# UI – shadcn/ui

## Rules

- **Never** create custom UI components from scratch. Always use a shadcn/ui component.
- **Always** install missing components via the CLI before using them: `npx shadcn@latest add <component>`.
- **Always** import UI components from `@/components/ui/<component>`.
- **Never** import directly from `radix-ui` primitives or any other headless library — use the shadcn wrappers only.
- **Never** inline Tailwind utility classes to recreate a component that shadcn already provides (e.g. custom buttons, dialogs, inputs).
- **Always** use the `lucide-react` icon library for icons. Do not add a second icon library.

---

## Project Configuration

| Setting | Value |
|---|---|
| Style | `radix-nova` |
| Base colour | `neutral` |
| CSS variables | `true` |
| Icon library | `lucide` |
| Components alias | `@/components/ui` |
| Utils alias | `@/lib/utils` |

Config lives in `components.json` at the project root. Do not edit it manually.

---

## Adding a New Component

```bash
npx shadcn@latest add <component-name>
```

The file is written to `components/ui/<component-name>.tsx`. Commit it — do not re-generate on every install.

---

## Import Pattern

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

---

## Theming & Variants

- Colour tokens are CSS variables defined in `app/globals.css`. Never hardcode hex/rgb values.
- Use the component's built-in `variant` and `size` props before adding custom classes.
- Extend appearance with `className` only for layout/spacing adjustments, not to override component colours.

```tsx
// Correct – use built-in variant
<Button variant="destructive" size="sm">Delete</Button>

// Wrong – overriding colours manually
<Button className="bg-red-500 text-white">Delete</Button>
```

---

## Icons

```tsx
import { Link2, Copy, Trash2 } from "lucide-react";

<Button size="icon" variant="ghost">
  <Copy className="h-4 w-4" />
</Button>
```

Always size icons with `h-4 w-4` (standard) or `h-5 w-5` (prominent). Do not use arbitrary values.

---

## Anti-Patterns

- Do not create `components/CustomButton.tsx` or similar wrappers around shadcn primitives.
- Do not use `<dialog>` or `<input>` HTML elements directly — use `<Dialog>` and `<Input>` from shadcn.
- Do not copy-paste shadcn source code inline; always install via CLI and import from `@/components/ui`.
