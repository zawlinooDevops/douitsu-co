# Semantic Versioning & Pre-Push Release Protocol

## 1. Overview & Policy Objective

To ensure strict release stability, accurate deployment auditing, and user alignment:
- The website displays the active application version in the footer's bottom-right copyright row (`v{siteData.meta.version}`).
- **MANDATORY AGENT RULE**: AI agents MUST NEVER perform a `git push` or release commit unilaterally without first asking the user for the version bump decision.
- Every release must adhere to standard **Semantic Versioning (SemVer)**: `MAJOR.MINOR.PATCH`.
- The AI agent is responsible for analyzing session changes, formulating a recommended bump category with clear rationale, and presenting it to the user.
- **The USER makes the final decision.**

---

## 2. Version Storage Locations (Single Source of Truth)

The version is defined and synchronized across:
1. `package.json` — `"version": "x.y.z"` (Authoritative project manifest)
2. `src/data/content.ts` — `siteData.meta.version: "x.y.z"` (Centralized content schema)
3. `src/components/Footer.astro` — Renders `v{siteData.meta.version}` in the right corner of the copyright bar.

Whenever bumping the version, both `package.json` and `src/data/content.ts` MUST be updated synchronously.

---

## 3. Semantic Versioning (SemVer) Classification Guidelines

| Level | Format | Trigger Criteria & Scope | Examples in DOUITSU Codebase |
|---|---|---|---|
| **Patch** | `x.y.Z` (e.g. `1.0.0` → `1.0.1`) | • Bug fixes<br>• Content/copy corrections<br>• Visual styling adjustments<br>• Asset/image updates (e.g. social share card URL fix, flyer swap)<br>• Non-breaking performance tweaks | • Fixing phone number or address typo<br>• Changing domain text in banner image<br>• Adjusting mobile menu padding |
| **Minor** | `x.Y.0` (e.g. `1.0.0` → `1.1.0`) | • New user-facing sections or features<br>• New interactive components (e.g. FAQ accordion, Flow cards)<br>• Language additions or new interactive modal tools<br>• Backward-compatible schema additions | • Adding `#flow` or `#faq` sections<br>• Adding interactive job flyer filter pills<br>• Adding 3D falling sakura petal canvas |
| **Major** | `X.0.0` (e.g. `1.0.0` → `2.0.0`) | • Complete architectural overhaul<br>• Full UI/UX redesign<br>• Breaking structural changes<br>• Core tech stack migrations (e.g. Astro major upgrade, SSR pivot) | • Complete Phase 2 redesign<br>• Replacing Alpine.js with another architecture<br>• Fundamental legal or business restructuring |

---

## 4. Agent Pre-Push Protocol (Step-by-Step)

Before running `git push`:

### Step 1: Pre-Flight Diff Inspection
Agent runs `git status` and `git diff --stat` to review all pending changes.

### Step 2: Formulate Recommendation
Agent evaluates whether the changes constitute a **Patch**, **Minor**, or **Major** update according to Section 3.

### Step 3: Consult the User (Interactive Decision)
The agent communicates with the user:
1. Summarizes the nature of changes performed.
2. Provides a clear recommendation on which SemVer tier (`patch`, `minor`, `major`) is appropriate and why (e.g., *"ဒီ update က social share card ပုံထဲက url ပြင်ဆင်တာ ဖြစ်တဲ့အတွက် patch update (1.0.0 -> 1.0.1) ကို အကြံပြုပါသည်"*).
3. Explicitly waits for the user's decision before pushing.

### Step 4: Execution upon Confirmation
Once the user decides (or selects a specific version):
1. Update `"version"` in `package.json`.
2. Update `siteData.meta.version` in `src/data/content.ts`.
3. Run `npm run validate` (all 5 stages must pass).
4. Create the git commit (e.g., `chore(release): bump version to 1.0.1`).
5. Execute `git push`.
