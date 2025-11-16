import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styling/Navbar.css";
import { isLoggedIn, getUserRole, logout } from "../lib/auth";
import { hasPermission } from "../lib/permissions";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const role = getUserRole();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm fixed-top">
      <div className="container">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          jem.id
        </Link>

        {/* Mobile toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Everyone can see these */}
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/contact"
                className={`nav-link ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
              >
                Contact
              </Link>
            </li>

            {/* Role-based menu items */}
            {hasPermission("viewVeilingen") && (
              <li className="nav-item">
                <Link
                  to="/veilingen"
                  className={`nav-link ${
                    location.pathname === "/veilingen" ? "active" : ""
                  }`}
                >
                  Veilingen
                </Link>
              </li>
            )}

            {hasPermission("viewDashboard") && (
              <li className="nav-item">
                <Link
                  to="/dashboard"
                  className={`nav-link ${
                    location.pathname === "/dashboard" ? "active" : ""
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            )}

            {hasPermission("manageProducts") && (
              <li className="nav-item">
                <Link
                  to="/actuele-product"
                  className={`nav-link ${
                    location.pathname === "/actuele-product" ? "active" : ""
                  }`}
                >
                  Productbeheer
                </Link>
              </li>
            )}

            {hasPermission("viewProfile") && (
              <li className="nav-item">
                <Link
                  to="/profiel"
                  className={`nav-link ${
                    location.pathname === "/profiel" ? "active" : ""
                  }`}
                >
                  Profiel
                </Link>
              </li>
            )}

            {/* Right-side user actions */}
            {!loggedIn ? (
              <>
                <li className="nav-item ms-3">
                  <Link to="/login" className="btn btn-light btn-sm me-2">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="btn btn-outline-light btn-sm">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ms-3">
                  <span className="text-white me-3 small">
                    Ingelogd als: <strong>{role}</strong>
                  </span>
                  <button onClick={handleLogout} className="btn btn-light btn-sm">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
