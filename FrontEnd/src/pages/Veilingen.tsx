// src/pages/Veilingen.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styling/Veilingen.css";
import { getActiveVeilingen, Veiling } from "../api/veilingApi";

const Veilingen: React.FC = () => {
  const [veilingen, setVeilingen] = useState<Veiling[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getActiveVeilingen();
        setVeilingen(data);
        setError(null);
      } catch (err) {
        console.error("Fout bij ophalen veilingen:", err);
        setError("Kon actieve veilingen niet ophalen.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="veiling-container">
        <h1>Actieve Veilingen</h1>
        <p role="status">Veilingen worden geladen...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="veiling-container">
        <h1>Actieve Veilingen</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="veiling-container">
      <h1 tabIndex={0}>Actieve Veilingen</h1>

      {veilingen.length === 0 && (
        <p>Er zijn momenteel geen actieve veilingen.</p>
      )}

      <ul className="veiling-list">
        {veilingen.map((v) => (
          <li className="veiling-item" key={v.auctionId}>
            <img
              src={v.fotoUrl}
              alt={`Foto van ${v.productName}`}
              className="veiling-image"
            />

            <div className="veiling-info">
              <h2>{v.productName}</h2>
              <p className="veiling-description">{v.description}</p>

              <p>
                <strong>Minimumprijs:</strong> €{v.minimumPrijs.toFixed(2)}
              </p>

              <Link
                className="btn-primary"
                to={`/veilingen/${v.auctionId}`}
                aria-label={`Bekijk veiling voor ${v.productName}`}>
                Bekijk details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Veilingen;
