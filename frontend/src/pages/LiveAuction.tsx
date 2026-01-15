import React, { useEffect, useState, useRef } from "react";
import apiClient from "../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import { getToken, getRole } from "../lib/Jwt";

const API_BASE_URL = "https://localhost:7239";

export default function LiveAuction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [auction, setAuction] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const pollInterval = useRef<any>(null);

  const token = getToken();
  const role = getRole(); // "admin" | "klant" | "veilingmeester" | ...

  const canStart = role === "veilingmeester" || role === "admin";
  const canBid = role === "klant" || role === "admin";

  // Fetch auction data (public allowed)
  useEffect(() => {
    let cancelled = false;

    apiClient
      .get(`/auction/${id}`)
      .then((res) => {
        if (cancelled) return;
        setAuction(res.data);
        setLoading(false);

        // If auction already started and not finished, start polling
        if (res.data?.startTimeUtc && !res.data?.isFinished) {
          setStarted(true);
          pollInterval.current = setInterval(() => {
            apiClient.get(`/auction/${id}`).then((r) => {
              setAuction(r.data);
              if (r.data?.isFinished) clearInterval(pollInterval.current);
            });
          }, 250);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setLoading(false);
        setErrorMsg(err?.response?.data?.message || "Kon veiling niet laden.");
      });

    return () => {
      cancelled = true;
      if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, [id]);

  const startAuction = async () => {
    setErrorMsg(null);

    if (!canStart) {
      setErrorMsg("Alleen veilingmeester of admin kan een veiling starten.");
      return;
    }

    try {
      const res = await apiClient.post(`/auction/start/${id}`);
      setAuction(res.data);
      setStarted(true);

      pollInterval.current = setInterval(() => {
        apiClient.get(`/auction/${id}`).then((r) => {
          setAuction(r.data);
          if (r.data?.isFinished) clearInterval(pollInterval.current);
        });
      }, 250);
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || "Starten mislukt.");
    }
  };

  const placeBid = async () => {
    setErrorMsg(null);

    // Not logged in? -> must login to bid
    if (!token) {
      navigate("/login", { replace: true, state: { from: `/veiling/live/${id}` } });
      return;
    }

    if (!canBid) {
      setErrorMsg("Alleen klant of admin kan bieden.");
      return;
    }

    try {
      const res = await apiClient.post(`/auction/bid/${id}`);
      setAuction(res.data);
      if (pollInterval.current) clearInterval(pollInterval.current);
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || "Bieden mislukt.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMsg && !auction) return <p>{errorMsg}</p>;
  if (!auction) return <p>Geen veiling gevonden.</p>;

  const item = auction.aanvoerderItem;
  const price = auction.currentPrice ?? 0;

  return (
    <div className="container text-center py-5">
      {errorMsg && (
        <div className="alert alert-warning" role="alert">
          {errorMsg}
        </div>
      )}

      {/* PRODUCT INFO */}
      <div className="card shadow p-4 mb-5 mx-auto" style={{ maxWidth: "700px" }}>
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
            {item?.veildatum ? new Date(item.veildatum).toLocaleDateString() : "-"}
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

      {/* START BUTTON (only veilingmeester/admin) */}
      {!started && !auction.isFinished && canStart && (
        <button className="btn btn-success fs-3 px-5 py-3 fw-bold" onClick={startAuction}>
          START VEILING
        </button>
      )}

      {/* If not allowed to start, show info (optional) */}
      {!started && !auction.isFinished && !canStart && (
        <p className="text-muted">
          {token ? "Je hebt geen rechten om deze veiling te starten." : "Log in als veilingmeester om te starten."}
        </p>
      )}

      {/* LIVE PRICE */}
      {started && !auction.isFinished && (
        <>
          <h2 className="fw-bold mb-3">
            {Math.max(
              1,
              Math.floor((new Date(auction.endTimeUtc).getTime() - Date.now()) / 1000)
            )}{" "}
            seconden
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
            € {Number(price).toFixed(2)}
          </div>

          {/* BID BUTTON (only klant/admin; if not logged in -> login redirect) */}
          {canBid ? (
            <button className="btn btn-primary mt-4 px-5 py-3 fs-3 fw-bold" onClick={placeBid}>
              BIED NU
            </button>
          ) : (
            <button className="btn btn-outline-primary mt-4 px-5 py-3 fs-5" onClick={placeBid}>
              Log in om te bieden
            </button>
          )}
        </>
      )}

      {/* FINISHED */}
      {auction.isFinished && (
        <div className="mt-5">
          <h1 className="text-success fw-bold">Veiling Afgelopen!</h1>
          <h2>Finale prijs: € {Number(auction.finalPrice ?? 0).toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}
