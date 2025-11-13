import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../styling/HomePage.css";

function HomePage() {
    return (
        <div className="homepage">
            <Helmet>
                <title>Jem.ID | Startpagina</title>
                <meta
                    name="description"
                    content="Welkom bij Jem.ID – Leiders in digitale innovatie voor sierteelt en AGF."
                />
            </Helmet>

            <header className="header" role="banner">
                <h1 className="logo">Jem.ID</h1>

                <nav className="nav" aria-label="Hoofd navigatie">
  <Link to="/" className="nav-link" aria-label="Ga naar startpagina">
    Home
  </Link>
  <Link to="/veilingen" className="nav-link" aria-label="Bekijk veilingen">
    Veilingen
  </Link>
  <Link to="/contact" className="nav-link" aria-label="Neem contact op met Jem.ID">
    Contact
  </Link>
  <Link to="/login" className="nav-button black" aria-label="Inloggen op Jem.ID">
    Login
  </Link>
  <Link to="/signup" className="nav-button green" aria-label="Meld je aan bij Jem.ID">
    Sign up
  </Link>
</nav>

            </header>

            <main className="hero">
                <div className="hero-text">
                    <h2 tabIndex={0}>
                        Leiders in digitale innovatie<br />voor sierteelt en AGF
                    </h2>
                    <p>
                        Onze missie is het ontwikkelen van innovatieve software die bedrijven in de tuinbouwsector helpt
                        efficiënter te werken, slimmer te plannen en duurzaam te groeien.
                    </p>

                    <Link
  to="/dashboard"
  className="cta-button"
  aria-label="Ontdek meer over Jem.ID en onze digitale innovatie"
>
  Ontdek meer
</Link>

                </div>

                <div className="hero-image">
                    <img
                        src="https://lumencms.blob.core.windows.net/media/543/280222nw-jemid-diyou-_AS_7447-WEB-(1).jpg"
                        alt="Eigenaar van Jem.ID die achter de laptop zit met een koptelefoon op"
                    />
                </div>
            </main>
        </div>
    );
}

export default HomePage;
