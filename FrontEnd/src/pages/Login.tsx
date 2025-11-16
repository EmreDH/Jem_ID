import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../lib/Jwt";
import { API_URL } from "../lib/Config";
import "../styling/AuthPages.css";

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
    <div className="auth-container">
      <div className="auth-card shadow" role="form" aria-labelledby="login-title">
        <h2 id="login-title" className="text-center mb-4 fw-bold text-success">
          Inloggen
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Voer je e-mailadres in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Wachtwoord</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Voer je wachtwoord in"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <a href="/forgot-password" className="text-success small fw-semibold">
              Wachtwoord vergeten?
            </a>
          </div>

          <button type="submit" className="btn btn-success w-100 py-2 fw-semibold">
            Inloggen
          </button>
        </form>

        <p className="text-center mt-4 mb-0 text-muted">
          Nog geen account?{" "}
          <a href="/signup" className="text-success fw-semibold">
            Maak er een aan
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
