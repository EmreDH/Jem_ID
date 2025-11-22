import React, { useEffect, useState } from "react";
import { getJsonAuth } from "../lib/Http";
import "../styling/UpcomingProducts.css";

type ClockLocation = "Naaldwijk" | "Aalsmeer" | "Rijnsburg" | "Eelde";

type UpcomingProductDto = {
  id: number;
  fotoUrl?: string;
  naam_Product: string;
  soort: string;
  potmaat?: string | null;
  steellengte?: string | null;
  hoeveelheid: number;
  minimumPrijs: number;
  gewensteKloklocatie: string;
};

type UpcomingProduct = {
  id: number;
  fotoUrl?: string;
  soort: string;
  potmaat?: string | null;
  steellengte?: string | null;
  hoeveelheid: number;
  minimumPrijs: number;
  kloklocatie: ClockLocation;
  aanvoerder: string;
};

const API_BASE_URL = "https://localhost:7239";

function UpcomingProducts() {
  const [products, setProducts] = useState<UpcomingProduct[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<"" | ClockLocation>("");

  useEffect(() => {
    async function fetchUpcomingProducts() {
      try {
        const locationParam = location ? `?location=${location}` : "";
        const dtoList = await getJsonAuth<UpcomingProductDto[]>(
          `/api/AanvoerderItem/upcoming-products${locationParam}`
        );

        const mapped: UpcomingProduct[] = dtoList.map((dto) => ({
          id: dto.id,
          fotoUrl: dto.fotoUrl,
          soort: dto.soort,
          potmaat: dto.potmaat,
          steellengte: dto.steellengte,
          hoeveelheid: dto.hoeveelheid,
          minimumPrijs: dto.minimumPrijs,
          kloklocatie: dto.gewensteKloklocatie as ClockLocation,
          aanvoerder: dto.naam_Product,
        }));

        setProducts(mapped);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchUpcomingProducts();
  }, [location]);

  const filtered = products.filter(
    (p) =>
      (!location || p.kloklocatie === location) &&
      (search.trim().length === 0 ||
        p.soort.toLowerCase().includes(search.toLowerCase()) ||
        p.aanvoerder.toLowerCase().includes(search.toLowerCase()))
  );

  function handlePlan(id: number) {
    console.log("Plan veiling (alleen UI) voor id:", id);
    alert("Plan-veiling actie wordt later gekoppeld aan de backend.");
  }

  return (
    <div className="up-container">
      <div className="up-header">
        <h1>Aankomende producten</h1>
        <p className="up-subtitle">
          Overzicht van producten die de veilmeester kan inplannen en live kan
          zetten.
        </p>
      </div>

      <div className="up-filters">
        <input
          className="up-input"
          placeholder="Zoek op soort of aanvoerder..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label className="up-filter">
          Kloklocatie
          <select
            className="up-input"
            value={location}
            onChange={(e) => setLocation(e.target.value as ClockLocation | "")}>
            <option value="">Alle</option>
            <option value="Naaldwijk">Naaldwijk</option>
            <option value="Aalsmeer">Aalsmeer</option>
            <option value="Rijnsburg">Rijnsburg</option>
            <option value="Eelde">Eelde</option>
          </select>
        </label>
      </div>

      <div className="up-table-wrap">
        <table className="up-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Soort</th>
              <th>Potmaat / Steellengte</th>
              <th>Hoeveelheid</th>
              <th>Min. prijs</th>
              <th>Kloklocatie</th>
              <th>Aanvoerder</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="up-empty">
                  Geen resultaten voor de huidige filters
                </td>
              </tr>
            )}

            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.fotoUrl ? (
                    <img
                      src={`${API_BASE_URL}${p.fotoUrl}`}
                      alt={p.soort}
                      className="up-thumb"
                    />
                  ) : (
                    <div className="up-thumb up-thumb-empty" />
                  )}
                </td>
                <td>{p.soort}</td>
                <td>{p.potmaat ?? p.steellengte ?? "-"}</td>
                <td>{p.hoeveelheid}</td>
                <td>€ {p.minimumPrijs.toFixed(2)}</td>
                <td>{p.kloklocatie}</td>
                <td>{p.aanvoerder}</td>
                <td>
                  <div className="up-actions">
                    <button
                      className="up-btn up-btn-secondary"
                      onClick={() => handlePlan(p.id)}>
                      Plan
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UpcomingProducts;
