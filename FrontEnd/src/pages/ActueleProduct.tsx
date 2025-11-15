import React, { useState, useEffect } from "react";
import "../styling/ActueleProduct.css";

const ActueleProduct: React.FC = () => {
  // placeholder states for now
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour
  const [currentBid, setCurrentBid] = useState(125.0);
  const [description, setDescription] = useState("Kist met 10 kg verse tomaten van lokale telers");
  const [isEditing, setIsEditing] = useState(false);

  // basic countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (t: number) => {
    const hours = Math.floor(t / 3600);
    const minutes = Math.floor((t % 3600) / 60);
    const seconds = t % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="actuele-container">
      <header className="actuele-header">
        <h2>jem.id</h2>
        <div className="header-menu">
          <span>nl | en</span>
          <button className="menu-btn">menu</button>
        </div>
      </header>

      <main className="actuele-main">
        <section className="omschrijving card">
          <h3>Omschrijving</h3>
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <p>{description}</p>
          )}
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Opslaan" : "Bewerken"}
          </button>
        </section>

        <section className="tijd-datum card">
          <h4>Tijd / Datum</h4>
          <p>{formatTime(timeLeft)}</p>
        </section>

        <section className="afbeeldingen">
          <div className="product-image">Afbeelding product 1</div>
          <div className="product-image">Afbeelding product 2</div>
        </section>

        <section className="beschrijving card">
          <h4>Product-Beschrijving</h4>
          <p>Verse tomaten rechtstreeks van de kweker.</p>
        </section>

        <section className="veiling-info card">
          <h4>Informatie Veilingmaster</h4>
          <p>Naam: Jan de Veilingmeester</p>
          <p>Locatie: Aalsmeer</p>
        </section>

        <section className="bod card">
          <h4>Huidig bod: €{currentBid.toFixed(2)}</h4>
          <button
            className="bid-btn"
            onClick={() => setCurrentBid((b) => b + 2.5)}
          >
            Plaats bod (+€2,50)
          </button>
        </section>

        <button className="volgende-product">Volgende Product</button>
      </main>
    </div>
  );
};

export default ActueleProduct;
