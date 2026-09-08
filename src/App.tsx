import { useState } from "react";
import LoginForm from "./components/LoginForm";
import ScoreForm from "./components/ScoreForm";

interface ScoreResult {
  rut: string;
  score: number;
  fecha: string;
}

function getScoreClass(score: number) {
  if (score >= 70) return "high";
  if (score >= 40) return "mid";
  return "low";
}

function getScoreLabel(score: number) {
  if (score >= 70) return "Riesgo bajo";
  if (score >= 40) return "Riesgo medio";
  return "Riesgo alto";
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
        setError("Credenciales inválidas");
        return;
      }
      const data = await res.json();
      setToken(data.token);
      setError(null);
    } catch {
      setError("Error de servidor");
    }
  };

  const handleSearch = async (rut: string) => {
    try {
      const res = await fetch(`http://localhost:3000/score/${rut}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 403) {
        setError("Acceso denegado: solo puedes consultar tu propio RUT");
        return;
      }
      if (!res.ok) {
        setError("Error al obtener el score");
        return;
      }
      const data = await res.json();
      setScoreResult(data);
      setError(null);
    } catch {
      setError("Error de servidor");
    }
  };

  if (token) {
    const cls = scoreResult ? getScoreClass(scoreResult.score) : "";
    return (
      <div className="score-card">
        <div>
          <p className="brand">ProntoPaga</p>
          <h2>Consulta de Score</h2>
        </div>
        <ScoreForm onSearch={handleSearch} />
        {error && <p className="error">{error}</p>}
        {scoreResult && (
          <>
            <div className="divider" />
            <div className="score-gauge">
              <p className="score-label">Score financiero</p>
              <p className={`score-number ${cls}`}>{scoreResult.score}</p>
              <div className="score-bar-track">
                <div
                  className={`score-bar-fill ${cls}`}
                  style={{ width: `${scoreResult.score}%` }}
                />
              </div>
              <p className="score-label">{getScoreLabel(scoreResult.score)}</p>
            </div>
            <div className="score-details">
              <div className="detail-row">
                <span className="detail-label">RUT</span>
                <span className="detail-value">{scoreResult.rut}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Fecha consulta</span>
                <span className="detail-value">
                  {new Date(scoreResult.fecha).toLocaleString("es-CL")}
                </span>
              </div>
            </div>
          </>
        )}
        <button
          className="logout-btn"
          onClick={() => {
            setToken(null);
            setScoreResult(null);
          }}
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <>
      <LoginForm onLogin={handleLogin} />
      {error && (
        <p
          className="error"
          style={{ maxWidth: 420, width: "100%", marginTop: 12 }}
        >
          {error}
        </p>
      )}
    </>
  );
}

export default App;
