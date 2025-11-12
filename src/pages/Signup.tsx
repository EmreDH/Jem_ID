import React, { useState } from "react";
import { Helmet } from "react-helmet";
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
    <div className="signup-container" style={{ fontFamily: "Arial, sans-serif" }}>
     
      <Helmet>
        <title>Jem.ID | Registreren</title>
        <meta
          name="description"
          content="Maak een nieuw Jem.ID account aan om toegang te krijgen tot je dashboard en veilingen."
        />
      </Helmet>

      <h1 tabIndex={0}>Account aanmaken</h1>

      
      <form
        className="signup-form"
        onSubmit={handleSubmit}
        aria-label="Registratieformulier"
        aria-describedby="signup-description"
      >
        <p id="signup-description">
          Vul de velden hieronder in om een nieuw account aan te maken.
        </p>

        <label htmlFor="email">E-mailadres</label>
        <input
          id="email"
          type="email"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required="true"
          aria-label="E-mailadres invoeren"
          required
        />

        <label htmlFor="name">Naam</label>
        <input
          id="name"
          type="text"
          className="signup-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-required="true"
          aria-label="Naam invoeren"
          required
        />

        <label htmlFor="password">Wachtwoord</label>
        <input
          id="password"
          type="password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-required="true"
          aria-label="Wachtwoord invoeren"
          required
        />

        <label htmlFor="confirm">Bevestig wachtwoord</label>
        <input
          id="confirm"
          type="password"
          className="signup-input"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          aria-required="true"
          aria-label="Bevestig wachtwoord invoeren"
          required
        />

       
        {error && (
          <p
            className="signup-error"
            role="alert"
            aria-live="assertive"
            style={{ color: "red", marginTop: "10px" }}
          >
            {error}
          </p>
        )}

       
        <button
          className="signup-button"
          type="submit"
          disabled={loading}
          aria-label="Maak een nieuw Jem.ID account aan"
        >
          {loading ? "Bezig..." : "Account aanmaken"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
