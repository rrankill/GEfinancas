import type { Order } from "../types";
import { Icon } from "./Icon";
import { Money } from "./Money";
import { Status } from "./Status";

export function OrderCard({ order, onClick }: { order: Order; onClick: () => void }) {
  const items = order.lines.length;
  return (
    <button className="order-card" onClick={onClick}>
      <div className="order-card-top">
        <div><small>Pedido</small><strong>{order.code}</strong></div>
        <Status tone={order.pending ? "warning" : "success"}>{order.pending ? "Pagamento pendente" : "Pago"}</Status>
      </div>
      <div className="order-card-bottom">
        <span>{order.date} · {items} {items === 1 ? "item" : "itens"}</span>
        <Money>{order.total}</Money>
        <Icon name="chevron" size={18} />
      </div>
    </button>
  );
}