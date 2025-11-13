import React, { useRef, useState } from "react";
import { createAanvoerderItem } from "../api/aanvoerderItemApi";
import { getToken } from "../lib/Jwt";

export default function AanvoerderItem() {
  const [images, setImages] = useState<(File | null)[]>(Array(5).fill(null));
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [formData, setFormData] = useState({
    naam_Product: "",
    soort: "",
    potmaat: "",
    steellengte: "",
    hoeveelheid: "",
    minimumPrijs: "",
    gewensteKloklocatie: "",
    veildatum: "",
  });

  // ⚙️ Afbeelding kiezen
  const handleImageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  const handleDivClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  // ⚙️ Tekstinvoer
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ⚙️ Versturen naar backend
  const handleSubmit = async () => {
    try {
      // 🔹 Gebruik de eerste afbeelding als FotoUrl (of pas aan voor meerdere)
      const foto = images.find((img) => img !== null);

      if (!foto) {
        alert("Kies minstens één foto.");
        return;
      }

      const data = new FormData();
      data.append("foto", foto);
      data.append("Naam_Product", formData.naam_Product);
      data.append("Soort", formData.soort);
      data.append("Potmaat", formData.potmaat);
      data.append("Steellengte", formData.steellengte);
      data.append("Hoeveelheid", formData.hoeveelheid);
      data.append("MinimumPrijs", formData.minimumPrijs);
      data.append("GewensteKloklocatie", formData.gewensteKloklocatie);
      data.append("Veildatum", formData.veildatum);

      const token = getToken();
      if (!token) {
        alert("Je bent niet ingelogd!");
        return;
      }

      const response = await createAanvoerderItem(data, token);

      alert("✅ Product succesvol opgeslagen!");
      console.log("Response:", response.data);
    } catch (error: any) {
      console.error("❌ Fout bij opslaan:", error);
      alert("Er ging iets mis bij het opslaan.");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="w-75 text-start mb-3">
        <h1>Add Product</h1>
      </div>

      {/* FOTO UPLOAD */}
      <div className="border border-dark w-75 p-4 mb-3 shadow bg-light">
        <p className="align-self-start">Foto’s*</p>
        <div className="d-flex gap-5">
          {[1, 2, 3, 4, 5].map((i, index) => (
            <div key={i} className="position-relative">
              <div
                className="border border-dark d-flex justify-content-center align-items-center shadow"
                style={{ width: "80px", height: "80px", cursor: "pointer" }}
                onClick={() => handleDivClick(index)}
              >
                {images[index] ? (
                  <img
                    src={URL.createObjectURL(images[index]!)}
                    alt={`Foto ${i}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span>Image</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={(el) => (fileInputRefs.current[index] = el)}
                onChange={(e) => handleImageChange(index, e)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="border border-dark w-75 p-4 mb-3 shadow bg-light">
        <h4 className="mb-4">Product Details</h4>

        <div className="row mb-3">
          <div className="col-3">Naam Product</div>
          <div className="col-3">
            <input
              name="naam_Product"
              className="form-control"
              value={formData.naam_Product}
              onChange={handleChange}
            />
          </div>

          <div className="col-3">Veildatum</div>
          <div className="col-3">
            <input
              name="veildatum"
              type="date"
              className="form-control"
              value={formData.veildatum}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-3">Soort</div>
          <div className="col-3">
            <input
              name="soort"
              className="form-control"
              value={formData.soort}
              onChange={handleChange}
            />
          </div>

          <div className="col-3">Potmaat</div>
          <div className="col-3">
            <input
              name="potmaat"
              className="form-control"
              value={formData.potmaat}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-3">Hoeveelheid</div>
          <div className="col-3">
            <input
              name="hoeveelheid"
              type="number"
              className="form-control"
              value={formData.hoeveelheid}
              onChange={handleChange}
            />
          </div>

          <div className="col-3">Minimum prijs</div>
          <div className="col-3">
            <input
              name="minimumPrijs"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="form-control"
              value={formData.minimumPrijs}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-3">Steellengte</div>
          <div className="col-3">
            <input
              name="steellengte"
              className="form-control"
              value={formData.steellengte}
              onChange={handleChange}
            />
          </div>

          <div className="col-3">Gewenste kloklocatie</div>
          <div className="col-3">
            <select
              name="gewensteKloklocatie"
              className="form-select"
              value={formData.gewensteKloklocatie}
              onChange={handleChange}
            >
              <option value="">-- Kies locatie --</option>
              <option value="Aalsmeer">Aalsmeer</option>
              <option value="Rijnsburg">Rijnsburg</option>
              <option value="Naaldwijk">Naaldwijk</option>
              <option value="Eelde">Eelde</option>
            </select>
          </div>
        </div>
      </div>

      {/* OPSLAAN KNOP */}
      <div className="d-flex justify-content-end w-75">
        <button
          onClick={handleSubmit}
          className="btn btn-warning fw-bold shadow"
          style={{ backgroundColor: "#eeeed4ff" }}
        >
          ▶ Opslaan
        </button>
      </div>
    </div>
  );
}
