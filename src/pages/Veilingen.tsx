import React from "react";
import "../styling/Veilingen.css";

type Veiling = {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
};

function Veilingen(): JSX.Element {
    const veilingen: Veiling[] = [
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
        <div className="veilingen-container">
            
            <aside className="sidebar">
                <h3>Categorieën</h3>
                <ul>
                    <li>Groenten</li>
                    <li>Fruit</li>
                    <li>Bloemen</li>
                    <li>Overige</li>
                </ul>
            </aside>


            <main className="main-content">
                <h1>Actuele veilingen</h1>
                <div className="veiling-list">
                    {veilingen.map((item) => (
                        <div key={item.id} className="veiling-item">
                            <img src={item.image} alt={item.title} />
                            <div className="veiling-info">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                            <div className="veiling-price">
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
