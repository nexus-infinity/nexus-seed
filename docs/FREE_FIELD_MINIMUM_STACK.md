# Free FIELD Minimum Stack

**Status:** PROMOTE (operating canon for free-tier person-scoped FIELD)  
**Date:** 2026-05-12  

---

## Purpose

Explain why **`nexus-seed`** exists and how it coordinates **free-tier assets** (Google, AI assistants, GitHub) without becoming another expensive ecosystem or a dumping ground for sensitive payloads.

**Center:** If free tools are orchestrated properly, they become a **lightweight FIELD**. The power is **routing discipline**, not any single app.

**Canonical lock lines:**

> **The stack is free. The value is orchestration.**

> **FIELD is pattern, not product.**

---

## Core doctrine

| Rule | Statement |
|------|------------|
| 1 | **Google holds originals** (mail, Drive, calendar, contacts, scans). |
| 2 | **AI helps think** (draft, summarize, structure—not canonical storage). |
| 3 | **GitHub `nexus-seed` holds the skeleton**: pointers, journal, indexes, safe templates, state. |
| 4 | **FIELD is orchestration grammar**, not a product you buy. |
| 5 | **Flow:** `source → synthesis → journal → action → receipt`. |
| 6 | **`nexus-seed` is orchestration memory**, not a warehouse. |
| 7 | **Sensitive payloads stay out by default** (see `GITHUB_SSH_LOCK.md` / default-deny `.gitignore`). |
| 8 | **Natural role + handoff** beats “which app owns everything?” |
| 9 | **The stack is free. The value is orchestration.** |

**Short formulation:**

> **Free FIELD = Google as body, AI as thinking bench, `nexus-seed` as memory spine, orchestration as the real system.**

---

## Asset map

| Asset | FIELD role | What it should do | What it should not do |
|-------|------------|-------------------|----------------------|
| **Gmail** | Communication truth | Threads, dates, people, attachments | Project-management system |
| **Google Drive** | Document truth | Originals, exports, PDFs, evidence packets | Unstructured dumping swamp |
| **Contacts / Calendar** | People + time anchors | Who, when, appointments | Narrative context alone |
| **NotebookLM / Gemini** | Google-side synthesis | Summarize linked source material | Canonical record by itself |
| **ChatGPT / Claude (free)** | Thinking bench | Draft, checklist, timeline, calm messages | Store sensitive originals |
| **GitHub `nexus-seed`** | Continuity spine | Indexes, README, timelines, links, safe templates | Raw medical/financial/caregiving payloads by default |
| **Human operator** | Authority, consent, judgment | HOLD / PROMOTE / next action | Premature full automation |

**NotebookLM / Gemini note:** Derivative synthesis must still **pin source** (thread URL, Drive path) in the journal when it matters.

---

## Minimum viable FIELD loop

Run **manually** before automation:

```text
1. Capture — Something arrives in Gmail / Drive / life.
2. Locate — Keep the original in Google.
3. Summarize — Use AI for a short human-readable summary.
4. Index — Add a pointer in nexus-seed.
5. Decide state — OBSERVE / VERIFY / HOLD / PROMOTE / DEMOTE.
6. Next action — One concrete step.
```

---

## Orchestration grammar

Each tool has a **natural role**. Orchestration is the handoff between them:

```text
source → synthesis → journal → action → receipt
```

That is **FIELD in free-tier form**.

**Do not ask:** “Which app should own everything?”  
**Ask:** “What is each app naturally good at, and what handoff does it perform?”

### Minimum orchestration loop (per matter)

```text
1. Source — Gmail / Drive / Calendar holds the real thing.
2. Extract — NotebookLM / Gemini / manual copy pulls signal.
3. Think — ChatGPT / Claude → timeline, checklist, draft, decision frame.
4. Journal — nexus-seed records state, pointer, next action.
5. Act — Email / phone / appointment / document update.
6. Receipt — Outcome logged back into nexus-seed.
```

---

