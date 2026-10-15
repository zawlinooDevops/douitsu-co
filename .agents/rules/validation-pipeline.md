# Validation Pipeline & Pre-flight Quality Assurance Specifications

## 1. Overview & Policy

To preserve production stability, code quality, and strict standards for **DOUITSU LLC**, all code changes, component updates, styling modifications, and content additions MUST pass the **5-Stage Validation Pipeline** before running `git add`, `git commit`, or `git push`.

```text
[1. ESLint] ──> [2. CSS Check] ──> [3. Astro Check] ──> [4. Build] ──> [5. HTML Validate] ──> [Git Commit / Deploy]
```

### Mandatory Quality Gate
- **Zero Errors Policy**: Every stage must exit with code `0`. Any warning or failure stops the pipeline immediately (`set -euo pipefail`).
- **Trigger Timing**:
  1. After completing any code, style, or component modification.
  2. Before staging or committing (`git commit`).
  3. Pre-push to remote repository (`git push`).

---

## 2. The 5 Validation Stages

### Stage 1: ESLint (JavaScript, TypeScript & Astro Frontmatter)
- **Command**: `npm run lint:eslint` (`eslint .`)
- **Scope**: Scans all `.astro`, `.ts`, `.js`, and `.mjs` source files.
- **Config**: `eslint.config.mjs` (ESLint v9/v10 flat configuration).
- **Parsers**: Uses `eslint-plugin-astro` with `@typescript-eslint/parser` for Astro frontmatter TypeScript interfaces and props contracts.
- **Ignored**: `dist/**`, `.astro/**`, `node_modules/**`, `raw-data/**`, `public/**`.

### Stage 2: CSS Check (Stylelint for Tailwind & Global CSS)
- **Command**: `npm run lint:css` (`stylelint "src/**/*.css"`)
- **Scope**: Scans `src/styles/fonts.css`, `src/styles/global.css`, and any external stylesheets.
- **Config**: `.stylelintrc.json` using `stylelint-config-standard`.
- **Tailwind Compatibility**: Tailored rules permitting `@tailwind`, `@layer`, and `@apply` at-rules, while enforcing clean font URLs and standard property formatting.

### Stage 3: Astro Diagnostic & Type Check
- **Command**: `npm run check:astro` (`astro check`)
- **Scope**: Complete TypeScript type analysis and Astro template validation.
- **Config**: `tsconfig.json` (extending `astro/tsconfigs/strict`) and `src/env.d.ts`.
- **Standard**: Must complete with `0 errors`, `0 warnings`, and `0 hints`.

### Stage 4: Static Site Generation (Build)
- **Command**: `npm run build` (`astro build`)
- **Scope**: Static site compilation into `dist/`.
- **Verifies**: Ensures all imports, Alpine.js bundles, dynamic routes, and static assets compile successfully into production files (`dist/index.html`).

### Stage 5: HTML Validate (Static Output Validation)
- **Command**: `npm run validate:html` (`html-validate dist/`)
- **Scope**: Validates compiled HTML documents in `dist/` against HTML5 / W3C web standards.
- **Config**: `.htmlvalidate.json` extending `html-validate:recommended`.
- **Accessibility & Quality**: Ensures unique landmark names (`aria-label` on `<nav>` elements), valid attributes, and semantic element structures.

---

## 3. Development Commands

```bash
# Run the complete 5-stage validation pipeline
npm run validate

# Or execute the runner script directly
./scripts/validate.sh

# Run quick code checks only (ESLint + CSS + Astro Check)
npm run check

# Run individual checks
npm run lint:eslint     # ESLint code checks
npm run lint:css        # Stylelint CSS checks
npm run check:astro     # Astro & TypeScript diagnostic check
npm run validate:html   # HTML5 validation on dist/
```

---

## 4. Git Pre-Commit Hook Automation

The project includes an automatic pre-commit hook located at `.git/hooks/pre-commit`:

```bash
#!/usr/bin/env bash
set -e
echo "🔍 Running DOUITSU pre-commit validation pipeline..."
npm run validate
```

When running `git commit`, Git automatically triggers `npm run validate`. If any check fails, the commit is safely rejected until all issues are resolved.

> [!NOTE]
> If urgent debugging is needed, Git allows bypassing the hook using `git commit --no-verify`, but this is strictly discouraged for production commits.

---

## 5. Configuration Files Inventory

| Configuration File | Purpose & Tool |
|---|---|
| `scripts/validate.sh` | Master pipeline runner script with colored terminal output and stage tracking |
| `eslint.config.mjs` | ESLint flat config with Astro & TypeScript frontmatter parser |
| `.stylelintrc.json` | Stylelint rules for standard CSS and Tailwind at-rules |
| `tsconfig.json` | TypeScript configuration extending `astro/tsconfigs/strict` |
| `src/env.d.ts` | Astro client and Alpine.js module ambient type declarations |
| `.htmlvalidate.json` | HTML-validate rules for compiled static output in `dist/` |
| `.git/hooks/pre-commit` | Git hook triggering `npm run validate` on each commit |
| `package.json` | Centralized npm script targets (`validate`, `check`, `lint:*`) |

---

## 6. Pre-Commit / Pre-Push Agent Checklist

Before any AI agent concludes a coding task or commits changes, verify:
- [ ] Ran `npm run validate` and all 5 stages passed.
- [ ] `eslint` returned 0 errors.
- [ ] `stylelint` returned 0 errors.
- [ ] `astro check` returned 0 errors and 0 warnings.
- [ ] `npm run build` generated fresh static files in `dist/`.
- [ ] `html-validate dist/` passed with 0 errors.
