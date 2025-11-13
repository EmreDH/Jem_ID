import React from "react";
import { useState } from "react";
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
      console.log("API_URL =", API_URL);

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

      // Doorsturen op basis van rol
      if (role === "admin") navigate("/dashboard");
      else navigate("/veilingen");

    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Log in</h1>
      <form style={{ maxWidth: 360 }} onSubmit={handleLogin}>
        <label>
          Email<br />
          <input
            type="email"
            style={{ width: "100%", padding: 8, margin: "6px 0" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Wachtwoord<br />
          <input
            type="password"
            style={{ width: "100%", padding: 8, margin: "6px 0" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button style={{ marginTop: 12, padding: "10px 18px" }}>Inloggen</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
