---
trigger: always_on
description: Strict User Permission, Cloudflare Account Verification, and Wrangler Operations Policy for DOUITSU LLC
---

# Cloudflare & Wrangler Operations Policy (Cloudflare နှင့် Wrangler ဆိုင်ရာ တင်းကျပ်သည့် စည်းမျဉ်း)

## 1. Core Rule & Mandatory Directive (အဓိက စည်းမျဉ်းနှင့် တားမြစ်ချက်)

> [!CAUTION]
> ### 🛑 မဖြစ်မနေ လိုက်နာရမည့် ညွှန်ကြားချက် (Mandatory Directive)
> 1. **ခွင့်ပြုချက် မရှိဘဲ တိုက်ရိုက်ဆက်သွယ်ခြင်း လုံးဝ မပြုလုပ်ရ (Zero Unauthorized Direct Operations)**:
>    - သုံးစွဲသူ (User / Repository Owner) ၏ ကြိုတင်အတည်ပြု ခွင့်ပြုချက် မရရှိဘဲ Cloudflare Workers သို့ `wrangler` CLI ဖြင့် တိုက်ရိုက် ဆက်သွယ်ခြင်း၊ Deployment ပြုလုပ်ခြင်း (`wrangler deploy`)၊ Variables / Secrets ပြင်ဆင်ခြင်း (`wrangler secret put`, etc.)၊ Bindings သို့မဟုတ် အခြား Cloudflare Settings များကို ပြင်ဆင်ပြောင်းလဲခြင်းများကို **လုံးဝ (လုံးဝ) တားမြစ်ထားပါသည်**။
> 2. **Cloudflare Account Name အတည်ပြု မေးမြန်းခြင်း (Mandatory Account Verification)**:
>    - အကယ်၍ သုံးစွဲသူထံမှ လုပ်ဆောင်ရန် ခွင့်ပြုချက် ရရှိခဲ့လျှင်ပင် **တင်ရမည့် Cloudflare Account Name (သို့မဟုတ် Account ID) ကို သေချာစွာ မေးမြန်းအတည်ပြုပြီးမှသာ** ဆက်လက် လုပ်ဆောင်ရပါမည်။ မှားယွင်းသော Account သို့ မတော်တဆ deploy လုပ်မိခြင်း သို့မဟုတ် ပြင်ဆင်မိခြင်း မဖြစ်စေရန် မဖြစ်မနေ အတည်ပြုရမည်။

---

## 2. Policy Specifications for AI Agents

All AI agents interacting with this repository must strictly adhere to the following two-stage authorization protocol before initiating any Cloudflare operations:

### Stage 1: Explicit User Authorization (ကြိုတင် ခွင့်ပြုချက် ရယူခြင်း)
- **Prohibited by default**: No agent is allowed to run commands that communicate directly with Cloudflare services (e.g., `wrangler deploy`, `wrangler secret`, `wrangler pages`, `wrangler kv`, `wrangler r2`).
- **Required Action**: The agent MUST clearly state the proposed operation, specify what will be changed or deployed, and pause to request explicit permission from the user.

### Stage 2: Account Name & Target Verification (Cloudflare Account အတည်ပြုခြင်း)
- **Mandatory Pre-requisite**: Even after the user grants explicit permission to deploy or modify settings, the agent **MUST NOT immediately execute the command**.
- **Required Action**: The agent MUST ask the user to confirm the target Cloudflare Account Name (or Account ID), for example:
  > *"Cloudflare သို့ မတင်မီ/မပြင်ဆင်မီ မည်သည့် Cloudflare Account Name (Account ID) ထဲသို့ တင်ရမည်ကို အတည်ပြုပေးပါရန် မေးမြန်းအပ်ပါသည်။"*
- **Validation**: Verify that `wrangler whoami` or `CLOUDFLARE_ACCOUNT_ID` matches the user's intended target account before executing any deployment or mutation command.

---

## 3. Allowed vs. Prohibited Actions Matrix

| Category | Command / Action | Status | Protocol / Requirement |
|---|---|---|---|
| **Local Builds** | `npm run build`, `npm run dev`, `npm run preview` | ✅ **Allowed** | Runs 100% locally; no remote Cloudflare mutation. |
| **Local Validation** | `npm run validate`, `astro check`, `eslint` | ✅ **Allowed** | Quality gates on local code and `dist/`. |
| **Local Config Edits** | Editing `wrangler.jsonc`, `src/worker.ts` | ✅ **Allowed** | Local file edits only. |
| **Remote Deployment** | `npx wrangler deploy`, `wrangler deploy` | ⛔ **Strictly Prohibited** | Requires **both** (1) explicit user consent, and (2) verified Cloudflare Account Name. |
| **Secrets & Variables** | `npx wrangler secret put`, `wrangler secret delete` | ⛔ **Strictly Prohibited** | Requires **both** (1) explicit user consent, and (2) verified Cloudflare Account Name. |
| **Bindings & Storage** | Direct mutation of KV, R2, D1, Queues via CLI | ⛔ **Strictly Prohibited** | Requires **both** (1) explicit user consent, and (2) verified Cloudflare Account Name. |
| **Account Switching** | `wrangler switch`, modifying active auth tokens | ⛔ **Strictly Prohibited** | Never modify Cloudflare credentials without explicit instruction. |

---

## 4. Standard Pre-Deployment Inquiry Template

Whenever deployment or configuration update to Cloudflare Workers is requested or needed, the agent must formulate a confirmation message following this structure:

```markdown
⚠️ **Cloudflare Operations Confirmation Request**

လုပ်ဆောင်မည့် လုပ်ငန်းစဉ်: [ဥပမာ - Cloudflare Workers သို့ Static Assets နှင့် Worker script အသစ် deploy ပြုလုပ်ခြင်း]

စည်းမျဉ်းအရ အောက်ပါအချက်များကို အတည်ပြုပေးရန် လိုအပ်ပါသည်:
1. Cloudflare Workers သို့ `wrangler deploy` ဖြင့် တိုက်ရိုက်ဆက်သွယ် လုပ်ဆောင်ရန် ခွင့်ပြုပါသလား?
2. တင်ရမည့် **Cloudflare Account Name** (သို့မဟုတ် Account ID) ကို အတည်ပြု ဖော်ပြပေးပါရန်။
```

---

## 5. Non-Compliance Consequences

Unauthorized execution of Cloudflare Wrangler commands or modifying production bindings/variables without verified account confirmation is considered a critical security and operational violation.
