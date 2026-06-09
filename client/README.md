# client/susan — Reference Deployment Config

This directory contains structural integration config for Susan Rich's deployment.
It is Layer 2 — no personal data, no secrets, no access tokens.

## Contents

| File | Purpose |
|------|---------|
| `drive_schema.yaml` | Google Drive Sentinel stack — folder structure, matter subfolders, escalation routing |
| `GITHUB_SSH_LOCK.md` | SSH identity guardrail for `SusanJanetRich/nexus-seed` — key routing, payload rules, git-crypt decision gate |

## What goes here

- Structural schemas and integration config specific to Susan's deployment
- Naming conventions, folder maps, routing rules
- Security and identity guardrails for the sovereign instance

## What does not go here

- `.env` values or actual credentials
- Personal records, matter data, correspondence
- Medical, legal, or financial payloads

Those live in `SusanJanetRich/nexus-seed @ main` (Layer 3) only.
