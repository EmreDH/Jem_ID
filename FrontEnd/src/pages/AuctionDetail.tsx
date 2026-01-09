import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJsonAuth } from "../lib/Http";
import type { AuctionDetail } from "../../types/AuctionDetailDTO";
import "../styling/AuctionDetail.css";

const API_BASE_URL = "https://localhost:7239";

function AuctionDetailPage() {
  const { auctionId } = useParams<{ auctionId: string }>();
  const [data, setData] = useState<AuctionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetail() {
      if (!auctionId) return;

      try {
        setLoading(true);
        const result = await getJsonAuth<AuctionDetail>(
          `/api/Auction/detail/${auctionId}`
        );
        setData(result);
        setError(null);
      } catch (err) {
        console.error("Error fetching auction detail:", err);
        setError("Kon veilingdetails niet ophalen.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [auctionId]);

  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!data) return;

    setCurrentPrice(data.startPrijs);

    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        if (prev === null) return prev;

        const next = prev - data.stapBedrag;

        if (next <= data.minimalePrijs) {
          clearInterval(interval);
          return data.minimalePrijs;
        }

        return next;
      });
    }, data.stapSeconden * 500);

    return () => clearInterval(interval);
  }, [data]);

  if (loading) return <div className="page-container">Laden...</div>;
  if (error) return <div className="page-container">{error}</div>;
  if (!data)
    return <div className="page-container">Geen veiling gevonden.</div>;
  if (currentPrice === null)
    return <div className="page-container">Prijs wordt geladen...</div>;

  return (
    <div className="page-container veiling-detail">
      <div className="veiling-detail-card">
        <div className="veiling-detail-card-header">
          <h2>Actuele Product</h2>
          <p>Live veiling in uitvoering</p>
        </div>

        <div className="veiling-detail-card-body">
          <div className="vd-product-image">
            <img
              src={`${API_BASE_URL}${data.fotoUrl}`}
              alt={data.naam_Product}
            />
          </div>

          <h1 className="vd-title">{data.naam_Product}</h1>
          <p className="vd-subtitle">
            {data.soort} • {data.hoeveelheid} stuks • {data.kloklocatie}
          </p>

          <div className="vd-info-box">
            <p>
              <strong>Aanvoerder:</strong> {data.aanvoerderName}
            </p>
            <p>
              <strong>Potmaat:</strong> {data.potmaat ?? "-"}
            </p>
            <p>
              <strong>Steellengte:</strong> {data.steellengte ?? "-"}
            </p>
          </div>

          <div className="vd-price-row">
            <span className="vd-price-label">Huidige prijs</span>
            <span className="vd-price-value">€ {currentPrice.toFixed(2)}</span>

            <p className="clock-extra">
              Start: € {data.startPrijs.toFixed(2)} • Min: €{" "}
              {data.minimalePrijs.toFixed(2)}
            </p>
            <p className="clock-extra">
              Daling: € {data.stapBedrag.toFixed(2)} elke {data.stapSeconden}{" "}
              sec
            </p>

            {data.isGesloten ? (
              <span className="vd-status-closed">
                Veiling gesloten{" "}
                {data.winnaarNaam && `– gewonnen door ${data.winnaarNaam}`}
              </span>
            ) : (
              <button
                className="vd-primary-btn"
                onClick={() =>
                  alert(
                    `Hier komt later de bied-actie (prijs: € ${currentPrice.toFixed(
                      2
                    )})`
                  )
                }>
                Plaats bod voor € {currentPrice.toFixed(2)}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionDetailPage;
