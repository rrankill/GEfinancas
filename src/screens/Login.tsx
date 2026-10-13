import { useState, type FormEvent } from "react";
import type { Screen } from "../types";
import { Brand } from "../components/brand";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

const EMAIL_VALIDO = "operacoes@ferronorte.com.br";
const SENHA_VALIDA = "12345678";

type FormErrors = { email?: string; password?: string; form?: string };

export function Login({ go }: { go: (s: Screen) => void }) {
  const [email, setEmail] = useState("operacoes@ferronorte.com.br");
  const [password, setPassword] = useState("12345678");
  const [errors, setErrors] = useState<FormErrors>({});

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const newErrors: FormErrors = {};

    if (!email.trim()) newErrors.email = "Informe o e-mail.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Digite um e-mail válido.";

    if (!password) newErrors.password = "Informe a senha.";
    else if (password.length < 6) newErrors.password = "A senha deve ter pelo menos 6 caracteres.";

    if (Object.keys(newErrors).length === 0) {
      const emailOk = email.trim().toLowerCase() === EMAIL_VALIDO;
      const passwordOk = password === SENHA_VALIDA;
      if (!emailOk || !passwordOk) newErrors.form = "E-mail ou senha incorretos.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) go("home");
  };

  return (
    <div className="login-screen">
      <div className="login-art">
        <Brand />
        <div className="steel-lines"><i /><i /><i /><i /></div>
        <div className="login-copy"><span>GESTÃO DO FUNCIONÁRIO</span><h1>Operação segura,<br />do pedido à entrega.</h1></div>
      </div>
      <form className="login-form" onSubmit={submit} noValidate>
        <div><h2>Acesso interno</h2><p>Entre com suas credenciais corporativas da Ferro Norte.</p></div>
        <label>E-mail corporativo
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <small className="field-error">{errors.email}</small>}
        </label>
        <label>Senha
          <div className="password-field">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Icon name="shield" size={18} />
          </div>
          {errors.password && <small className="field-error">{errors.password}</small>}
        </label>
        <button className="forgot" type="button">Esqueci minha senha</button>
        {errors.form && <small className="field-error">{errors.form}</small>}
        <Button type="submit">Entrar</Button>
        <small className="secure-note"><Icon name="shield" size={15} /> Acesso exclusivo para funcionários</small>
      </form>
    </div>
  );
} 