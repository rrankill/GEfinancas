import type { IconName, Screen } from "../types";
import { Icon } from "./Icon";

export function BottomNav({ current, go }: { current: Screen; go: (screen: Screen) => void }) {
  const items: { screen: Screen; icon: IconName; label: string }[] = [
    { screen: "home", icon: "home", label: "Início" },
    { screen: "search", icon: "search", label: "Buscar" },
    { screen: "purchases", icon: "document", label: "Pedidos" },
    { screen: "more", icon: "menu", label: "Mais" },
  ];
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button key={item.screen} className={current === item.screen ? "active" : ""} onClick={() => go(item.screen)}>
          <Icon name={item.icon} /><span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}