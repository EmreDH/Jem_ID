import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { AanvoerderItemListDTO } from "../../types/AanvoerderItemListDTO";
import { useParams, useNavigate } from "react-router-dom";

const Veilingmaster = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<AanvoerderItemListDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = "https://localhost:7239";

  // GET product details
  useEffect(() => {
    apiClient
      .get(`/AanvoerderItem/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("API ERROR:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // START VEILING
  const handleStartAuction = () => {
    if (!product) return;

    apiClient
      .post(`/Auction/start/${product.id}`)
      .then(() => {
        navigate(`/veiling/live/${product.id}`);
      })
      .catch((err) => console.error("Auction start error:", err));
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!product)
    return <p className="text-center mt-5">Product niet gevonden.</p>;

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 fw-bold">Create Veiling</h1>

      {/* MAIN CARD */}
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "700px" }}>
        <h4 className="fw-semibold mb-3">Product Details</h4>

        <div className="d-flex flex-column align-items-center">
          {product.fotoUrl && (
            <img
              src={`${API_BASE_URL}${product.fotoUrl}`}
              alt={product.naam_Product}
              className="img-fluid rounded shadow-sm mb-3"
              style={{ width: "180px", height: "auto" }}
            />
          )}

          <h3 className="mb-2">{product.naam_Product}</h3>

          <div className="row w-100 mt-3">
            <div className="col-6 mb-3">
              <div className="form-control bg-light p-2">
                <small className="text-muted">Soort</small>
                <div>{product.soort}</div>
              </div>
            </div>

            <div className="col-6 mb-3">
              <div className="form-control bg-light p-2">
                <small className="text-muted">Hoeveelheid</small>
                <div>{product.hoeveelheid}</div>
              </div>
            </div>

            {product.potmaat && (
              <div className="col-6 mb-3">
                <div className="form-control bg-light p-2">
                  <small className="text-muted">Potmaat</small>
                  <div>{product.potmaat}</div>
                </div>
              </div>
            )}

            {product.steellengte && (
              <div className="col-6 mb-3">
                <div className="form-control bg-light p-2">
                  <small className="text-muted">Steellengte</small>
                  <div>{product.steellengte}</div>
                </div>
              </div>
            )}

            <div className="col-6 mb-3">
              <div className="form-control bg-light p-2">
                <small className="text-muted">Veildatum</small>
                <div>{new Date(product.veildatum).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="col-6 mb-3">
              <div className="form-control bg-light p-2">
                <small className="text-muted">Kloklocatie</small>
                <div>{product.gewensteKloklocatie}</div>
              </div>
            </div>

            <div className="col-12 mb-3">
              <div className="form-control bg-light p-2">
                <small className="text-muted">Aanvoerder</small>
                <div>{product.aanvoerderName}</div>
              </div>
            </div>

            <div className="col-12">
              <div className="form-control bg-light p-2">
                <small className="text-muted">Minimum prijs</small>
                <div>€{product.minimumPrijs}</div>
              </div>
            </div>
          </div>
        </div>

        {/* LIVE PRICE PREVIEW */}
        <div className="mt-4 d-flex justify-content-center">
          <div style={{ width: "300px" }}>
            <label className="fw-semibold mb-2 d-block text-center">
              Startprijs
            </label>
            <input
              type="text"
              className="form-control text-center shadow-sm"
              style={{
                width: "100%",
                fontSize: "4rem",
                fontWeight: "bold",
                backgroundColor: "#f8f9fa",
                padding: "0.5rem",
                boxSizing: "border-box",
              }}
              value={product.minimumPrijs.toFixed(2).replace(".", ",")}
              readOnly
            />
          </div>
        </div>

        {/* START BUTTON */}
        <div className="text-center mt-4">
          <button
            className="btn btn-success btn-lg px-5"
            onClick={handleStartAuction}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Veilingmaster;
