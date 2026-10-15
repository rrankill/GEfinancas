import { useState, type FormEvent } from "react";
import type { Order, Screen } from "../types";
import { orders } from "../data";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import { OrderCard } from "../components/OrderCard";
import { ScreenShell } from "../components/ScreenShell";

export function SearchOrder({ go, openOrder }: { go: (s: Screen) => void; openOrder: (o: Order) => void }) {
  const [code, setCode] = useState("");

  const search = (event: FormEvent) => {
    event.preventDefault();
    const term = code.trim().toLowerCase().replace("#", "");
    const found = term ? orders.find((o) => o.code.toLowerCase().replace("#", "").includes(term)) : undefined;
    if (found) openOrder(found);
    else go("not-found");
  };

  return (
    <ScreenShell current="search" go={go}>
      <Header title="Buscar pedido" />
      <div className="content-pad search-content">
        <div className="page-intro"><span className="eyebrow">CONSULTA RÁPIDA</span><h1>Encontre um pedido</h1><p>Digite o número do pedido ou da nota fiscal do cliente.</p></div>
        <form onSubmit={search}>
          <label className="search-box"><Icon name="search" /><input autoFocus value={code} onChange={(e) => setCode(e.target.value)} placeholder="Ex.: FN-1048" /></label>
          <Button type="submit">Buscar pedido</Button>
        </form>
        <div className="helper-card"><Icon name="receipt" /><div><strong>Onde encontro o código?</strong><p>Ele está no e-mail de confirmação ou no comprovante da compra.</p></div></div>
        <div className="recent-search">
          <span>BUSCAS RECENTES</span>
          {orders.slice(0, 2).map((order) => (
            <OrderCard key={order.code} order={order} onClick={() => openOrder(order)} />
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}