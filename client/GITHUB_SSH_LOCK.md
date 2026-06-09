# GitHub SSH Lock for Susan / nexus-seed

```text
Status: PROMOTE
Scope: Susan GitHub / nexus-seed SSH identity guardrail
Authority: local repo identity + dedicated SSH host alias
Risk class: prevents wrong-account push / wrong-key routing / accidental payload commit
```

## Purpose

This document locks **Susan Rich's** work on **nexus-seed** to the correct GitHub account and SSH key. It prevents pushes authenticated as the wrong user (for example JB), stops SSH from offering unrelated keys to `git@github.com`, and pairs with a **default-deny** `.gitignore` so secrets and sensitive payloads never enter version control by mistake.

## Guardrail (github-susan + Ed25519 + IdentitiesOnly yes — prevent git@github.com using JB key)

- Use a **dedicated Host alias** `github-susan` in `~/.ssh/config`, not bare `github.com`, for this repository's remote URL.
- Pin authentication to **one Ed25519 private key** via `IdentityFile` and **`IdentitiesOnly yes`** so the SSH client does not try other loaded keys (including a JB or default key) when connecting.
- **Never** set `origin` to `git@github.com:SusanJanetRich/nexus-seed.git` for this workflow unless you fully accept GitHub's default host key routing and key negotiation — the alias pattern is the supported guardrail.

## SSH config (Host github-susan block with HostName, User git, IdentityFile, IdentitiesOnly, AddKeysToAgent, UseKeychain)

Add or merge the following block into `~/.ssh/config` (adjust key path if your key lives elsewhere):

```
Host github-susan
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_susan_github
  IdentitiesOnly yes
  AddKeysToAgent yes
  UseKeychain yes
```

`HostName` keeps traffic on GitHub; `User git` is required for Git over SSH; `IdentityFile` + `IdentitiesOnly yes` enforce Susan's key only; macOS agents integrate via `AddKeysToAgent` and `UseKeychain`.

## macOS Keychain (ssh-add --apple-use-keychain; ssh -T github-susan)

Load the key into the agent and Keychain once per machine or after key rotation:

```bash
ssh-add --apple-use-keychain ~/.ssh/id_ed25519_susan_github
ssh -T github-susan
```

A successful auth prints a GitHub greeting naming **SusanJanetRich** (or confirms access for that identity). Fix key path, permissions (`chmod 600` on the private key), or config until this succeeds **before** pushing.

## Local Git identity (Susan Rich / susan.janet.rich@gmail.com — local config only, commands)

Set identity **only inside this repository** so global JB or other defaults do not leak commits:

```bash
cd /path/to/nexus-seed
git config user.name "Susan Rich"
git config user.email "susan.janet.rich@gmail.com"
git config --local --list | grep user
```

## Branch lock (main canonical; git branch -M main; align with upstream)

- **Canonical branch:** `main`.
- Rename local default if needed and align with upstream:

```bash
git branch -M main
git fetch origin
git branch -u origin/main main
```

## Remote lock (git remote set-url origin git@github-susan:SusanJanetRich/nexus-seed.git)

Point `origin` at the repository **through the `github-susan` host alias**:

```bash
git remote set-url origin git@github-susan:SusanJanetRich/nexus-seed.git
git remote -v
```

You should see `git@github-susan:SusanJanetRich/nexus-seed.git` for fetch and push.

## Default-deny .gitignore (full block from user: secrets, medical payloads, exports, editor noise — same as provided in chat)

Place at the repository root. Deny by default; allow only intentional paths.

```gitignore
# Secrets and credentials
.env
.env.*
!.env.example
*.pem
*.key
*_rsa
*_ed25519
id_rsa
id_ed25519
*.p12
*.pfx
secrets/
credentials/
.auth/

# Medical / PHI-style payloads and dumps (deny by default)
**/payloads/
**/phi/
**/medical/
**/records/
**/exports/clinical/
*.hl7
*.fhir.json
*.dcm

# Exports and large/generated dumps
exports/
out/
dist/
build/
*.dump
*.sql
*.sqlite
*.db

# Editor and OS noise
.DS_Store
.idea/
.vscode/
*.swp
*.swo
*~
Thumbs.db

# Logs and temp
*.log
tmp/
temp/
.cache/
```

Tune narrowly if the project legitimately tracks sample fixtures — prefer samples under a reviewed path and explicit `git add -f` when appropriate.

## First push checklist (bash block from user message)

Run in order after SSH and remote verification:

```bash
# 1) Confirm SSH identity for Susan
ssh -T github-susan

# 2) Confirm local Git identity (this repo only)
git config user.name "Susan Rich"
git config user.email "susan.janet.rich@gmail.com"

# 3) Confirm branch and remote
git branch -M main
git remote set-url origin git@github-susan:SusanJanetRich/nexus-seed.git
git remote -v

# 4) Review what will be committed (no secrets / no payloads)
git status
git diff

# 5) First push (after commits exist)
git push -u origin main
```


