import type { ReactNode } from "react";
import type { Screen } from "../types";
import { BottomNav } from "./BottomNav";

export function ScreenShell({ children, current, go, nav = true }: { children: ReactNode; current: Screen; go: (s: Screen) => void; nav?: boolean }) {
  return <div className="screen"><main className="screen-content">{children}</main>{nav && <BottomNav current={current} go={go} />}</div>;
}