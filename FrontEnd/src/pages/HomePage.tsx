import React from "react";
import { Link } from "react-router-dom";
import "../styling/HomePage.css";

function HomePage() {
  return (
    <div className="homepage-container">

      {/* ======================= HERO ======================= */}
      <section className="hero-section">
        <div className="hero-left">
          <h1>De toekomst van online veilingen voor AGF & sierteelt</h1>
          <p>
            Wij helpen bedrijven slimmer te kopen en verkopen via digitale veilingen. 
            Efficiënt, veilig, betrouwbaar en volledig geautomatiseerd.
          </p>

          <Link to="/veilingen" className="hero-button">
            Bekijk veilingen
          </Link>
        </div>

        <div className="hero-right">
          <img
            src="https://lumencms.blob.core.windows.net/media/543/280222nw-jemid-diyou-_AS_7447-WEB-(1).jpg"
            alt="Online veilingen software"
          />
        </div>
      </section>

      {/* ======================= USP GRID ======================= */}
      <section className="usp-section">
        <h2>Waarom bedrijven kiezen voor ons?</h2>

        <div className="usp-grid">

          <div className="usp-card">
            <span className="usp-icon">⚡</span>
            <h3>Snelle veilingen</h3>
            <p>Realtime biedingen met veilige en stabiele technologie.</p>
          </div>

          <div className="usp-card">
            <span className="usp-icon">📦</span>
            <h3>Betrouwbare producten</h3>
            <p>Rechtstreeks van telers & leveranciers — zonder omwegen.</p>
          </div>

          <div className="usp-card">
            <span className="usp-icon">📊</span>
            <h3>Data-gedreven inzichten</h3>
            <p>Bekijk prijshistorie, trends en dashboards.</p>
          </div>

          <div className="usp-card">
            <span className="usp-icon">🔒</span>
            <h3>Geverifieerde kopers & verkopers</h3>
            <p>Elke gebruiker wordt gecontroleerd om fraude te voorkomen.</p>
          </div>
        </div>
      </section>

      {/* ======================= BUSINESS NUMBERS ======================= */}
      <section className="stats-section">
        <div className="stat-box">
          <h3>1200+</h3>
          <p>Actieve zakelijke gebruikers</p>
        </div>

        <div className="stat-box">
          <h3>350+</h3>
          <p>Dagelijkse veilingen</p>
        </div>

        <div className="stat-box">
          <h3>98%</h3>
          <p>Klanttevredenheid</p>
        </div>
      </section>

      {/* ======================= CTA ======================= */}
      <section className="cta-section">
        <h2>Doe mee en start vandaag met bieden</h2>
        <p>Word onderdeel van het snelst groeiende digitale veilingplatform.</p>

        <Link to="/signup" className="cta-button">
          Account aanmaken
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
