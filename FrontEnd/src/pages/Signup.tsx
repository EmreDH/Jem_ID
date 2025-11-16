import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJson } from "../lib/Http";
import "../styling/AuthPages.css";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !name.trim() || !password.trim()) {
      setError("Alle velden zijn verplicht.");
      return;
    }
    if (password.length < 6) {
      setError("Wachtwoord moet minimaal 6 tekens lang zijn.");
      return;
    }
    if (password !== confirm) {
      setError("Wachtwoorden komen niet overeen.");
      return;
    }

    setLoading(true);
    try {
      await postJson("/api/auth/register", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      navigate("/login", { replace: true, state: { registered: true, email } });
    } catch (err: any) {
      setError(err.message || "Registratie mislukt. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card shadow" role="form" aria-labelledby="signup-title">
        <h2 id="signup-title" className="text-center mb-4 fw-bold text-success">
          Account aanmaken
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
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
            <label htmlFor="name" className="form-label">Naam</label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Voer je naam in"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              placeholder="Voer een wachtwoord in"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirm" className="form-label">Bevestig wachtwoord</label>
            <input
              id="confirm"
              type="password"
              className="form-control"
              placeholder="Herhaal je wachtwoord"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? "Bezig..." : "Account aanmaken"}
          </button>
        </form>

        <p className="text-center mt-4 mb-0 text-muted">
          Heb je al een account?{" "}
          <a href="/login" className="text-success fw-semibold">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
