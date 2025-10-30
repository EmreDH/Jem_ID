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
                        src="https://via.placeholder.com/500x350.png?text=Jem.ID+Innovation"
                        alt="Digitale innovatie"
                    />
                </div>
            </main>
        </div>
    );
}

export default HomePage;
