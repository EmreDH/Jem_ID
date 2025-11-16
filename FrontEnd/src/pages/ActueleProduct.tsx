import React, { useEffect, useState } from "react";
import "../styling/ActueleProduct.css";

const ActueleProduct: React.FC = () => {
  // placeholder states
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour
  const [currentBid, setCurrentBid] = useState(125.0);
  const [description, setDescription] = useState("Kist met 10 kg verse tomaten van lokale telers");
  const [isEditing, setIsEditing] = useState(false);

  // countdown timer
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
    <div className="container actuele-container py-5">
      <div className="card shadow-lg actuele-card">
        <div className="card-header bg-success text-white text-center">
          <h3>Actuele Product</h3>
          <p className="mb-0">Live veiling in uitvoering</p>
        </div>

        <div className="card-body">
          {/* Timer */}
          <div className="timer-box text-center mb-4">
            <h5>Resterende tijd</h5>
            <div className="timer-display">{formatTime(timeLeft)}</div>
          </div>

          {/* Product images */}
          <div className="row mb-4">
            <div className="col-md-6 text-center">
              <img src="/images/tomaat1.jpg" alt="Product 1" className="img-fluid rounded" />
            </div>
            <div className="col-md-6 text-center">
              <img src="/images/tomaat2.jpg" alt="Product 2" className="img-fluid rounded" />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h5>Omschrijving</h5>
            {isEditing ? (
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              <p>{description}</p>
            )}
            <button
              className="btn btn-outline-success mt-2"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Opslaan" : "Bewerken"}
            </button>
          </div>

          {/* Auction info */}
          <div className="info-section mb-4">
            <h5>Veilinginformatie</h5>
            <p><strong>Veilingmaster:</strong> Jan de Veilingmeester</p>
            <p><strong>Locatie:</strong> Aalsmeer</p>
          </div>

          {/* Bid section */}
          <div className="bid-section text-center">
            <h5>Huidig bod</h5>
            <h2 className="text-success">€ {currentBid.toFixed(2)}</h2>
            <button
              className="btn btn-success btn-lg mt-3"
              onClick={() => setCurrentBid((b) => b + 2.5)}
            >
              Plaats bod (+€2,50)
            </button>
          </div>
        </div>

        <div className="card-footer text-center bg-light">
          <button className="btn btn-outline-secondary">Volgende Product</button>
        </div>
      </div>
    </div>
  );
};

export default ActueleProduct;
