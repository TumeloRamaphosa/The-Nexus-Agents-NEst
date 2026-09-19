import { NEST_SEATS } from "./data/seats";
import type { NestSeat, SeatStatus } from "./types";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function statusClass(status: SeatStatus): string {
  switch (status) {
    case "active":
      return "status-active";
    case "standby":
      return "status-standby";
    case "degraded":
      return "status-degraded";
    case "disabled":
      return "status-disabled";
    case "offline":
    default:
      return "status-offline";
  }
}

function gatesLabel(seat: NestSeat): string {
  return seat.audit.approval_required_for.slice(0, 4).join(" · ");
}

function seatCard(seat: NestSeat): string {
  const idShort = seat.os_agent_id
    ? `${seat.os_agent_id.slice(0, 8)}…`
    : seat.source === "base44"
      ? "base44-registry"
      : "—";

  return `
    <article class="seat-card" data-seat="${escapeHtml(seat.nest_seat)}">
      <div class="seat-bezel">
        <div class="seat-screen">
          <div class="seat-scanlines" aria-hidden="true"></div>
          <header class="seat-header">
            <span class="seat-icon" aria-hidden="true">▣</span>
            <div>
              <h3>${escapeHtml(seat.os_name)}</h3>
              <p class="seat-slug">${escapeHtml(seat.nest_seat)}</p>
            </div>
          </header>
          <dl class="seat-meta">
            <div><dt>Lane</dt><dd class="lane-${escapeHtml(seat.lane)}">${escapeHtml(seat.lane)}</dd></div>
            <div><dt>Source</dt><dd>${escapeHtml(seat.source)}</dd></div>
            <div><dt>Capabilities</dt><dd class="cap-list">${escapeHtml(seat.capabilities.join(" · "))}</dd></div>
            <div><dt>Register id</dt><dd class="mono">${escapeHtml(idShort)}</dd></div>
          </dl>
          <p class="seat-note">${escapeHtml(seat.status_note)}</p>
          <div class="seat-footer">
            <span class="status-pill ${statusClass(seat.status)}">${escapeHtml(seat.status)}</span>
            <span class="gates-badge" title="Fail-closed until Neuromancer grant">⛨ ${escapeHtml(gatesLabel(seat))}</span>
          </div>
        </div>
        <div class="seat-base" aria-hidden="true"></div>
      </div>
    </article>
  `;
}

export function renderCommandDeck(root: HTMLElement): void {
  const seatGrid = NEST_SEATS.map(seatCard).join("\n");

  root.innerHTML = `
    <div class="deck-shell">
      <header class="deck-topbar">
        <div class="brand">
          <span class="brand-mark">◈</span>
          <div>
            <p class="brand-kicker">StudEx Nest</p>
            <h1>Command Deck</h1>
          </div>
        </div>
        <div class="topbar-meta">
          <span class="chip chip-warn">Scaffold v0.1</span>
          <span class="chip">Static seat map</span>
        </div>
      </header>

      <section class="honesty-banner" role="status">
        <p><strong>War Room &amp; remote shell:</strong> blocked until always-on Linux host is live. This deck does not show VM counts or fake health.</p>
        <p><strong>Registry:</strong> <code>agent-os.studex.dev</code> is private (DNS held). Live register flows land after hub wiring.</p>
      </section>

      <main class="deck-layout">
        <section class="reactor-panel" aria-label="Neuromancer human gate">
          <div class="reactor-ring ring-outer"></div>
          <div class="reactor-ring ring-mid"></div>
          <div class="reactor-ring ring-inner"></div>
          <div class="reactor-core">
            <p class="core-label">Neuromancer</p>
            <h2>Agent Lord</h2>
            <p class="core-sub">Human gate · fail-closed approvals</p>
            <ul class="core-gates">
              <li>publish</li>
              <li>spend</li>
              <li>deploy</li>
              <li>client_send</li>
            </ul>
            <p class="core-foot">Center seat is the operator — Grok seats orbit as computers, not clones of this console.</p>
          </div>
        </section>

        <section class="seats-panel">
          <div class="panel-head">
            <h2>Grok seat computers</h2>
            <p>Each card is a Nest gateway seat from the identity contract — workstation metaphor, not Termux or AgentCrew.</p>
          </div>
          <div class="seat-grid">
            ${seatGrid}
          </div>
        </section>
      </main>

      <footer class="deck-footer">
        <p>Future hub: <a href="https://studex-group.com" rel="noopener noreferrer">studex-group.com</a> · War Room deep link when host ready · No DroidDesk / AgentCrew dependency</p>
      </footer>
    </div>
  `;
}
