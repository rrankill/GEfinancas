import type { Order, Screen } from "../types";
import { orders } from "../data";
import { Brand } from "../components/brand";
import { Icon } from "../components/Icon";
import { OrderCard } from "../components/OrderCard";
import { ScreenShell } from "../components/ScreenShell";

export function Home({ go, openOrder }: { go: (s: Screen) => void; openOrder: (o: Order) => void }) {
  return (
    <ScreenShell current="home" go={go}>
      <div className="home-header">
        <div className="home-brand"><Brand compact /><div><small>Bom dia,</small><strong>Marcos Oliveira</strong></div></div>
        <button className="avatar" onClick={() => go("more")}>MO</button>
      </div>
      <section className="hero-card">
        <span>Vendas processadas este mês</span>
        <strong>R$ .........</strong>
        <div><small>4 pedidos</small><i /><small>1 aguardando retirada</small></div>
        <div className="hero-beam beam-one" /><div className="hero-beam beam-two" />
      </section>
      <section className="section">
        <div className="section-heading"><h2>Acesso rápido</h2></div>
        <div className="quick-grid">
          <button onClick={() => go("search")}><span className="quick-icon orange"><Icon name="search" /></span><strong>Buscar pedido</strong><small>Consulte pelo código</small></button>
          <button onClick={() => go("purchases")}><span className="quick-icon green"><Icon name="document" /></span><strong>Notas fiscais</strong><small>Acesse e baixe PDFs</small></button>
        </div>
      </section>
      <section className="section">
        <div className="section-heading"><h2>Pedidos recentes</h2><button onClick={() => go("purchases")}>Ver todos</button></div>
        {orders.slice(0, 2).map((order) => (
          <OrderCard key={order.code} order={order} onClick={() => openOrder(order)} />
        ))}
      </section>
    </ScreenShell>
  );
}