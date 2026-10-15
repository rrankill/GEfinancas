import type { IconName, Screen } from "../types";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import { ScreenShell } from "../components/ScreenShell";

const operations: { screen: Screen; icon: IconName; title: string; text: string; tone: string }[] = [
  { screen: "payment", icon: "check", title: "Confirmação de pagamento", text: "Pagamento aprovado e confirmado", tone: "green" },
  { screen: "invoice", icon: "document", title: "Emissão da nota", text: "NF-e pronta para download", tone: "green" },
  { screen: "receipt", icon: "shield", title: "Comprovante de liberação", text: "Código para retirada no balcão", tone: "orange" },
  { screen: "already-issued", icon: "receipt", title: "Nota já emitida", text: "Documento processado anteriormente", tone: "gray" },
  { screen: "third-party", icon: "user", title: "Retirada por outra pessoa", text: "Autorizar um novo responsável", tone: "gray" },
  { screen: "partial", icon: "bag", title: "Retirada parcial", text: "Selecionar itens para retirada", tone: "gray" },
  { screen: "cancel", icon: "close", title: "Cancelamento ou devolução", text: "Solicitar atendimento", tone: "gray" },
];

export function More({ go }: { go: (s: Screen) => void }) {
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
