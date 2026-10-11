import type { ReactNode } from "react";

export function Money({ children }: { children: ReactNode }) {
  return <span className="money">{children}</span>;
}