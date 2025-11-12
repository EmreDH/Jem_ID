import React from "react";
import { Helmet } from "react-helmet";

function Dashboard() {
  return (
    <main role="main" aria-labelledby="dashboard-title" style={{ padding: "40px" }}>
      <Helmet>
        <title>Jem.ID | Dashboard</title>
        <meta
          name="description"
          content="Overzicht van je Jem.ID-dashboard met toegang tot veilingen, statistieken en instellingen."
        />
      </Helmet>

      <header>
        <h1 id="dashboard-title" style={{ color: "#000", fontWeight: "bold" }}>
          📊 Dashboard
        </h1>
        <p style={{ color: "#333" }}>
          Welkom terug! Hier vind je een overzicht van jouw activiteiten, veilingen en systeemstatus.
        </p>
      </header>

      <section aria-label="Dashboard inhoud" style={{ marginTop: "30px" }}>
        <article
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            maxWidth: "600px",
          }}
        >
          <h2 style={{ color: "#000" }}>📈 Statistieken</h2>
          <p style={{ color: "#555" }}>
            Hier kun je toekomstige grafieken en informatie over je veilingen of resultaten tonen.
          </p>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
