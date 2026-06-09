# Roles and Responsibilities

**Status:** PROMOTE (governance spine for `nexus-seed`)  
**Date:** 2026-05-12  

---

## Purpose

This document defines who or what is responsible for each class of action, evidence, coordination, and escalation inside **`nexus-seed`**.

The goal is to reduce:

- role drift  
- assumption bleed  
- duplicated authority  
- narrative collision  
- unclear escalation boundaries  

**Precision matters more than intelligence** when multiple humans, institutions, and tools touch the same continuity system. The danger is rarely lack of information; it is unclear ownership of decisions and evidence.

---

## Governance principle

Each actor or module must have:

1. **Role** — what this actor fundamentally does  
2. **Authority / responsibilities** — what decisions or outputs they may produce  
3. **Constraints** — what they must not do  
4. **Escalation pin** — when responsibility transfers or work stops (HOLD)

No actor or module is all-knowing. Each has **bounded** responsibility.

---

## Human roles

### Care recipient

**Role:** Primary subject of care continuity.

**Authority:**

- Personal preferences  
- Consent where capable  
- Lived-state reporting  

**Constraints:**

- No obligation to manage repository structure or tooling  
- Not responsible for technical coherence of the system  
- Not responsible for administrative reconstruction of records  

**Escalation pin:**

- Cognitive uncertainty  
- Legal ambiguity  
- Health risk threshold exceeded  

---

### Coordinator / POA

**Role:** Administrative continuity and oversight.

**Authority:**

- Organize records and pointers  
- Coordinate workflows across providers and family  
- Communicate with institutions and providers  
- Approve or decline escalation actions within delegated authority  

**Constraints:**

- Must preserve provenance and source separation  
- Must separate fact from interpretation in journals and summaries  
- Cannot silently rewrite history or audit trails  
- Cannot treat inference or AI output as proof without verification  

**Escalation pin:**

- Legal dispute  
- Medical uncertainty requiring licensed judgment  
- External institutional conflict  
- Financial or rights-affecting action outside delegated scope  

---

### External providers

**Role:** Professional or institutional contributors (clinical, legal, financial, administrative).

**Authority:**

- Provide records and clarifications within their domain  
- Confirm or correct institutional state they control  

**Constraints:**

- Cannot override authoritative source records outside their remit  
- Cannot be treated as sole authority for unrelated domains  
- Cannot replace established chain of custody without documentation  

**Escalation pin:**

- Missing records  
- Contradictory advice across providers  
- Unclear responsibility for next step  
- Failure to respond within required timeframe  

---

## System roles (Free FIELD modules)

Modules are **bounded coordination tools**, not omniscient agents. This tier relies on off-the-shelf, free AI tools.

### NotebookLM — synthesis & anchoring

**Role:** Google-side synthesis and reference.

**Responsibilities:**
- Summarize and cluster information from supplied source material (Drive docs).
- Answer questions based strictly on loaded sources.

**Cannot:**
- Finalize decisions.
- Overwrite authoritative records.
- Track long-term changing state (it is static to its sources).

**Escalation pin:**
```text
Confidence below threshold or source missing → HOLD
```

### Claude / ChatGPT — reasoning & drafting

**Role:** Thinking bench and execution drafting.

**Responsibilities:**
- Draft messages and correspondence for human review.
- Create checklists, timelines, and decision frames.
- Format unstructured notes into structured journal entries.

**Cannot:**
- Alter evidence or source documents.
- Store sensitive originals permanently (chats should be ephemeral/cleared).
- Send external communications.

**Escalation pin:**
```text
Action affecting finances, legal rights, medical care → explicit human approval required
```

## Escalation rules

```text
Medical uncertainty        → Human review
Missing provenance         → HOLD
Financial action           → Explicit approval
Legal ambiguity            → Human review
External communication     → Draft first; approve before send
Contradictory records      → VERIFY; do not resolve by assumption
Sensitive payload          → Vault / Google original first; GitHub pointer only
```

---

## Lock statement

> **`nexus-seed` is not an all-knowing system. It is a bounded coordination repository. Each human, institution, and module has explicit responsibilities, constraints, and escalation pins. Boring governance prevents chaotic systems.**

**Short lock:**

> **Bounded roles. Explicit authority. Clear escalation. No all-knowing system narratives.**

---

## Repo boundary note (Curtis)

This path may exist under **`/Users/field/nexus-seed/`** as a **planning tree** before Susan’s repository is a **standalone clone** outside the FIELD worktree. Presence of this file does not imply commit, push, or that this directory is the canonical remote-only repo.

**Next safe action:** After verifying **`github-susan`** and cloning to **`~/Repos/SusanJanetRich/nexus-seed`**, copy **`P1_CORE/`** into that clone and adjust names only if institution or legal scope requires it.
