import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import "../styling/Profiel.css";

function Profiel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Load profile on page load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("/auth/profile");

        setName(response.data.name || "");
        setEmail(response.data.email || "");
      } catch (error) {
        setMessage("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle update profile
  const handleSave = async () => {
    setMessage("");

    try {
      const body = {
        name,
        email,
        password: password || "",
      };

      await apiClient.put("/auth/profile", body);

      setMessage("Profiel succesvol bijgewerkt!");
      setPassword("");
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Failed to update profile."
      );
    }
  };

  if (loading) return <p className="profile-loading">Profiel laden...</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">Mijn Profiel</h1>

      <div className="profile-card" role="region" aria-label="Profiel instellingen">
        <h2 className="profile-header">Profiel instellingen</h2>
        <p className="profile-subtext">
          Werk je persoonlijke informatie bij of wijzig je wachtwoord.
        </p>

        {message && <p className="profile-message">{message}</p>}

        <div className="input-group">
          <label htmlFor="name">Naam</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jouw naam"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">E-mailadres</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Nieuw wachtwoord (optioneel)</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button
          className="save-btn"
          onClick={handleSave}
          aria-label="Sla wijzigingen op"
        >
          Wijzigingen opslaan
        </button>
      </div>
    </div>
  );
}

export default Profiel;
