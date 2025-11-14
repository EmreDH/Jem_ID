// src/pages/ProfielPaneel.tsx
import React from "react";
// we'll add this file in the next step
import "../styling/ProfielPaneel.css";

const ProfielPaneel: React.FC = () => {
  return (
    <div className="profiel-page">
      {/* (optional) your existing Navbar sits above this via App layout */}

      <div className="profiel-container">
        <h1 className="profiel-title">Mijn Profiel</h1>

        <div className="profiel-tabs">
          <button className="tab tab-active" type="button">Profiel</button>
          <button className="tab" type="button">Afgelopen veilingen</button>
        </div>

        <section className="profiel-card">
          <div className="profiel-card-header">Profile settings</div>

          <form className="profiel-form" onSubmit={(e) => e.preventDefault()}>
            <label className="form-row">
              <span className="form-label">Name</span>
              <input type="text" placeholder="Naam" />
            </label>

            <label className="form-row">
              <span className="form-label">E-mailadres</span>
              <input type="email" placeholder="voorbeeld@domain.com" />
            </label>

            <label className="form-row">
              <span className="form-label">Password</span>
              <input type="password" placeholder="••••••••" />
            </label>

            <div className="form-actions">
              <button className="save-btn" type="submit">Save Changes</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ProfielPaneel;
