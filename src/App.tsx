import { FormEvent, ReactNode, useState } from "react";
import { ordersLines } from "./data";
import type { IconName, Screen } from "./types";
import { Brand } from "./components/brand";
import { Status } from "./components/Status";
import { Money } from "./components/Money";
import { InfoRow } from "./components/InfoRow";
import { Icon } from "./components/Icon"; 
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { OrderCard } from "./components/OrderCard"; 
import { BottomNav } from "./components/BottomNav";
import { ScreenShell } from "./components/ScreenShell";




















function Login({ go }: { go: (s: Screen) => void }) {
  const submit = (event: FormEvent) => { event.preventDefault(); go("home"); };
  return (
    <div className="login-screen">
      <div className="login-art">
        <Brand />
        <div className="steel-lines"><i /><i /><i /><i /></div>
        <div className="login-copy"><span>GESTÃO DO FUNCIONÁRIO</span><h1>Operação segura,<br />do pedido à entrega.</h1></div>
      </div>
      <form className="login-form" onSubmit={submit}>
        <div><h2>Acesso interno</h2><p>Entre com suas credenciais corporativas da Ferro Norte.</p></div>
        <label>E-mail corporativo<input type="email" defaultValue="operacoes@ferronorte.com.br" required /></label>
        <label>Senha<div className="password-field"><input type="password" defaultValue="12345678" required /><Icon name="shield" size={18} /></div></label>
        <button className="forgot" type="button">Esqueci minha senha</button>
        <Button type="submit">Entrar</Button>
        <small className="secure-note"><Icon name="shield" size={15} /> Acesso exclusivo para funcionários</small>
      </form>
    </div>
  );
}

function Home({ go }: { go: (s: Screen) => void }) {
  return (
    <ScreenShell current="home" go={go}>
      <div className="home-header">
        <div className="home-brand"><Brand compact /><div><small>Bom dia,</small><strong>Marcos Oliveira</strong></div></div>
        <button className="avatar" onClick={() => go("more")}>MO</button>
      </div>
      <section className="hero-card">
        <span>Vendas processadas este mês</span>
        <strong>R$ 18.730,50</strong>
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
        <OrderCard onClick={() => go("order")} />
        <div className="spacer-small" />
        <OrderCard pending onClick={() => go("pending")} />
      </section>
    </ScreenShell>
  );
}

