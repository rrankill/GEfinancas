import { Icon } from "./Icon";
import { Money } from "./Money";
import { Status } from "./Status";

export function OrderCard({ onClick, pending = false }: { onClick: () => void; pending?: boolean }) {
  return (
    <button className="order-card" onClick={onClick}>
      <div className="order-card-top">
        <div><small>Pedido</small><strong>#FN-1048</strong></div>
        <Status tone={pending ? "warning" : "success"}>{pending ? "Pagamento pendente" : "Pago"}</Status>
      </div>
      <div className="order-card-bottom">
        <span>22 mai 2025 · 3 itens</span>
        <Money>R$ 4.248,00</Money>
        <Icon name="chevron" size={18} />
      </div>
    </button>
  );
}