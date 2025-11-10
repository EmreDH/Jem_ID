import React from "react";
import { Link } from "react-router-dom";
import "../styling/HomePage.css";

function HomePage() {
  return (
    <div
      style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#FFFFFF" }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 60px",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <h2 style={{ margin: 0, color: "#000", fontWeight: "bold" }}>Jem.id</h2>

        <nav style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <Link to="/" style={navLinkStyle}>
            Home
          </Link>
          <Link to="/veilingen" style={navLinkStyle}>
            Veilingen
          </Link>
          <Link to="/aanvoerderItem" style={navLinkStyle}>
            AanvoerderItem
          </Link>
          <Link to="/contact" style={navLinkStyle}>
            Contact
          </Link>
          <Link to="/login" style={navButtonStyle}>
            Login
          </Link>
          <Link
            to="/signup"
            style={{
              ...navButtonStyle,
              backgroundColor: "#7ED957",
              color: "#000",
            }}
          >
            Sign up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px 100px",
          minHeight: "80vh",
        }}
      >
        {/* Tekstgedeelte */}
        <div style={{ maxWidth: "50%" }}>
          <h1
            style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#000" }}
          >
            Leiders in digitale innovatie
            <br />
            voor sierteelt en AGF
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#333", lineHeight: "1.6" }}>
            Onze missie is het ontwikkelen van innovatieve software die
            bedrijven in de tuinbouwsector helpt efficiënter te werken, slimmer
            te plannen en duurzaam te groeien.
          </p>

          <Link to="/dashboard" className="cta-button">
            Ontdek meer
          </Link>
        </div>

        {/* Afbeelding */}
        <div className="hero-image">
          <img
            src="https://lumencms.blob.core.windows.net/media/543/280222nw-jemid-diyou-_AS_7447-WEB-(1).jpg"
            alt="Eigenaar van jem_ID die achter de laptop zit met een koptelefoon op"
          />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
