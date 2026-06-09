# Sovereign Instance Folder Schema

Copy this tree into a Layer 3 sovereign instance repo as the operational skeleton.

```
00_inbox/          Unprocessed incoming items — correspondence, documents, notes
10_people/         Care team, contacts, roles, relationships
20_matters/        Active matters — one subfolder or file per matter
30_documents/      Pointers to documents (Drive paths, filing references)
40_timeline/       Chronological event log — dates, events, source pointers
50_atlas_journal/  Synthesis journal — observations, decisions, AI-assisted drafts
90_audit/          Audit records, receipts, evidence packets (JSONL)
```

**Invariants (from FREE_FIELD_MINIMUM_STACK doctrine):**
- These folders hold indexes, pointers, summaries, and state — not bulk payloads
- Sensitive originals stay in Google Drive / external storage
- GitHub is the memory spine, not the warehouse
- Each item that enters 00_inbox must be classified and routed before action

See `docs/FREE_FIELD_MINIMUM_STACK.md` for the full doctrine.
See `docs/GOVERNANCE.md` for role boundaries and escalation rules.
