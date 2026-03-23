# AGENTS.md

## Cursor Cloud specific instructions

This is a SvelteKit 2 + Svelte 5 (runes mode) + TailwindCSS 4 site. All data is static YAML files in `src/data/`; there are no databases, APIs, or environment variables.

**Package manager:** Bun (lockfile: `bun.lock`).

**Scripts** (see `package.json` for full list):
- `bun run dev` — start Vite dev server (default port 5173)
- `bun run check` — svelte-check + TypeScript type checking
- `bun run lint` — Prettier + ESLint
- `bun run format` — auto-format with Prettier
- `bun run build` — production build
- `bun run preview` — preview production build

**Lint notes:** The repo has 3 pre-existing ESLint errors (`svelte/require-each-key`, `svelte/no-at-html-tags`, `svelte/no-navigation-without-resolve`). These are in the checked-in code and are not regressions.

**Dev server:** Use `bun run dev --host 0.0.0.0` when you need the server accessible from outside localhost (e.g., for browser-based testing in Cloud Agent environments).
