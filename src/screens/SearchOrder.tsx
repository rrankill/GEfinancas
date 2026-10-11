import { useState, type FormEvent } from "react";
import type { Screen } from "../types";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import { OrderCard } from "../components/OrderCard";
import { ScreenShell } from "../components/ScreenShell";

export function SearchOrder({ go }: { go: (s: Screen) => void }) {
  const [code, setCode] = useState("");
  const search = (event: FormEvent) => { event.preventDefault(); go(code.toLowerCase().includes("999") ? "not-found" : "order"); };
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
        <div className="recent-search"><span>BUSCAS RECENTES</span><OrderCard onClick={() => go("order")} /></div>
      </div>
    </ScreenShell>
  );
}