function SearchOrder({ go }: { go: (s: Screen) => void }) {
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



function OrderDetails({ go }: { go: (s: Screen) => void }) {
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

const stateData: Record<Exclude<Screen, "login" | "home" | "search" | "order" | "purchases" | "more" | "third-party" | "partial" | "cancel">, { tone: string; icon: IconName; eyebrow: string; title: string; body: string }> = {
  payment: { tone: "success", icon: "check", eyebrow: "PAGAMENTO CONFIRMADO", title: "Tudo certo!", body: "Recebemos o pagamento do pedido #FN-1048. Já estamos preparando sua nota fiscal." },
  invoice: { tone: "success", icon: "document", eyebrow: "NOTA EMITIDA", title: "Nota fiscal disponível", body: "A NF-e 000.018.492 foi emitida e já está vinculada ao pedido." },
  receipt: { tone: "success", icon: "shield", eyebrow: "PEDIDO LIBERADO", title: "Comprovante de liberação", body: "Apresente este código no balcão para retirar os materiais do pedido." },
  pending: { tone: "warning", icon: "clock", eyebrow: "AGUARDANDO PAGAMENTO", title: "Pagamento pendente", body: "O pedido #FN-1052 está reservado. Conclua o PIX até hoje, às 17:30." },
  "not-found": { tone: "neutral", icon: "search", eyebrow: "SEM RESULTADOS", title: "Pedido não encontrado", body: "Não localizamos um pedido com esse código. Confira os dados e tente novamente." },
  "already-issued": { tone: "warning", icon: "document", eyebrow: "NOTA JÁ PROCESSADA", title: "Nota já emitida", body: "Este pedido já possui uma nota fiscal. Você pode visualizar ou baixar o documento abaixo." },
};

function StatePage({ type, go }: { type: keyof typeof stateData; go: (s: Screen) => void }) {
  const data = stateData[type];
  const isReceipt = type === "receipt";
  const primary = type === "not-found" ? "Tentar novamente" : type === "pending" ? "Copiar código PIX" : type === "invoice" || type === "already-issued" ? "Baixar nota em PDF" : "Voltar ao início";
  const primaryAction = () => type === "not-found" ? go("search") : go("home");
  return (
    <ScreenShell current="purchases" go={go} nav={false}>
      <Header title={type === "receipt" ? "Comprovante" : "Status do pedido"} onBack={() => go(type === "not-found" ? "search" : "order")} />
      <div className="state-page content-pad">
        <div className={`state-icon ${data.tone}`}><Icon name={data.icon} size={28} /></div>
        <span className="eyebrow">{data.eyebrow}</span><h1>{data.title}</h1><p>{data.body}</p>
        {isReceipt ? <div className="release-code"><span>CÓDIGO DE RETIRADA</span><strong>FN48–7241</strong><small>Válido até 29 de maio de 2025</small></div> : (
          type !== "not-found" && <div className="summary-card"><InfoRow label="Pedido" value="#FN-1048" /><InfoRow label={type === "pending" ? "Valor a pagar" : "Valor total"} value="R$ 4.248,00" /><InfoRow label={type === "invoice" || type === "already-issued" ? "NF-e" : "Data"} value={type === "invoice" || type === "already-issued" ? "000.018.492" : "22 mai 2025"} /></div>
        )}
        <div className="action-stack state-actions"><Button onClick={primaryAction} icon={type === "invoice" || type === "already-issued" ? "download" : undefined}>{primary}</Button>{type !== "not-found" && <Button variant="secondary" onClick={() => go("order")}>Ver detalhes do pedido</Button>}</div>
      </div>
    </ScreenShell>
  );
}

function Purchases({ go }: { go: (s: Screen) => void }) {
  const [tab, setTab] = useState<"orders" | "invoices">("orders");
  return (
    <ScreenShell current="purchases" go={go}>
      <Header title="Pedidos e notas" />
      <div className="content-pad">
        <div className="tabs"><button onClick={() => setTab("orders")} className={tab === "orders" ? "active" : ""}>Pedidos</button><button onClick={() => setTab("invoices")} className={tab === "invoices" ? "active" : ""}>Notas fiscais</button></div>
        <div className="filter-row"><span>{tab === "orders" ? "6 pedidos" : "4 notas fiscais"}</span><button>Mais recentes <Icon name="chevron" size={15} /></button></div>
        {tab === "orders" ? <><OrderCard onClick={() => go("order")} /><OrderCard pending onClick={() => go("pending")} /></> : (
          <div className="invoice-list">
            {[["NF-e 000.018.492", "#FN-1048", "R$ 4.248,00"], ["NF-e 000.018.327", "#FN-0983", "R$ 2.890,50"], ["NF-e 000.018.104", "#FN-0951", "R$ 6.420,00"]].map((invoice, i) => <button className="invoice-row" key={invoice[0]} onClick={() => go(i === 0 ? "invoice" : "already-issued")}><span className="doc-icon"><Icon name="document" /></span><div><strong>{invoice[0]}</strong><small>{invoice[1]} · 22 mai 2025</small></div><Money>{invoice[2]}</Money><Icon name="download" size={18} /></button>)}
          </div>
        )}
      </div>
    </ScreenShell>
  );
}

const operations: { screen: Screen; icon: IconName; title: string; text: string; tone: string }[] = [
  { screen: "payment", icon: "check", title: "Confirmação de pagamento", text: "Pagamento aprovado e confirmado", tone: "green" },
  { screen: "invoice", icon: "document", title: "Emissão da nota", text: "NF-e pronta para download", tone: "green" },
  { screen: "receipt", icon: "shield", title: "Comprovante de liberação", text: "Código para retirada no balcão", tone: "orange" },
  { screen: "pending", icon: "clock", title: "Pagamento pendente", text: "Pedido aguardando PIX", tone: "orange" },
  { screen: "not-found", icon: "search", title: "Pedido não encontrado", text: "Estado de busca sem resultado", tone: "gray" },
  { screen: "already-issued", icon: "receipt", title: "Nota já emitida", text: "Documento processado anteriormente", tone: "gray" },
  { screen: "third-party", icon: "user", title: "Retirada por outra pessoa", text: "Autorizar um novo responsável", tone: "gray" },
  { screen: "partial", icon: "bag", title: "Retirada parcial", text: "Selecionar itens para retirada", tone: "gray" },
  { screen: "cancel", icon: "close", title: "Cancelamento ou devolução", text: "Solicitar atendimento", tone: "gray" },
];

function More({ go }: { go: (s: Screen) => void }) {
  return (
    <ScreenShell current="more" go={go}>
      <Header title="Mais opções" />
      <div className="content-pad">
        <div className="profile-card"><div className="avatar large">MO</div><div><strong>Marcos Oliveira</strong><small>Operações · Matrícula FN-042</small></div></div>
        <span className="list-label">CENTRAL DE OPERAÇÕES</span>
        <div className="operation-list">{operations.map((item) => <button key={item.screen} onClick={() => go(item.screen)}><span className={`op-icon ${item.tone}`}><Icon name={item.icon} /></span><div><strong>{item.title}</strong><small>{item.text}</small></div><Icon name="chevron" size={17} /></button>)}</div>
        <Button variant="ghost" onClick={() => go("login")}>Encerrar sessão</Button>
      </div>
    </ScreenShell>
  );
}

function PickupForm({ type, go }: { type: "third-party" | "partial" | "cancel"; go: (s: Screen) => void }) {
  const configs = {
    "third-party": { title: "Retirada por outra pessoa", eyebrow: "AUTORIZAÇÃO DE RETIRADA", description: "Informe quem fará a retirada. A pessoa deverá apresentar um documento com foto.", button: "Autorizar retirada" },
    partial: { title: "Retirada parcial", eyebrow: "SELEÇÃO DE ITENS", description: "Escolha os materiais que deseja retirar agora. O restante continuará reservado.", button: "Confirmar itens" },
    cancel: { title: "Cancelamento ou devolução", eyebrow: "SOLICITAÇÃO", description: "Conte o motivo para que nossa equipe possa orientar os próximos passos.", button: "Enviar solicitação" },
  }[type];
  return (
    <ScreenShell current="more" go={go} nav={false}>
      <Header title={configs.title} onBack={() => go("more")} />
      <div className="content-pad form-page">
        <span className="eyebrow">{configs.eyebrow}</span><h1>{configs.title}</h1><p>{configs.description}</p>
        <div className="order-ref"><Icon name="bag" /><div><small>PEDIDO</small><strong>#FN-1048 · R$ 4.248,00</strong></div></div>
        {type === "third-party" && <div className="field-stack"><label>Nome completo<input placeholder="Nome do responsável" /></label><label>CPF<input placeholder="000.000.000-00" /></label></div>}
        {type === "partial" && <div className="check-list">{ordersLines.map((line, i) => <label key={line.name}><input type="checkbox" defaultChecked={i < 2} /><span><strong>{line.name}</strong><small>{line.detail}</small></span><Money>{line.value}</Money></label>)}</div>}
        {type === "cancel" && <div className="field-stack"><label>Tipo de solicitação<select defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Cancelar pedido</option><option>Devolver materiais</option></select></label><label>Motivo<textarea placeholder="Descreva brevemente o motivo" rows={4} /></label></div>}
        <div className="notice"><Icon name="shield" /><p>{type === "cancel" ? "A solicitação será analisada em até 2 dias úteis." : "Os dados informados são usados somente para validar esta operação."}</p></div>
        <Button onClick={() => go("home")}>{configs.button}</Button>
      </div>
    </ScreenShell>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const go = (next: Screen) => { setScreen(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  if (screen === "login") return <Login go={go} />;
  if (screen === "home") return <Home go={go} />;
  if (screen === "search") return <SearchOrder go={go} />;
  if (screen === "order") return <OrderDetails go={go} />;
  if (screen === "purchases") return <Purchases go={go} />;
  if (screen === "more") return <More go={go} />;
  if (screen === "third-party" || screen === "partial" || screen === "cancel") return <PickupForm type={screen} go={go} />;
  return <StatePage type={screen} go={go} />;
}
