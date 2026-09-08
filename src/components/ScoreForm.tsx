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
    <form onSubmit={handleSubmit} style={{ marginBottom: 0 }}>
      <div className="form-group">
        <label>RUT a consultar</label>
        <input
          type="text"
          placeholder="ej: 21.034.134-2"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />
      </div>
      <button type="submit">Consultar score</button>
    </form>
  );
}
