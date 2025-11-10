import React from "react";

function AanvoerderItem() {
  return (
    <>
      <div className=" d-flex flex-column justify-content-center align-items-center">
        <div className="w-75 text-start mb-3">
          <h1>Add Product</h1>
        </div>
        <div className="border border-dark w-75 p-4 mb-3 shadow bg-light">
          <p className="align-self-start">Foto’s*</p>

          <div className="d-flex gap-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="border border-dark d-flex justify-content-center align-items-center shadow "
                style={{
                  width: "80px",
                  height: "80px",
                }}
              >
                <span>Image</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-dark w-75 p-4 mb-3 shadow bg-light">
          <h4 className="mb-4">Product Details</h4>

          <div className="row mb-3">
            <div className="col-3">Naam product</div>
            <div className="col-3">
              <input className="form-control" />
            </div>

            <div className="col-3">VeilDatum</div>
            <div className="col-3">
              <input className="form-control" />
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
              <input className="form-control" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3">Steellengte</div>
            <div className="col-3">
              <input className="form-control" />
            </div>

            <div className="col-3">Gewenste kloklocatie</div>
            <div className="col-3">
              <input className="form-control" />
            </div>
          </div>
        </div>

        <div
          className="d-flex align-items-center border border-dark shadow w-75 p-4 mb-3 bg-light"
          style={{ width: "800px" }}
        >
          {/* Foto upload */}
          <div className="text-center me-4">
            <div
              className="border border-secondary d-flex justify-content-center align-items-center rounded shadow-sm"
              style={{ width: "100px", height: "100px" }}
            >
              <i className="bi bi-camera" style={{ fontSize: "1.5rem" }}></i>
            </div>
            <p className="mt-2 mb-0">Voornaam Achternaam</p>
          </div>

          {/* Invoervelden */}
          <div className="flex-grow-1">
            <div className="row mb-2">
              <div className="col">
                <input
                  type="email"
                  className="form-control"
                  defaultValue="Aanvoerder@outlook.com"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Straatnaam: De naam van de straat 44"
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  defaultValue="2429 KE, LaanLand"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Telefoonnummer: 1154856258514"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Opslaan knop */}
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

export default AanvoerderItem;
