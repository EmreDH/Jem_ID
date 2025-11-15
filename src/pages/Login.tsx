import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../lib/Jwt";
import { API_URL } from "../lib/Config";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Ongeldige inloggegevens");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      const payload = parseJwt(data.token);
      const role = payload?.role?.toLowerCase();

      if (role === "admin") navigate("/dashboard");
      else navigate("/veilingen");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "400px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* 🧠 Titel & beschrijving */}
      <Helmet>
        <title>Jem.ID | Login</title>
        <meta
          name="description"
          content="Log in om toegang te krijgen tot je Jem.ID dashboard."
        />
      </Helmet>

      <h1 tabIndex={0}>Log in</h1>

      {/* 📋 Formulier met aria-label */}
      <form
        onSubmit={handleLogin}
        aria-label="Inlogformulier"
        aria-describedby="login-description"
      >
        <p id="login-description">
          Vul je e-mailadres en wachtwoord in om in te loggen.
        </p>

        <label htmlFor="email">E-mailadres</label>
        <input
          id="email"
          type="email"
          style={{
            width: "100%",
            padding: 8,
            margin: "6px 0",
            outline: "none",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
        />

        <label htmlFor="password">Wachtwoord</label>
        <input
          id="password"
          type="password"
          style={{
            width: "100%",
            padding: 8,
            margin: "6px 0",
            outline: "none",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-required="true"
        />

        {/* 🔘 Knop met duidelijke naam */}
        <button
          type="submit"
          style={{
            marginTop: 12,
            padding: "10px 18px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
          aria-label="Log in op je Jem.ID account"
        >
          Inloggen
        </button>

        {/* ⚠️ Errormelding voor screenreaders */}
        {error && (
          <p
            style={{ color: "red", marginTop: "10px" }}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
