import type { IconName, Screen } from "../types";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import { InfoRow } from "../components/InfoRow";
import { ScreenShell } from "../components/ScreenShell";

const stateData: Record<Exclude<Screen, "login" | "home" | "search" | "order" | "purchases" | "more" | "third-party" | "partial" | "cancel">, { tone: string; icon: IconName; eyebrow: string; title: string; body: string }> = {
  payment: { tone: "success", icon: "check", eyebrow: "PAGAMENTO CONFIRMADO", title: "Tudo certo!", body: "Recebemos o pagamento do pedido #FN-1048. Já estamos preparando sua nota fiscal." },
  invoice: { tone: "success", icon: "document", eyebrow: "NOTA EMITIDA", title: "Nota fiscal disponível", body: "A NF-e 000.018.492 foi emitida e já está vinculada ao pedido." },
  receipt: { tone: "success", icon: "shield", eyebrow: "PEDIDO LIBERADO", title: "Comprovante de liberação", body: "Apresente este código no balcão para retirar os materiais do pedido." },
  pending: { tone: "warning", icon: "clock", eyebrow: "AGUARDANDO PAGAMENTO", title: "Pagamento pendente", body: "O pedido #FN-1052 está reservado. Conclua o PIX até hoje, às 17:30." },
  "not-found": { tone: "neutral", icon: "search", eyebrow: "SEM RESULTADOS", title: "Pedido não encontrado", body: "Não localizamos um pedido com esse código. Confira os dados e tente novamente." },
  "already-issued": { tone: "warning", icon: "document", eyebrow: "NOTA JÁ PROCESSADA", title: "Nota já emitida", body: "Este pedido já possui uma nota fiscal. Você pode visualizar ou baixar o documento abaixo." },
};

export function StatePage({ type, go }: { type: keyof typeof stateData; go: (s: Screen) => void }) {
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