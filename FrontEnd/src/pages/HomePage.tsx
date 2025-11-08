import React from "react";
import { Link } from "react-router-dom";
import "../styling/HomePage.css";

function HomePage() {
    return (
        <div className="homepage">
            {/* Header */}
            <header className="header">
                <h2 className="logo">Jem.id</h2>

                <nav className="nav">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <Link to="/veilingen" className="nav-link">
                        Veilingen
                    </Link>
                    <Link to="/contact" className="nav-link">
                        Contact
                    </Link>
                    <Link to="/login" className="nav-button black">
                        Login
                    </Link>
                    <Link to="/signup" className="nav-button green">
                        Sign up
                    </Link>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="hero">
                {/* Tekstgedeelte */}
                <div className="hero-text">
                    <h1>Leiders in digitale innovatie<br />voor sierteelt en AGF</h1>
                    <p>
                        Onze missie is het ontwikkelen van innovatieve software die bedrijven in de tuinbouwsector helpt
                        efficiënter te werken, slimmer te plannen en duurzaam te groeien.
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
