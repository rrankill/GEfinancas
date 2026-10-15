export type Screen =
  | "login"
  | "home"
  | "search"
  | "order"
  | "payment"
  | "invoice"
  | "receipt"
  | "pending"
  | "not-found"
  | "already-issued"
  | "third-party"
  | "partial"
  | "cancel"
  | "purchases"
  | "more";

export type IconName =
  | "arrow"
  | "bag"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "document"
  | "download"
  | "home"
  | "menu"
  | "more"
  | "receipt"
  | "search"
  | "shield"
  | "user"
  | "wallet";

export type OrderLine = { name: string; detail: string; value: string };

export type Order = {
  code: string;
  date: string;
  total: string;
  pending: boolean;
  lines: OrderLine[];
};