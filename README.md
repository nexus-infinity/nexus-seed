# Nexus Seed

Universal personal sovereign stack platform.

Nexus Seed provides the engine, schemas, and integration framework for deploying a fully integrated personal operating system — combining care coordination, document management, legal file handling, and AI-assisted workflow automation — for any individual or household.

**This repository contains framework-level code only.** No client data, personal records, access tokens, or operational secrets live here.

---

## Three-Layer Architecture

| Layer | Repo | Branch | Purpose |
|-------|------|--------|---------|
| Platform | `nexus-infinity/nexus-seed` | `main` | Universal engine. Generic, clean, auditable. |
| Reference Deployment | `nexus-infinity/nexus-seed` | `client/<name>` | Structural integration config for a specific deployment. No personal data. |
| Sovereign Instance | `<client>/nexus-seed` | `client/<name>` | Live runtime. `.env`, tokens, active records. Private. Never merged upstream. |

---

## Repository Structure

```
nexus-seed/
├── schemas/        Core data models (care team, documents, contacts)
├── connectors/     Integration connectors (Google Drive, Notion, etc.)
├── workflows/      Workflow templates (clinical handover, care coordination)
├── validator_core/ FIELD validation engine (prime sequence, gate transitions)
├── cli/            nexus CLI — deploy, sync, validate
├── docs/           Architecture and deployment documentation
└── tests/          Test suite
```

---

## Setup

**Prerequisites:** Python 3.11+, [uv](https://docs.astral.sh/uv/)

```bash
git clone git@github.com:nexus-infinity/nexus-seed.git
cd nexus-seed
uv sync
cp .env.example .env
# Fill in .env with your credentials
```

---

## CLI

```bash
uv run nexus --help
uv run nexus validate          # Check schema and connector health
uv run nexus sync drive        # Sync Google Drive connector
uv run nexus workflows list    # List available workflow templates
```

---

## Client Deployments

To create a new client deployment branch:

```bash
git checkout -b client/<name>
# Add client-specific structural config (no personal data)
# Point the sovereign instance repo at this branch as upstream
```

The sovereign instance (Layer 3) tracks `client/<name>` and is the only place
where `.env`, access tokens, and active personal records live.

---

## Invariants

- `main` and `client/*` branches contain **no personal data, no secrets, no access tokens**
- All integration keys live in `.env` in the sovereign instance only
- `.env.example` on `main` documents every required key with a description
- Analysis artifacts, snapshots, and refactor reports are gitignored — never commit them

---

## License

MIT
