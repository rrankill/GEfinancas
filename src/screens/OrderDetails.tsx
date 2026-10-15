import type { Order, Screen } from "../types";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import { InfoRow } from "../components/InfoRow";
import { Money } from "../components/Money";
import { ScreenShell } from "../components/ScreenShell";
import { Status } from "../components/Status";

export function OrderDetails({ order, go }: { order: Order; go: (s: Screen) => void }) {
  const day = order.date.split(" ").slice(0, 2).join(" ");
  const steps = order.pending
    ? [
        { label: "Pedido realizado", time: `${day}, 09:42` },
        { label: "Aguardando pagamento", time: "Conclua o PIX até 17:30" },
      ]
    : [
        { label: "Pedido realizado", time: `${day}, 09:42` },
        { label: "Pagamento aprovado", time: `${day}, 10:05` },
        { label: "Nota fiscal emitida", time: `${day}, 14:30` },
        { label: "Aguardando retirada", time: "Disponível para retirada" },
      ];
  const doneCount = order.pending ? 1 : 3;
  const items = order.lines.length;

  return (
    <ScreenShell current="purchases" go={go} nav={false}>
      <Header title="Detalhes do pedido" onBack={() => go("home")} action={<button className="icon-button"><Icon name="more" /></button>} />
      <div className="content-pad">
        <div className="order-title">
          <div><span>PEDIDO {order.code}</span><h1>Materiais da obra</h1></div>
          <Status tone={order.pending ? "warning" : "success"}>{order.pending ? "Pagamento pendente" : "Pago"}</Status>
        </div>
        <div className="timeline">
          {steps.map((step, index) => (
            <div className={index < doneCount ? "done" : "current"} key={step.label}>
              <span>{index < doneCount ? <Icon name="check" size={13} /> : index + 1}</span>
              <div><strong>{step.label}</strong><small>{step.time}</small></div>
            </div>
          ))}
        </div>
        <section className="card section-card">
          <div className="card-heading"><h2>Itens do pedido</h2><span>{items} {items === 1 ? "item" : "itens"}</span></div>
          {order.lines.map((line) => (
            <div className="product-line" key={line.name}>
              <div><strong>{line.name}</strong><small>{line.detail}</small></div>
              <Money>{line.value}</Money>
            </div>
          ))}
          <div className="total-line"><span>Total</span><strong>{order.total}</strong></div>
        </section>
        <section className="card section-card">
          <div className="card-heading"><h2>Pagamento e retirada</h2></div>
          <InfoRow label="Forma de pagamento" value="PIX" />
          <InfoRow label="Retirada" value="Balcão · Loja Norte" />
          <InfoRow label="Responsável" value="Marcos Almeida" />
        </section>
        <div className="action-stack">
          {order.pending ? (
            <Button onClick={() => go("pending")} icon="clock">Ver pagamento pendente</Button>
          ) : (
            <>
              <Button onClick={() => go("receipt")} icon="receipt">Comprovante de liberação</Button>
              <Button variant="secondary" onClick={() => go("invoice")} icon="document">Ver nota fiscal</Button>
            </>
          )}
        </div>
      </div>
    </ScreenShell>
  );
}