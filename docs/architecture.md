# Nexus Seed — Architecture

## Three-Layer Model

```
Layer 1: Platform (nexus-infinity/nexus-seed @ main)
  Universal engine — schemas, connectors, workflows, CLI, validator_core.
  Generic. Clean. No client data. Publicly auditable.

Layer 2: Reference Deployment (nexus-infinity/nexus-seed @ client/<name>)
  Structural integration config for one deployment.
  Drive folder schemas, Sentinel stack wiring, handover templates.
  No personal data. No secrets. Merges from main.

Layer 3: Sovereign Instance (<client>/nexus-seed @ client/<name>)
  Private. Live runtime.
  .env, OAuth tokens, active care records, personal config.
  Tracks client/<name> as upstream. Never merged back to Layer 1 or 2.
```

## Core Modules

### schemas/
Pydantic v2 data models for the universal personal stack:
- `CareTeam` / `CareTeamMember` / `CareRole` — care coordination
- `Document` / `DocumentType` / `DocumentStatus` — document management
- `Contact` / `ContactType` — contacts

### connectors/
Integration adapters. Each connector authenticates via `.env` keys and
exposes a typed Python interface. No connector stores credentials — they
read from environment only.
- `GoogleDriveConnector` — OAuth2, file listing, metadata

### workflows/
Stateless workflow templates. Accept schema objects, return structured output.
No side effects by default — connectors are injected by the caller.
- `ClinicalHandoverWorkflow` — generates handover packages for care transitions

### validator_core/
FIELD validation engine. Prime sequence, gate transition, and field address
validation. Observer interface for pause/resume/quarantine/override.

### cli/
Click-based CLI. Entry point: `uv run nexus`.
Commands: `validate`, `sync drive`, `workflows list`.

## Data Sovereignty

Client data must never appear in `main` or `client/*` branches. The boundary
is enforced by `.gitignore` patterns and the three-layer architecture itself:
sovereign data lives only in Layer 3 private repos.

The `NEXUS_DATA_DIR` env var points to a directory outside the repo where
active records are stored at runtime.
