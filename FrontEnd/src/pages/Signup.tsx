import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJson } from "../lib/Http";
import "../styling/Signup.css";

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
    <div className="signup-container">
      <h1 className="signup-title">Account aanmaken</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Naam
          <input
            type="text"
            className="signup-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Wachtwoord
          <input
            type="password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Bevestig wachtwoord
          <input
            type="password"
            className="signup-input"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </label>

        {error && <p className="signup-error">{error}</p>}

        <button className="signup-button" disabled={loading}>
          {loading ? "Bezig..." : "Account aanmaken"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
