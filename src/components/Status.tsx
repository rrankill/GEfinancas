import type { ReactNode } from "react";

export function Status({ tone, children }: { tone: "success" | "warning" | "neutral" | "danger"; children: ReactNode }) {
  return <span className={`status status-${tone}`}><span className="status-dot" />{children}</span>;
}
