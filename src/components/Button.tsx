import type { ReactNode } from "react";
import type { IconName } from "../types";
import { Icon } from "./Icon";

export function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  icon,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  type?: "button" | "submit";
  icon?: IconName;
}) {
  return <button type={type} className={`btn btn-${variant}`} onClick={onClick}>{icon && <Icon name={icon} />}{children}</button>;
}