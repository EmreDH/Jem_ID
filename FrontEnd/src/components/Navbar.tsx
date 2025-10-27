import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styling/Navbar.css";

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <h1 className="navbar-title">Jem_ID</h1>

            <ul className="navbar-links">
                <li>
                    <Link
                        to="/dashboard"
                        className={location.pathname === "/dashboard" ? "active" : ""}
                    >
                        📊 Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/veilingen"
                        className={location.pathname === "/veilingen" ? "active" : ""}
                    >
                        📊 Veilingen
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
