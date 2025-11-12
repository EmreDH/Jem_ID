import React, { useRef, useState } from "react";

export default function AanvoerderItem() {
  const [images, setImages] = useState<(string | null)[]>(Array(5).fill(null));
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleImageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  const handleDivClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="w-75 text-start mb-3">
          <h1>Add Product</h1>
        </div>

        {/* ---------- FOTO UPLOAD ---------- */}
        <div className="border border-dark w-75 p-4 mb-3 shadow bg-light">
          <p className="align-self-start">Foto’s*</p>
          <div className="d-flex gap-5">
            {[1, 2, 3, 4, 5].map((i, index) => (
              <div key={i} className="position-relative">
                <div
                  className="border border-dark d-flex justify-content-center align-items-center shadow"
                  style={{
                    width: "80px",
                    height: "80px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDivClick(index)}
                >
                  {images[index] ? (
                    <img
                      src={images[index] ?? ""}
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

                {/* ✅ Hidden file input */}
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

        {/* ---------- PRODUCT DETAILS ---------- */}
        <div className="border border-dark w-75 p-4 mb-3 shadow bg-light">
          <h4 className="mb-4">Product Details</h4>

          <div className="row mb-3">
            <div className="col-3">Naam Product</div>
            <div className="col-3">
              <input className="form-control" />
            </div>

            <div className="col-3">VeilDatum</div>
            <div className="col-3">
              <input type="date" className="form-control" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3">Soort</div>
            <div className="col-3">
              <input className="form-control" />
            </div>

            <div className="col-3">Potmaat</div>
            <div className="col-3">
              <input className="form-control" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3">Hoeveelheid</div>
            <div className="col-3">
              <input className="form-control" />
            </div>

            <div className="col-3">Minimum prijs</div>
            <div className="col-3">
              <input
                type="number"
                className="form-control"
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3">Steellengte</div>
            <div className="col-3">
              <input className="form-control" />
            </div>

            <div className="col-3">Gewenste kloklocatie</div>
            <div className="col-3">
              <select className="form-select">
                <option value="">-- Kies locatie --</option>
                <option value="Aalsmeer">Aalsmeer</option>
                <option value="Rijnsburg">Rijnsburg</option>
                <option value="Naaldwijk">Naaldwijk</option>
                <option value="Venlo">Venlo</option>
              </select>
            </div>
          </div>
        </div>

        {/* ---------- AANVOERDER INFO ---------- */}
        <div
          className="d-flex align-items-center border border-dark shadow w-75 p-4 mb-3 bg-light"
          style={{ width: "800px" }}
        >
          <div className="text-center me-4">
            <div
              className="border border-secondary d-flex justify-content-center align-items-center rounded shadow-sm"
              style={{ width: "100px", height: "100px" }}
            >
              <i className="bi bi-camera" style={{ fontSize: "1.5rem" }}></i>
            </div>
            <p className="mt-2 mb-0">Voornaam Achternaam</p>
          </div>

          <div className="flex-grow-1">
            <div className="row mb-2">
              <div className="col border border-dark rounded m-1">
                <p className="form-control-plaintext">Aanvoerder@outlook.com</p>
              </div>
              <div className="col border border-dark rounded m-1">
                <p>Straatnaam: De naam van de straat 44</p>
              </div>
            </div>

            <div className="row">
              <div className="col border border-dark rounded m-1">
                <p>2429 KE, LaanLand</p>
              </div>
              <div className="col border border-dark rounded m-1">
                <p>Telefoonnummer: 1154856258514</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- OPSLAAN KNOP ---------- */}
        <div className="d-flex justify-content-end w-75">
          <button
            className="btn btn-warning fw-bold shadow"
            style={{ backgroundColor: "#eeeed4ff" }}
          >
            ▶ Opslaan
          </button>
        </div>
      </div>
    </>
  );
}
