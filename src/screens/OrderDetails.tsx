import type { Screen } from "../types";
import { ordersLines } from "../data";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import { InfoRow } from "../components/InfoRow";
import { Money } from "../components/Money";
import { ScreenShell } from "../components/ScreenShell";
import { Status } from "../components/Status";

export function OrderDetails({ go }: { go: (s: Screen) => void }) {
  return (
    <ScreenShell current="purchases" go={go} nav={false}>
      <Header title="Detalhes do pedido" onBack={() => go("home")} action={<button className="icon-button"><Icon name="more" /></button>} />
      <div className="content-pad">
        <div className="order-title"><div><span>PEDIDO #FN-1048</span><h1>Materiais da obra</h1></div><Status tone="success">Pago</Status></div>
        <div className="timeline">
          {["Pedido realizado", "Pagamento aprovado", "Nota fiscal emitida", "Aguardando retirada"].map((item, index) => <div className={index < 3 ? "done" : "current"} key={item}><span>{index < 3 ? <Icon name="check" size={13} /> : index + 1}</span><div><strong>{item}</strong><small>{index < 3 ? ["22 mai, 09:42", "22 mai, 10:05", "22 mai, 14:30"][index] : "Disponível em 23 mai"}</small></div></div>)}
        </div>
        <section className="card section-card"><div className="card-heading"><h2>Itens do pedido</h2><span>3 itens</span></div>{ordersLines.map((line) => <div className="product-line" key={line.name}><div><strong>{line.name}</strong><small>{line.detail}</small></div><Money>{line.value}</Money></div>)}<div className="total-line"><span>Total</span><strong>R$ 4.248,00</strong></div></section>
        <section className="card section-card"><div className="card-heading"><h2>Pagamento e retirada</h2></div><InfoRow label="Forma de pagamento" value="PIX" /><InfoRow label="Retirada" value="Balcão · Loja Norte" /><InfoRow label="Responsável" value="Marcos Almeida" /></section>
        <div className="action-stack"><Button onClick={() => go("receipt")} icon="receipt">Comprovante de liberação</Button><Button variant="secondary" onClick={() => go("invoice")} icon="document">Ver nota fiscal</Button></div>
      </div>
    </ScreenShell>
  );
}