## GUI Client Warning (GitHub Desktop, VS Code, Web UI)

**CRITICAL:** The `github-susan` SSH alias guardrail ONLY works automatically for command-line `git` usage in terminal. 

If you use **GitHub Desktop**, **VS Code Source Control**, or drag-and-drop on the **GitHub Web UI**, these tools will often bypass your custom SSH config and use their own global HTTPS tokens. This can lead to pushing as the wrong user or pushing sensitive payloads.

**Mitigation:**
1. **Never** drag and drop files into the GitHub Web UI.
2. If using VS Code, ensure you commit via the integrated terminal, OR verify that your VS Code Git extension is specifically configured to use the local `git config user.name` and the SSH remote URL.
3. We strongly recommend using the Terminal for `git add`, `git commit`, and `git push` for this repository to guarantee the SSH guardrails activate.

## Payload rule (hard rule: private repo + ssh identity verified before payloads; structure first)

- **Structure first:** establish layout, docs, and guardrails before adding real sensitive payloads.
- **Private repository** and **`ssh -T github-susan`** success are prerequisites before any payload-adjacent material touches the working tree in a way that could be committed.
- Never bypass `.gitignore` for sensitive payloads; if something must be tracked, it must be explicitly non-sensitive (for example redacted fixtures) and reviewed.

git-crypt is a **future guarded option only**—not the default for nexus-seed; see **git-crypt audit-trail check** and **git-crypt decision gate** before any activation.

## Conscious override (git add -f for intentional safe files)

When a file is ignored but is **known safe** (for example a public sample or a deliberate exception), add it intentionally:

```bash
git add -f path/to/intentional-safe-file
```

Document overrides in commit messages or team notes so future readers know the exception was deliberate.

## git-crypt audit-trail check

Payload encryption stays **`HOLD`** until an audit-trail note exists **and** (in practice) the rollback guarantees under **Successful rollback if git-crypt keys are lost** are satisfied—clone-without-unlock, cleartext operational spine, non-GitHub copies or explicit disposal of secrets, surviving indexes. If those prerequisites are not met, **do not** treat encryption as sealed—keep **`HOLD`** and finish the structure-first spine before promoting encrypted payloads.

- **Not the default:** git-crypt is **not** the default posture for nexus-seed.
- **Structure-first:** shape the repo (layout, docs, guardrails) before relying on encryption-in-Git.
- **Payloads excluded:** sensitive payloads stay out of Git via default-deny ignores and workflow—not via “encrypt everything.”
- **Force-add discipline:** use `git add -f` **only** for benign templates or deliberately reviewed safe fixtures—never to smuggle secrets.

**Before enabling git-crypt**, an audit-trail note must record:

- **Why in-repo** (versus external vaulting / out-of-band distribution).
- **File classes** intended for encryption (what categories of files/paths).
- **Key controller** (who generates, stores, rotates, and revokes keys).
- **Recovery storage** (offline/backup location and access controls).
- **Susan GitHub access** (who can read/decrypt via repo membership and keys).
- **JB machine key:** explicitly **authorized or not** for decrypt/build contexts that touch encrypted paths.
- **Rollback** (how to back out `.gitattributes` / git-crypt coverage without trapping the team).
- **`.gitattributes` paths** (exact patterns slated for `git-crypt` filtering).
- **No sensitive commits before encryption is active** (history must be reviewed so plaintext secrets are not already in `main`).

**Required status:** **`HOLD`** until that audit-trail note exists and is agreed.

## git-crypt decision gate

```text
Do not enable git-crypt or expand encrypted paths while status is HOLD or the audit-trail note is missing.
Open the gate only after key controller, recovery, Susan/JB access posture, rollback, and .gitattributes scope are written down and reviewed.
If prerequisites fail, keep payloads excluded and stay structure-first with default-deny ignores—do not “fix” with encryption alone.
```

## Minimum audit test

```bash
git-crypt status
```

```bash
git check-attr -a -- README.md
git check-attr -a -- test.secret
```

Round-trip with `test.secret` (assumes `test.secret` is covered by the intended `git-crypt` filter in `.gitattributes`; use a disposable probe and remove after verification):

```bash
printf 'git-crypt-audit-probe %s\n' "$(date -u +%Y%m%dT%H%MZ)" > test.secret
git add test.secret
git commit -m "chore: git-crypt minimum audit probe"
git show HEAD:test.secret | grep -Fq 'git-crypt-audit-probe' && echo "FAIL: plaintext visible in git object" || echo "OK: object does not contain probe string"
cat test.secret
git reset --hard HEAD~1
rm -f test.secret
```

## Important warning

git-crypt **does not protect previously committed plaintext**: older commits, forks, and clones may still contain cleartext blobs. Treat any sensitive material ever committed in plaintext as a potential incident—**rotate secrets**, decide whether **history rewrite** is in scope, and do not assume encryption retroactively fixes the past.

