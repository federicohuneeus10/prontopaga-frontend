import { useState } from "react";
import LoginForm from "./components/LoginForm";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  if (token) {
    return <div>Logged in! Token stored.</div>;
  }

  return (
    <>
      <LoginForm onLogin={handleLogin} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default App;
