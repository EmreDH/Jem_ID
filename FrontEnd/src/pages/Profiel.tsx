import React from "react";
import "../styling/Profiel.css";

function Profiel() {
  return (
    <div className="profile-container">
      <h1 className="profile-title">Mijn Profiel</h1>

      <div className="profile-card">
        <h2 className="profile-header">Profile settings</h2>
        <p className="profile-subtext">
          Update your personal information or change your password.
        </p>

        <div className="input-group">
          <label>Name</label>
          <input type="text" placeholder="Your name" />
        </div>

        <div className="input-group">
          <label>E-mailadres</label>
          <input type="email" placeholder="email@example.com" />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="********" />
        </div>

        <button className="save-btn">Save Changes</button>
      </div>
    </div>
  );
}

export default Profiel;
