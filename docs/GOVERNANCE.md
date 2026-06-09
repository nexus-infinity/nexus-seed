# nexus-seed Governance

**nexus-seed is not an all-knowing system. It is a bounded coordination repository.**

Its purpose is to preserve continuity, provenance, and safe coordination across time — for caregiving, memory continuity, administrative workflows, and evidence-aware tracking.

The core invariant is **continuity**. Not intelligence. Not automation. Not ontology. Continuity.

---

## What this system is

A structured repository that:

- captures observations without deciding truth
- anchors events to timestamps and receipt-bearing artifacts
- escalates unresolved or conflicting states rather than silently collapsing them
- routes responsibility to the correct layer and the correct person
- preserves a reliable record that any future maintainer, institution, or legal process can read

Precision matters more than intelligence. Coordination systems fail not because nobody was smart enough — they fail because authority boundaries blur, escalation rules are unclear, or assumptions silently propagate.

---

## What this system is not

- It is not a decision-maker
- It is not a source of truth on its own
- It is not a replacement for professional, legal, or medical authority
- It cannot treat narrative coherence as proof
- It cannot promote a claim to governed truth without a receipt-bearing artifact

---

## Operational layers

Each layer has explicit responsibilities and explicit constraints. The moment a system has responsibilities without explicit prohibitions, humans begin unconsciously attributing magical capability to it. These "Cannot:" sections prevent that drift.

### Intake & Audit Gate *(AKRON)*

**Responsibility:** receive incoming information, classify it, assign it to the correct layer, and hold it if classification is uncertain.

**Can:**
- Accept intake from any channel: caregiving notes, correspondence, financial documents, medical records, device data, external systems
- Classify by source, channel, authority class, and evidence class
- Assign a stable intake ID and timestamp
- Flag items for escalation

**Cannot:**
- Decide truth
- Promote a claim without passing it to the Verification Layer
- Discard an item without recording the discard and reason
- Treat a summary or narrative as equivalent to a primary source artifact

---

### Observation Layer *(OBI-WAN)*

**Responsibility:** witness and record what is observed, without interpretation.

**Can:**
- Record verbatim or minimally paraphrased observations from any source
- Attach source timestamps, channel pointers, and receipt locators
- Flag observations for the Verification Layer

**Cannot:**
- Interpret observations
- Synthesize multiple observations into a conclusion
- Treat narrative coherence as proof
- Promote any observed state to governed truth

---

### Verification Layer *(TATA)*

**Responsibility:** bind observations to time, check internal consistency, and apply the triangle check (Fact / Document / Ledger).

**Can:**
- Assign timeline fit (✔ / ⚠ / ❌)
- Apply the triangle check across all three dimensions
- Identify conflicts between observations
- Issue a HOLD when conflicts are unresolved or pins are missing

**Cannot:**
- Resolve conflicts by narrative preference
- Advance a claim with ❌ timeline fit
- Override a HOLD without a receipt-bearing artifact that addresses the specific gap

---

### Coordination Layer *(DOJO)*

**Responsibility:** manifest outputs and actions after the Intake & Audit Gate, Observation Layer, and Verification Layer have completed their work.

**Can:**
- Generate structured outputs: summaries, action packets, escalation notices, receipts
- Route outputs to the correct person or institution
- Record what was done and when

**Cannot:**
- Act on unverified claims
- Generate outputs that have not been anchored by a receipt
- Replace professional, legal, or medical judgment

---

### Registry *(P11)*

**Responsibility:** maintain the canonical index of all intake IDs, receipts, escalation records, and resolution states.

**Can:**
- Index all items by ID, date, source, and status
- Record resolution outcomes with receipts
- Surface items that remain in HOLD

**Cannot:**
- Alter a receipt once issued
- Mark an item resolved without a receipt
- Accept a narrative summary as a resolution

---

## HOLD is not failure

HOLD is **uncertainty containment**.

Most broken coordination systems prematurely collapse ambiguity into false certainty because ambiguity feels psychologically uncomfortable. This system instead holds unresolved states open until they are properly anchored.

A HOLD must state:
- what is missing
- what evidence would lift it
- who is responsible for providing that evidence

**HOLD exits only when:** a receipt-bearing artifact addresses the specific named gap.

---

## Escalation principles

1. Any item that cannot be classified → HOLD at Intake
2. Any observation without a receipt pointer → HOLD at Observation
3. Any claim with ❌ timeline fit → mandatory HOLD at Verification
4. Any unresolved conflict → HOLD, do not force resolution
5. Any action with irreversible consequences (legal, financial, medical) → require explicit human confirmation before the Coordination Layer acts

---

## Role of this document

This document does not automate anything. It defines boundaries.

Create it. Commit it. Manually obey it for a while.

Real governance emerges through friction. The escalation rules that matter, the constraints that are missing, the assumptions that leak — these reveal themselves through actual use, not through design. This document will need to be revised. That is expected and healthy.

The goal is to preserve continuity, provenance, and safe coordination across time — so that any person who needs to understand what happened, when, and why, can do so from the record alone.

---

## Naming

**The Den** is the canonical name for the sovereign communications holding layer within FIELD and nexus-seed. It is named after the physical room at the front of 10 Watts Parade, Mt Eliza — built by Jacques Rich. Things enter The Den before any outbound action. Nothing leaves until it is ready.

The Notion surface that currently performs this function is called the cauldron. The two names coexist: cauldron in Notion (external tool, its own conventions), The Den in FIELD (sovereign surface, canonical name). When communications migrate to a sovereign FIELD layer, the name The Den carries across. The cauldron does not.

---

## Version

v0.1 — initial governance document  
Committed: 2026-05-13  
Repository: SusanJanetRich/nexus-seed (private)

---

## Repository architecture (three-layer model)

```
Layer 1: Platform (nexus-infinity/nexus-seed @ main)
  Universal engine — schemas, connectors, workflows, CLI, validator_core.
  Generic. Clean. No client data. Publicly auditable.

Layer 2: Reference Deployment (nexus-infinity/nexus-seed @ client/<name>)
  Structural integration config for one deployment.
  Folder schema, doctrine docs, Sentinel stack wiring.
  No personal data. No secrets.

Layer 3: Sovereign Instance (<client>/nexus-seed @ client/<name>)
  Private. Live runtime.
  .env, tokens, active matters, audit records, personal config.
  Tracks client/<name> as upstream. Never merged back to Layer 1 or 2.
```

Sensitive payloads (medical, financial, legal, caregiving) live in Layer 3 only.
Layer 1 and Layer 2 contain structure, doctrine, and schema — never operational data.