## Natural roles and handoffs

| Tool | Natural role |
|------|----------------|
| **Gmail** | Communication evidence |
| **Drive** | Document body |
| **Calendar** | Time anchor |
| **Contacts** | People anchor |
| **NotebookLM / Gemini** | Google-side synthesis over source material |
| **ChatGPT / Claude** | Reasoning, drafting, compression, question design |
| **GitHub `nexus-seed`** | Continuity spine, state journal, safe indexes |
| **Human operator** | Authority, consent, judgment |

---

## What nexus-seed owns

`nexus-seed` should answer:

```text
What matters exist?
Where is the source?
What is the state?
What changed?
What is the next action?
What is blocked?
What evidence supports it?
```

Suggested tree (structure-first):

```text
README.md
docs/
00_inbox/
10_people/
20_matters/
30_documents/
40_timeline/
50_atlas_journal/
90_audit/
```

Mostly: **indexes, pointers, checklists, matter summaries, timeline entries, audit notes, safe templates**—not bulk exports.

---

## What nexus-seed must not own

- Raw medical, financial, or caregiving **payloads** unless **deliberately approved** (and then only with governance—see `GITHUB_SSH_LOCK.md`, git-crypt HOLD until audit trail).
- **Sole copy** of anything sensitive—**GitHub must never be the only copy** of a sensitive payload.
- **Premature open licensing** of private journal or evidence (see below).

---

## Failure modes

| Mistake | Antidote |
|---------|----------|
| “Which app owns everything?” | **Role + handoff** per tool. |
| Treating AI chat as filing cabinet | Originals stay in **Google**; AI gets **snippets** per task. |
| Pasting full records into GitHub | **Pointers + state** in repo; bodies in Drive/Gmail. |
| Optimizing the stack before use | **Minimum loop first**; automate only after repetition proves value. |
| Commons too early | **Prove privately → extract pattern → license deliberately** (next section). |

---

## Licensing and commons (when—not before)

**Do not open-license the system before it has proved useful.** License applies to **extracted, public-safe patterns**, not the private working field.

```text
Idea → private working system → repeated use → proven utility → extract public-safe pattern → license only that pattern
```

**Not:** idea → open license → hope it becomes meaningful.

### Sequence

1. **Private core** — `nexus-seed` private: caregiving context, matter structure, journal, pointers, lessons learned.
2. **Internal use** — Manual operation until folders, prompts, and checklists **survive contact with reality**.
3. **Pattern extraction** — Blank templates, field-neutral schemas, non-sensitive workflows.
4. **Deliberate license** — CC / MIT / proprietary / advisory—only for what **stands without exposing people or evidence**.

**Locks:**

> **Do not commons the field. Commons the proven pattern.**

> **Prove privately. Extract cleanly. License deliberately.**

---

## Lock statement

> **Google holds originals. AI helps think. GitHub `nexus-seed` holds the skeleton, pointers, journal, and state. FIELD is orchestration grammar—not a product. The flow is source → synthesis → journal → action → receipt. `nexus-seed` is orchestration memory, not warehouse. Sensitive payloads stay out by default. Natural role and handoff beat “one app to rule them all.” The stack is free. The value is orchestration.**

**Deeper:**

> **The private FIELD is where value is tested. The commons only receives what has proven itself through use, survived extraction, and can stand without exposing the people or evidence that created it.**

---

## Repo boundary note (Curtis)

This file may live at **`/Users/field/nexus-seed/docs/`** before Susan’s repo is a **standalone clone** outside the FIELD git tree. Editing here does **not** imply that directory is its own git repository or that changes are committed or pushed. When Susan’s `nexus-seed` is cloned to e.g. **`~/Repos/SusanJanetRich/nexus-seed`**, copy or merge this doc there as the traveling canon.

**Next safe action:** Copy this document into the standalone Susan clone when SSH + remote are verified; until then, treat this path as **local planning canon** (`HOLD` on “committed to Susan-only repo” until clone exists).
