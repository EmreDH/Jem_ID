import React from "react";
import { Link } from "react-router-dom";
import "../styling/HomePage.css";
import heroImg from "../assets/plant-auction.jpg";


function HomePage() {
  return (
    <div className="homepage-container">
      {/* ======================= HERO ======================= */}
      <section className="hero-section">
        {/* background image layer */}
        <div
  className="hero-bg"
  aria-hidden="true"
  style={{ backgroundImage: `url(${heroImg})` }}
/>


        {/* overlay headline card */}
        <div className="hero-overlay-card">
          <h1>De toekomst van online veilingen voor AGF & sierteelt</h1>
          <p>
            Wij helpen bedrijven slimmer te kopen en verkopen via digitale veilingen.
            Efficiënt, veilig, betrouwbaar en volledig geautomatiseerd.
          </p>

          <Link to="/veilingen" className="hero-button">
            Bekijk veilingen
          </Link>
        </div>

        {/* overlapping USP cards (like the screenshot) */}
        <div className="hero-bottom-cards">
          <div className="hero-mini-card">
            <h3>Supplying</h3>
            <p>Lees meer over supplying.</p>
            <Link to="/supplying" className="mini-link">More about supplying →</Link>
          </div>

          <div className="hero-mini-card">
            <h3>Purchasing</h3>
            <p>Lees meer over purchasing.</p>
            <Link to="/purchasing" className="mini-link">More about purchasing →</Link>
          </div>
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
