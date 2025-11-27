import React, { useEffect, useState, useRef } from "react";
import apiClient from "../api/apiClient";
import { useParams } from "react-router-dom";

const API_BASE_URL = "https://localhost:7239";

export default function LiveAuction() {
  const { id } = useParams();

  const [auction, setAuction] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);

  const pollInterval = useRef<any>(null);

  // Haal veiling gegevens op
  useEffect(() => {
    apiClient.get(`/Auction/${id}`).then((res) => {
      setAuction(res.data);
      setLoading(false);
    });
  }, [id]);

  // ⭐ Start veiling handmatig
  const startAuction = () => {
    apiClient.post(`/Auction/start/${id}`).then((res) => {
      setAuction(res.data);
      setStarted(true);

      // Alleen status + prijs ophalen vanuit backend (geen logica in frontend)
      pollInterval.current = setInterval(() => {
        apiClient.get(`/Auction/${id}`).then((res) => {
          setAuction(res.data);

          if (res.data.isFinished) {
            clearInterval(pollInterval.current);
          }
        });
      }, 250);
    });
  };

  // ⭐ Bied → direct stoppen
  const placeBid = () => {
    apiClient.post(`/Auction/bid/${id}`).then((res) => {
      setAuction(res.data);
      clearInterval(pollInterval.current);
    });
  };

  if (loading || !auction) return <p>Loading...</p>;

  const item = auction.aanvoerderItem;
  const price = auction.currentPrice;

  return (
    <div className="container text-center py-5">
      {/* PRODUCT INFO */}
      <div
        className="card shadow p-4 mb-5 mx-auto"
        style={{ maxWidth: "700px" }}
      >
        {item?.fotoUrl && (
          <img
            src={`${API_BASE_URL}${item.fotoUrl}`}
            alt={item.naam_Product}
            className="img-fluid rounded shadow-sm mb-3"
            style={{ width: "220px" }}
          />
        )}

        <h2 className="fw-bold mb-3">{item?.naam_Product}</h2>

        <div className="row text-start">
          <div className="col-6 mb-2">
            <strong>Soort:</strong> {item?.soort}
          </div>
          <div className="col-6 mb-2">
            <strong>Hoeveelheid:</strong> {item?.hoeveelheid}
          </div>

          {item?.potmaat && (
            <div className="col-6 mb-2">
              <strong>Potmaat:</strong> {item.potmaat}
            </div>
          )}

          {item?.steellengte && (
            <div className="col-6 mb-2">
              <strong>Steellengte:</strong> {item.steellengte}
            </div>
          )}

          <div className="col-6 mb-2">
            <strong>Veildatum:</strong>{" "}
            {new Date(item?.veildatum).toLocaleDateString()}
          </div>

          <div className="col-6 mb-2">
            <strong>Kloklocatie:</strong> {item?.gewensteKloklocatie}
          </div>

          <div className="col-12 mb-2">
            <strong>Aanvoerder:</strong> {item?.aanvoerderName}
          </div>

          <div className="col-12">
            <strong>Minimum prijs:</strong> €{item?.minimumPrijs}
          </div>
        </div>
      </div>

      {/* START KNOP */}
      {!started && !auction.isFinished && (
        <button
          className="btn btn-success fs-3 px-5 py-3 fw-bold"
          onClick={startAuction}
        >
          START VEILING
        </button>
      )}

      {/* LIVE PRIJS */}
      {started && !auction.isFinished && (
        <>
          <h2 className="fw-bold mb-3">
            {Math.max(
              1,
              Math.floor(
                (new Date(auction.endTimeUtc).getTime() - Date.now()) / 1000
              )
            )}
            Product
          </h2>

          <div
            style={{
              fontSize: "7rem",
              fontWeight: "bold",
              backgroundColor: "#f0f0f0",
              padding: "30px",
              borderRadius: "20px",
              width: "500px",
              margin: "0 auto",
            }}
          >
            € {price.toFixed(2)}
          </div>

          <button
            className="btn btn-primary mt-4 px-5 py-3 fs-3 fw-bold"
            onClick={placeBid}
          >
            BIED NU
          </button>
        </>
      )}

      {/* FINISHED */}
      {auction.isFinished && (
        <div className="mt-5">
          <h1 className="text-success fw-bold">Veiling Afgelopen!</h1>
          <h2>Finale prijs: € {auction.finalPrice.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}
