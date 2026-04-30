// Exemplo de uso — MeuFormulario.jsx
import { useState } from "react";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";

const TIPO_OPTIONS = [
  { label: "Operação", value: "Operação" },
  { label: "TSSR",     value: "TSSR"     },
];

export function MeuFormulario() {
  const [tipo, setTipo] = useState("");

  async function handleSubmit() {
    await fetch("/api/seu-endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo }), // envia "Operação" ou "TSSR"
    });
  }

  return (
    <div>
      <Dropdown
        options={TIPO_OPTIONS}
        value={tipo}
        placeholder="Selecionar..."
        onChange={setTipo}
      />
      <button onClick={handleSubmit} disabled={!tipo}>
        Enviar
      </button>
    </div>
  );
}
