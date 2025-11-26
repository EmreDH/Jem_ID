import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styling/Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container container mt-4">
      <h2 className="mb-4 fw-bold text-success">Welkom bij je Dashboard</h2>

      {/* Statistic Cards */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-muted">Actieve veilingen</h5>
              <h3 className="text-success fw-bold">12</h3>
              <p className="card-text small text-muted">Huidig aantal lopende veilingen</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-muted">Mijn biedingen</h5>
              <h3 className="text-success fw-bold">34</h3>
              <p className="card-text small text-muted">Aantal biedingen geplaatst</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-muted">Totale opbrengst</h5>
              <h3 className="text-success fw-bold">€ 2.450</h3>
              <p className="card-text small text-muted">Verwachte opbrengst van verkopen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bids / Auctions */}
      <div className="card shadow-sm border-0 mt-5">
        <div className="card-header bg-success text-white fw-semibold">
          Recente biedingen
        </div>
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Product</th>
                <th>Bedrag</th>
                <th>Status</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tomatenkist</td>
                <td>€125</td>
                <td><span className="badge bg-success">Winnend</span></td>
                <td>15 Nov 2025</td>
              </tr>
              <tr>
                <td>Appelenmand</td>
                <td>€87</td>
                <td><span className="badge bg-warning text-dark">Lopend</span></td>
                <td>14 Nov 2025</td>
              </tr>
              <tr>
                <td>Paprika doos</td>
                <td>€103</td>
                <td><span className="badge bg-danger">Verloren</span></td>
                <td>12 Nov 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
