---
trigger: always_on
description: Strict Business Data, Copywriting, Legal Terminology, and Services Content Integrity Protection Rules for AI Agents
---

# Content & Business Data Integrity Protection Rules (厳格なコンテンツ・事業情報保護規則)

## 1. Overview & Policy Objective

This document defines the **Strict Content Integrity & Data Protection Policy** for **DOUITSU LLC (DOUITSU合同会社)**.

As an officially registered **Touroku Shien Kikan (出入国在留管理庁 登録支援機関 25登－012206)** under the Immigration Services Agency of Japan, all business data, legal registrations, statutory support duties, official addresses, phone numbers, partner agencies, and trilingual copywriting published on this website carry legal authority, compliance obligations, and commercial credibility.

> [!CAUTION]
> **MANDATORY POLICY FOR ALL AI AGENTS**:
> AI Agents are **STRICTLY PROHIBITED** from arbitrarily changing, modifying, rephrasing, optimizing, translating, fabricating, or deleting any Business Data, Legal Identifiers, Contact Information, Services Information, or Brand Copywriting without **explicit prior authorization and instruction from the user / repository owner**.

---

## 2. Core Prohibitions for AI Agents

Every AI agent working on this codebase must adhere to the following zero-tolerance prohibitions:

1. **NO Autonomous "Copy Improvement" or Rewriting**:
   - AI agents frequently attempt to "enhance", "polish", or "shorten" marketing copy, hero slogans, or section descriptions during UI/UX or styling tasks. **This is strictly prohibited.**
   - All headings, subheadings, bullet points, and explanatory text must remain bit-for-bit identical to the approved text unless the user explicitly requests a copy edit.

2. **NO Unilateral Modification of Business & Legal Facts**:
   - Never alter company registration numbers, establishment dates, addresses, office suite numbers, phone numbers, email addresses, staff counts, or overseas sending agency partner names.

3. **NO Reinterpreting or Altering Statutory Support Duties**:
   - The **10 Statutory Support Duties (法定支援10項目)** are defined by Japanese Immigration Law. Agents must never alter, summarize away, renumber, or reinterpret any of these 10 duties in Japanese, English, or Myanmar.

4. **NO Silent Typo "Fixes" or Re-translations**:
   - If an agent spots an apparent typo, outdated fact, or grammatical inconsistency in business copy or translations, the agent **MUST NOT silently modify it**.
   - The agent **MUST explicitly flag it to the user** and await user confirmation before making any change.

5. **Strict Separation of Code vs. Content**:
   - Technical refactoring (CSS styling, Tailwind utility tuning, Astro layout restructuring, TypeScript interfaces, Alpine.js logic, performance optimizations, and security patches) **MUST NEVER** alter or mutate the underlying copywriting or data schema.

---

## 3. Inventory of Protected Content Categories

The following categories constitute **Protected Data** and are treated as strictly immutable by default:

### Category A: Corporate Identity & Legal Registrations
| Protected Entity | Authoritative Value | Notes & Scope |
|---|---|---|
| **Company Legal Name (JA)** | `DOUITSU合同会社` (Douitsu Goudou Kaisha) | Legal corporate form: 合同会社 (LLC) |
| **Company Legal Name (EN)** | `DOUITSU LLC` | Official international corporate name |
| **Official Registration** | `出入国在留管理庁 登録支援機関` | Registered Support Organization |
| **Registration Number** | `25登－012206` | Issued July 2025 (2025.7) by Japanese Immigration |
| **Date of Establishment** | `2025年3月31日` (March 31, 2025) | Official corporate registration date |
| **Staff Count** | `6名` / 6 dedicated staff | Current verified corporate size |
| **Sending Agency (Myanmar)** | `FOR UNITY / SMZ CO., LTD` | Licensed overseas employment partner agency |
| **Official Website URL** | `https://douitsu-co.com` (canonical) | Base URL for all canonical tags & schema |

### Category B: Verified Addresses & Communication Channels
| Protected Entity | Authoritative Value | Notes & Scope |
|---|---|---|
| **Postal Code** | `〒204-0021` | Tokyo Kiyose-shi postal area |
| **Japanese Address** | `東京都清瀬市元町1-11-21 フローレス元町205号` | Room 205, Flores Motomachi |
| **English Address** | `Room 205, Flores Motomachi, 1-11-21 Motomachi, Kiyose-shi, Tokyo, Japan` | Official audited English address |
| **Myanmar Address** | `တိုကျိုမြို့၊ ခီယိုဆဲမြို့၊ မိုတိုမာချီ ၁-၁၁-၂၁၊ ဖလိုရက်စ် မိုတိုမာချီ အခန်း ၂၀၅` | Verified Unicode address |
| **Main Phone (Landline)** | `042-497-1537` | Primary office desk telephone |
| **Hotline (Mobile)** | `080-2213-8194` | Direct multilingual consultation line |
| **Official Email** | `info@douitsu-co.com` & `contact@douitsu-co.com` | Primary corporate communication inboxes |
| **Geo-Coordinates** | Latitude `35.7876`, Longitude `139.5298` | Kiyose office geolocation |

