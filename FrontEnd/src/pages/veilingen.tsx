import React from "react";

type Veiling = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
};

function Veilingen(): JSX.Element {
 const veilingen = [
  {
    id: 1,
    title: "Verse Tomaten",
    description: "Kist met 10 kg verse tomaten van lokale telers.",
    price: "€12,50",
    image: "https://via.placeholder.com/120x80",
  },
  {
    id: 2,
    title: "Bos Rozen (20 stuks)",
    description: "Rode rozen van topkwaliteit uit Aalsmeer.",
    price: "€8,00",
    image: "https://via.placeholder.com/120x80",
  },
  {
    id: 3,
    title: "Biologische Komkommers",
    description: "Doos met 15 biologische komkommers.",
    price: "€10,00",
    image: "https://via.placeholder.com/120x80",
  },

];
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          borderRight: "1px solid #ddd",
        }}
      >
        <h3>Categorieën</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>Groenten</li>
          <li>Fruit</li>
          <li>Bloemen</li>
          <li>Overige</li>
        </ul>
      </aside>

      {/* Hoofdinhoud */}
      <main style={{ flex: 1, padding: "30px" }}>
        <h1>Actuele veilingen</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          {veilingen.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "120px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginRight: "20px",
                }}
              />
              <div style={{ flex: 1 }}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div>
                <strong>{item.price}</strong>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Veilingen;
