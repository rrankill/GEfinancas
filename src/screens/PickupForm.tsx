import type { Screen } from "../types";
import { ordersLines } from "../data";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import { Money } from "../components/Money";
import { ScreenShell } from "../components/ScreenShell";

export function PickupForm({ type, go }: { type: "third-party" | "partial" | "cancel"; go: (s: Screen) => void }) {
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