### Category C: The 10 Statutory Support Duties (法定支援10項目)
Under Japan's Immigration Control Act, Registered Support Organizations are legally mandated to execute 10 support duties for Category 1 Specified Skilled Workers (特定技能1号). Their titles, definitions, and trilingual translations in `src/data/content.ts` and `.agents/rules/about-this-business.md` are legally fixed:
1. **事前ガイダンスの実施** (Pre-arrival Guidance / ကြိုတင်ရှင်းလင်း လမ်းညွှန်မှု ပြုလုပ်ပေးခြင်း)
2. **出入国送迎の支援** (Airport Pickup & Departure Support / လေဆိပ် အကြို/အပို့ ထောက်ပံ့မှု)
3. **住宅確保のサポート、生活に必要な契約支援** (Housing Search & Utility Contracts / နေအိမ်ရှာဖွေရေးနှင့် လူနေမှုဘဝ စာချုပ်များ ချုပ်ဆိုပေးခြင်း)
4. **生活オリエンテーションの実施** (Living Orientation Program / လူနေမှုစနစ် မိတ်ဆက်ဆွေးနွေးပွဲ ပြုလုပ်ပေးခြင်း)
5. **公的手続きなどへの同行** (Accompaniment to Public Administrative Offices / အစိုးရရုံး လုပ်ထုံးလုပ်နည်းများသို့ အတူလိုက်ပါဆောင်ရွက်ခြင်း)
6. **日本語学習機会の提供を支援** (Japanese Language Learning Support / ဂျပန်စာ လေ့လာသင်ယူခွင့် အခွင့်အလမ်းများ ထောက်ပံ့ပေးခြင်း)
7. **相談・苦情対応** (Consultation & Grievance Handling / တိုင်ပင်ဆွေးနွေးမှုများနှင့် အခက်အခဲများ ဖြေရှင်းပေးခြင်း)
8. **日本人との交流促進** (Facilitation of Exchange with Local Community / ဂျပန်လူမျိုးများနှင့် အပြန်အလှန် ချစ်ကြည်ရင်းနှီးမှု မြှင့်တင်ပေးခြင်း)
9. **転職支援（受入側の都合で雇用契約を解除した場合）** (Job Transition Support upon Involuntary Dismissal / အလုပ်အသစ် ပြောင်းရွှေ့နိုင်ရေး ကူညီထောက်ပံ့ခြင်း)
10. **定期的面談・行政機関への通報** (Periodic Interviews & Official Reporting / ပုံမှန်တွေ့ဆုံမေးမြန်းခြင်းနှင့် အစိုးရသို့ အစီရင်ခံခြင်း)

### Category D: Target Sectors & Recruitment Focus
- **介護 (Nursing Care / Kaigo)**
- **外食業 (Food & Beverage Services / Restaurant)**
- **飲食料品製造業 / 食品加工 (Food and Beverage Manufacturing / Processing)**
- **地域産業 (Regional Industrial Manufacturing & Placements)**

### Category E: Brand Copywriting & Trilingual Assets
- **Central Data Repository**: All text strings reside strictly in `src/data/content.ts`.
- **Trilingual Parity**: Japanese (`ja`), English (`en`), and Myanmar (`my`) texts are synchronized. Agents must not edit one language while ignoring others, nor substitute their own unauthorized translations.
- **Official Educational Downloads**:
  - `kaigo-tokuteiginou-japanese.pdf` (38.8 MB on Cloudflare R2: `https://files.douitsu-co.com/kaigo-tokuteiginou-japanese.pdf`)
  - `kaigo-tokuteiginou-myanmar.pdf` (14.1 MB on Cloudflare R2: `https://files.douitsu-co.com/kaigo-tokuteiginou-myanmar.pdf`)
- **Official Credentials & Visuals**:
  - Registration certificate image: `public/images/landing/license-certificate.jpg`
  - Recruitment flyers: `public/images/jobs/`

---

## 4. Operational Workflow for Content Requests

Whenever changes involve copywriting, business facts, or service offerings, AI agents MUST follow this protocol:

```text
[User Prompt / Request]
         │
         ▼
Does the task involve modifying Business Data, Copywriting, or Services?
         │
         ├─── NO (Pure code, styling, bugfix, build pipeline)
         │      └──> Preserve all existing content 1:1. Run `npm run validate`.
         │
         └─── YES (User requested copy change or new content)
                │
                ├──> Step 1: Clarify & Confirm exact wording with User if ambiguous.
                ├──> Step 2: Ensure Synchronous Trilingual Parity (ja, en, my).
                ├──> Step 3: Implement in `src/data/content.ts`.
                ├──> Step 4: Run `git diff src/data/content.ts` to verify only requested changes are touched.
                └──> Step 5: Inform User of the exact copy changes made.
```

---

## 5. Pre-Commit Content Integrity Verification

Before staging files or creating git commits, the AI agent must run the following check:

```bash
# Review exact diff in content and data files
git diff src/data/content.ts

# Review diff across all components for any accidental inline text modification
git diff src/components/
```

### Verification Questions for the Agent:
1. Did I touch any string in `src/data/content.ts` or component template text that the user did **NOT** explicitly instruct me to change?
2. Are company name, registration number `25登－012206`, address, and phone numbers (`042-497-1537`, `080-2213-8194`) 100% intact?
3. Are all 10 Statutory Duties intact and unchanged in Japanese, English, and Myanmar?
4. Did I accidentally delete or replace any trilingual translations (`ja`, `en`, `my`)?

If the answer to question 1 is **YES**, or the answer to questions 2-4 is **NO**, the agent must immediately revert the unintended content mutations before proceeding.

---

## 6. Summary Checklist for AI Agents

- [ ] **No unauthorized copywriting alterations**: All slogans, descriptions, and FAQs are unmodified unless requested.
- [ ] **No legal entity alterations**: DOUITSU LLC, registration `25登－012206`, and establishment date are intact.
- [ ] **No contact info alterations**: Address in Kiyose-shi Tokyo, phone numbers, and emails are unaltered.
- [ ] **No statutory service alterations**: 10 Statutory Support Duties remain legally accurate and intact.
- [ ] **Trilingual parity maintained**: Any user-authorized update includes verified `ja`, `en`, and `my` copy.
- [ ] **Diff audited**: Verified with `git diff` that no content drift occurred.
