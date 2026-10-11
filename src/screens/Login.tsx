import type { FormEvent } from "react";
import type { Screen } from "../types";
import { Brand } from "../components/brand";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

export function Login({ go }: { go: (s: Screen) => void }) {
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