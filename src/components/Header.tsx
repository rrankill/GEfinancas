import type { ReactNode } from "react";
import { Brand } from "./brand";
import { Icon } from "./Icon";

export function Header({ title, onBack, action }: { title: string; onBack?: () => void; action?: ReactNode }) {
  return (
    <header className="topbar">
      {onBack ? <button className="icon-button" onClick={onBack} aria-label="Voltar"><Icon name="arrow" /></button> : <Brand compact />}
      <strong className="topbar-title">{title}</strong>
      <div className="header-action">{action}</div>
    </header>
  );
}