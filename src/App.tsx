import { useState } from "react";
import LoginForm from "./components/LoginForm";
import ScoreForm from "./components/ScoreForm";

interface ScoreResult {
  rut: string;
  score: number;
  fecha: string;
}

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);

  const handleLogin = async (username: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Invalid credentials");
        return;
      }

      const data = await res.json();
      setToken(data.token);
      setError(null);
    } catch {
      setError("Server error");
    }
  };

  const handleSearch = async (rut: string) => {
    try {
      const res = await fetch(`http://localhost:3000/score/${rut}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 403) {
        setError("Access denied: you can only query your own RUT");
        return;
      }

      if (!res.ok) {
        setError("Error fetching score");
        return;
      }

      const data = await res.json();
      setScoreResult(data);
      setError(null);
    } catch {
      setError("Server error");
    }
  };

  if (token) {
    return (
      <>
        <ScoreForm onSearch={handleSearch} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {scoreResult && (
          <div>
            <p>RUT: {scoreResult.rut}</p>
            <p>Score: {scoreResult.score}</p>
            <p>Fecha: {scoreResult.fecha}</p>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <LoginForm onLogin={handleLogin} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default App;
