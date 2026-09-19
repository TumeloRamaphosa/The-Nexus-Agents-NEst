# Nest Command Deck

Static **Command Deck** surface for The Nexus Agents Nest — gold/obsidian JARVIS-HUD layout where each **Grok seat is a workstation computer**, not a Termux/Android fork and **not** AgentCrew or DroidDesk.

War Room remains the operational dashboard under `war-room/`; this directory is the dedicated **fleet seat map + human gate** scaffold until the always-on Linux host is live.

## Run locally

```bash
cd command-deck
npm install
npm run dev
```

Open **http://127.0.0.1:5190** (Vite default for this package).

Production-style static output:

```bash
npm run build
npm run preview
```

Artifacts land in `command-deck/dist/` and can be served by any static host (Cloudflare Pages, Nginx, etc.).

## What you see

| Area | Purpose |
|------|---------|
| **Center reactor** | **Neuromancer / Agent Lord** — human approval gate (publish, spend, deploy, client_send). Not a named operator profile. |
| **Seat cards** | Nest gateway seats from the [Agent Identity Contract](../docs/AGENT-IDENTITY-CONTRACT.md) seed (on `cursor/nest-os-bootstrap-05a3` until merged to `main`). |
| **Honesty banner** | War Room + remote shell marked **blocked** until always-on Linux. **No fake VM counts** or live Grok probes in this UI. |
| **Fail-closed badge** | Each seat shows approval gates; permissions default `can_draft` only until Neuromancer grant. |

Seats rendered in v0.1: `operating-system`, `nexus`, `adam-smasher`, `claudiou`, `cloud-orchestrator`, `grok-nano`, `katjana`, `studbot-product`, `studbot-delivery`, `content-chief`, `robusca`.

Edit the seed in `src/data/seats.ts` when the identity contract updates.

## Wiring to StudEx Group hub (later)

This scaffold is designed to hang off the public **StudEx Group** hub without importing third-party “desk” products:

```
studex-group.com (marketing + hub)
        │
        ├── deep link → /command-deck/  (static or CDN)
        │
        └── future API proxy → Nest War Room (:5000) on always-on VM
                 │
                 └── POST /api/agents/register  ← canonical identity
```

| Endpoint / surface | Role |
|--------------------|------|
| **studex-group.com** | Public hub; Command Deck linked as “Nest seats” once DNS and deploy pipeline are ready. |
| **agent-os.studex.dev** | Private Agent OS register (DNS held). Command Deck will read seat status from register APIs **after** TLS + auth — not in this repo. |
| **War Room** (`war-room/`) | Live registry, tasks, and agent network UI when VM is up. Command Deck stays read-only until wired. |
| **OpenMaus / Mac command room** | Local executors; seat cards do not conflate OpenClaw identity count with Grok seats. |

Integration steps (post–always-on host):

1. Merge `docs/AGENT-IDENTITY-CONTRACT.md` from nest bootstrap PR.
2. Point Command Deck build at `GET /api/agents` (or register mirror) with auth — replace static `NEST_SEATS` fallback.
3. Enable War Room CTA only when health check passes on the VM (no optimistic green states).
4. Publish `dist/` beside hub assets or subdomain (e.g. `nest.studex-group.com/command-deck`).

## Boundaries

- **No secrets** in this tree.
- **No** Stud-Bot commercial pricing or offer copy.
- **No** DroidDesk or AgentCrew dependency — visual metaphor only (“seat = computer”).
- Status values in v0.1 are **documented placeholders** (`degraded`, `offline`, `standby`) until War Room register is connected.

## Related docs

- Identity contract (bootstrap branch): `docs/AGENT-IDENTITY-CONTRACT.md`
- War Room app: `war-room/war-room/`
- Repo overview: [`README.md`](../README.md)
