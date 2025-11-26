import React, { useEffect, useState } from "react";
import "../styling/Veilingen.css";
import { getActiveVeilingen, Veiling } from "../api/veilingApi";

function Veilingen(): JSX.Element {
    const [veilingen, setVeilingen] = useState<Veiling[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getActiveVeilingen();
                setVeilingen(data);
            } catch (error) {
                console.error("Fout bij ophalen veilingen:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <p role="status">Veilingen worden geladen...</p>;
    }

    return (
        <main className="veiling-container">
            <h1 tabIndex={0}>Actieve Veilingen</h1>

            <ul className="veiling-list">
                {veilingen.map((v) => (
                    <li className="veiling-item" key={v.auctionId}>
                        <img
                            src={v.fotoUrl}
                            alt={`Foto van ${v.productName}`}
                            className="veiling-image"
                        />

                        <div className="veiling-info">
                            <h2>{v.productName}</h2>
                            <p>{v.description}</p>

                            <p>
                                <strong>Huidige prijs:</strong> €{v.currentPrice}
                            </p>

                            <p>
                                <strong>Minimumprijs:</strong> €{v.minimumPrijs}
                            </p>

                            <a
                                className="btn-primary"
                                href={`/veiling/${v.auctionId}`}
                                aria-label={`Bekijk veiling voor ${v.productName}`}
                            >
                                Bekijk details
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default Veilingen;
