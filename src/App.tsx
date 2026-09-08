import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";

import LoginForm from "./components/LoginForm";

function App() {
  const handleLogin = (username: string, password: string) => {
    console.log(username, password);
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default App;
