import { useState } from "react";
import type { Order, Screen } from "../types";
import { orders } from "../data";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import { Money } from "../components/Money";
import { OrderCard } from "../components/OrderCard";
import { ScreenShell } from "../components/ScreenShell";

export function Purchases({ go, openOrder }: { go: (s: Screen) => void; openOrder: (o: Order) => void }) {
  const [tab, setTab] = useState<"orders" | "invoices">("orders");
  return (
    <ScreenShell current="purchases" go={go}>
      <Header title="Pedidos e notas" />
      <div className="content-pad">
        <div className="tabs"><button onClick={() => setTab("orders")} className={tab === "orders" ? "active" : ""}>Pedidos</button><button onClick={() => setTab("invoices")} className={tab === "invoices" ? "active" : ""}>Notas fiscais</button></div>
        <div className="filter-row"><span>{tab === "orders" ? `${orders.length} pedidos` : "4 notas fiscais"}</span><button>Mais recentes <Icon name="chevron" size={15} /></button></div>
        {tab === "orders" ? <>{orders.map((order) => <OrderCard key={order.code} order={order} onClick={() => openOrder(order)} />)}</> : (
          <div className="invoice-list">
            {[["NF-e 000.018.492", "#FN-1048", "R$ 4.248,00"], ["NF-e 000.018.327", "#FN-0983", "R$ 2.890,50"], ["NF-e 000.018.104", "#FN-0951", "R$ 6.420,00"]].map((invoice, i) => <button className="invoice-row" key={invoice[0]} onClick={() => go(i === 0 ? "invoice" : "already-issued")}><span className="doc-icon"><Icon name="document" /></span><div><strong>{invoice[0]}</strong><small>{invoice[1]} · 22 mai 2025</small></div><Money>{invoice[2]}</Money><Icon name="download" size={18} /></button>)}
          </div>
        )}
      </div>
    </ScreenShell>
  );
}