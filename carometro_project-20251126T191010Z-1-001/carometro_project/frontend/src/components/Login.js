import React, { useState } from "react";
import { login } from "../services/api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const r = await login(username, password);
      onLogin(r.token, r.username);
    } catch (err) {
      setErr("Usuário ou senha incorretos");
    }
  }

  const styles = {
    container: {
      width: "90%",
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f3f4f6",
      borderRadius: 10,
      padding: 16,
    },
    card: {
      background: "white",
      width: "80%",
      maxWidth: 300,         // REDUZIU DE 380 → 300
      padding: "24px 20px",  // REDUZIU PADDING
      borderRadius: 10,
      boxShadow: "0 4px 12px rgba(0,0,0,0.10)", // SOMBRA MAIS LEVE
      display: "flex",
      flexDirection: "column",
      gap: 14,
    },
    title: {
      fontSize: 20,          // REDUZIU TAMANHO DO TÍTULO
      fontWeight: 600,
      textAlign: "center",
      color: "#1f2937",
      marginBottom: 6,
    },
    input: {
      width: "90%",
      padding: "10px 12px",  // REDUZIU ALTURA
      fontSize: 14,
      border: "1px solid #d1d5db",
      borderRadius: 6,
      outline: "none",
      transition: "0.2s",
    },
    button: {
      width: "100%",
      padding: "10px 12px",  // REDUZIU ALTURA
      background: "#059669",
      color: "white",
      fontSize: 15,
      fontWeight: 600,
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      transition: "0.2s",
    },
    error: {
      color: "red",
      fontSize: 13,
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={submit}>
        <div style={styles.title}>Login</div>

        <input
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = "#059669";
            e.target.style.boxShadow = "0 0 3px rgba(37, 99, 235, 0.4)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db";
            e.target.style.boxShadow = "none";
          }}
          required
        />

        <input
          style={styles.input}
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = "#059669";
            e.target.style.boxShadow = "0 0 3px rgba(37, 99, 235, 0.4)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db";
            e.target.style.boxShadow = "none";
          }}
          required
        />

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.background = "#047857")}
          onMouseOut={(e) => (e.target.style.background = "#059669")}
        >
          Entrar
        </button>

        {err && <div style={styles.error}>{err}</div>}
      </form>
    </div>
  );
}
