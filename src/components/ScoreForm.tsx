import { useState } from "react";

interface Props {
  onSearch: (rut: string) => void;
}

export default function ScoreForm({ onSearch }: Props) {
  const [rut, setRut] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(rut);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Consultar Score</h2>
      <input
        type="text"
        placeholder="Ingresa RUT"
        value={rut}
        onChange={(e) => setRut(e.target.value)}
      />
      <button type="submit">Consultar</button>
    </form>
  );
}
