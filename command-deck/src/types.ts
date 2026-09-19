export type Lane =
  | "infra"
  | "product"
  | "delivery"
  | "content"
  | "coffee"
  | "client"
  | "markets"
  | "research"
  | "sales"
  | "ops";

export type SeatStatus = "active" | "standby" | "degraded" | "disabled" | "offline";

export type SeatSource =
  | "grok-os"
  | "openclaw"
  | "hermes"
  | "nest-vm"
  | "human"
  | "base44";

export interface SeatPermissions {
  can_draft: boolean;
  can_publish: boolean;
  can_spend: boolean;
  can_deploy: boolean;
  can_message_external: boolean;
}

export interface SeatAudit {
  human_gates: string[];
  approval_required_for: string[];
}

export interface NestSeat {
  os_name: string;
  nest_seat: string;
  lane: Lane;
  source: SeatSource;
  /** Scaffold only — not probed against Grok or War Room API */
  status: SeatStatus;
  status_note: string;
  capabilities: string[];
  permissions: SeatPermissions;
  audit: SeatAudit;
  /** Optional Grok UUID when known from identity contract seed */
  os_agent_id?: string;
}

export const FAIL_CLOSED_DEFAULT: Pick<
  SeatPermissions,
  "can_publish" | "can_spend" | "can_deploy" | "can_message_external"
> = {
  can_publish: false,
  can_spend: false,
  can_deploy: false,
  can_message_external: false,
};

export const DEFAULT_AUDIT: SeatAudit = {
  human_gates: ["publish", "spend", "shopify", "credentials"],
  approval_required_for: ["publish", "spend", "deploy", "client_send"],
};