## Successful rollback if git-crypt keys are lost

**Principle:** Losing git-crypt keys must **not** destroy the operational journal. Encrypted blobs may become unreadable; the **structure**, **indexes**, **audit pointers**, and **receipt references** that explain what happened must remain intact so continuity and governance survive key loss.

### 1. Clone and open without unlock

The repository must **clone, fetch, and open** on a fresh machine **without** git-crypt unlock or key material. **Pass:** layout, docs, manifests, and index files are readable as normal text; only paths explicitly marked as encrypted are opaque. **Fail:** core chronicle layout, navigation, or journal scaffolding lives only inside encrypted trees—fix by moving structure, TOC, and manifests to cleartext **before** relying on git-crypt.

### 2. Sensitive payloads: elsewhere, disposable, or acceptable loss

Secrets and sensitive payloads must be **recoverable outside GitHub**, **explicitly disposable**, or **documented as acceptable loss** if keys vanish. GitHub must **never** be the sole custody for irreplaceable secrets. Bullets:

- Mirror or escrow critical secrets per team policy (not only `git push`).
- If a payload is truly ephemeral, say so in the journal so loss after key failure is an expected state, not a surprise incident.

### 3. Indexes and evidence pointers survive

Cleartext layers keep **what to open next** and **where receipts live**, even when ciphertext is gone. Store pointers and index rows in YAML or markdown that does not require decrypting git-crypt blobs to interpret.

```yaml
# Example: cleartext index row (encrypted attachment may be unreadable after key loss)
entry_id: "JE-2026-0512-014"
title: "Arbitration receipt issued"
evidence_refs:
  - type: chronicle_path
    value: "90_audit/receipts/2026/arbitration_receipt_014.yaml"
  - type: encrypted_attachment
    crypto_status: CRYPTO-LOCKED
    git_path: "payloads/secrets/attachment.bin"
    note: "Unreadable without keys; index still shows existence and audit linkage."
audit_pointer:
  chain_segment: "90_audit/chain/segment_09.jsonl"
  prev_hash_ref: "sha256:…"
```

### 4. Key-loss procedure

When keys are gone and encrypted files are unreadable:

1. **Stop** trying to recover ciphertext unless backup keys exist—declare **CRYPTO-LOCKED** loss for those paths.
2. Preserve and publish **cleartext spine**: `docs/`, journal TOC, manifests, and **`90_audit/`** (or equivalent audit trail paths) unchanged.
3. File a short **receipt** in the audit layer noting scope of loss, date, and which pointers are stale.
4. Recreate **structure-only** checkout from `main` if needed; do not delete audit markers to “hide” broken ciphertext.
5. If policy requires, rotate secrets **out of band** and update cleartext pointers to new locations—never assume GitHub history alone restores secrets.

### 5. No hidden dependency on decrypted payloads for basic questions

Day-to-day operational questions (“what stage are we in?”, “what was decided?”, “which receipt applies?”) must be answerable from **cleartext** docs, indexes, and audit pointers. Decrypted payloads may add depth but must not be the only place that states outcomes material to continuity.

### 6. Structure-only rollback and preserved paths

Rollback after key loss restores **journal and governance shape**, not necessarily secret content. Typical preserved cleartext paths (adjust names to match your tree):

- `docs/` (including this file and operational instructions)
- Top-level manifests, `README`, and explicit journal TOC files
- **`90_audit/`** (or your numbered audit directory): chain segments, receipt manifests, append-only logs
- **CRYPTO-LOCKED** paths remain in the tree as placeholders so history does not pretend secrets vanished silently—only readability is lost

### Rollback success checklist

1. Fresh `git clone` works with **no** git-crypt unlock step for routine reading.
2. Core layout and **docs** are cleartext; encrypted regions are **labeled** (attributes / naming), not accidental.
3. **Indexes and YAML/manifest pointers** resolve to paths or explicit “CRYPTO-LOCKED” stubs without decrypting.
4. Every irreplaceable secret has a **non-GitHub** recovery story, or documented disposable/acceptable-loss status.
5. **`90_audit/`** (and analogous audit roots) stay writable and readable for new receipts after an incident.
6. Basic operational status is answerable **without** opening encrypted payloads.
7. After simulated key loss, you can still **branch, commit cleartext fixes**, and push without recovering old ciphertext.

---

> **Rollback continuity:** operational spine stays readable; only labeled encrypted payloads go dark when keys vanish.

**Keys may vanish. Continuity must not.**

---

> Susan's nexus-seed repository uses dedicated SSH identity via github-susan, local-only Git config, main as canonical branch, and default-deny .gitignore so the right account, key, and branch are always aligned before anything reaches GitHub.

**Right account. Right key. Structure first. Payloads denied by default.**

> **Clean lock:** keep **github-susan** + **IdentitiesOnly** as the Susan push identity; keep payloads **default-deny**; treat git-crypt as optional hardening **after** `HOLD` clears—never as cleanup for plaintext already in Git history.
