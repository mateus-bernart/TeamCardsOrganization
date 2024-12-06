import "./campo.css";
import React from "react";

interface CampoProps {
  aoAlterado: (valor: string) => void;
  label: string;
  placeholder: string;
  valor: string;
  obrigatorio?: boolean;
  type?: "text" | "password" | "date" | "email" | "number" | "color";
}

const Campo = ({
  type = "text",
  label,
  placeholder,
  valor,
  aoAlterado,
  obrigatorio = false,
}: CampoProps) => {
  return (
    <div className={`campo campo-${type}`}>
      <label>{label}</label>
      <input
        type={type}
        value={valor}
        onChange={(evento) => aoAlterado(evento.target.value)}
        required={obrigatorio}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Campo;
