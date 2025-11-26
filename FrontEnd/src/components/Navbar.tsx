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
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm fixed-top main-navbar"
      aria-label="Main navigation"
    >
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
          aria-label="Go to homepage"
        >
          jem.id
        </Link>

        {/* Toggle */}
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

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* PUBLIC LINKS */}
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
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

            {/* ROLE-BASED */}
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

        
            {/* ✅ NEW BUTTON — ADMIN ONLY */}
            {role === "admin" && (
              <li className="nav-item">
                <Link
                  to="/AanvoerderItem"
                  className={`nav-link ${
                    location.pathname === "/AanvoerderItem" ? "active" : ""
                  }`}
                >
                  Aanvoerderitem
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

            {hasPermission("viewAanvoerderItem") && (
              <li className="nav-item">
                <Link
                  to="/AanvoerderItem"
                  className={`nav-link ${
                    location.pathname === "/AanvoerderItem" ? "active" : ""
                  }`}
                >
                  AanvoerderItem
                </Link>
              </li>
            )}

            {hasPermission("viewAankomendeProducten") && (
              <li className="nav-item">
                <Link
                  to="/aankomende-producten"
                  className={`nav-link ${
                    location.pathname === "/aankomende-producten" ? "active" : ""
                  }`}
                >
                  Aankomende Producten
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
                  Profiels
                </Link>
              </li>
            )}

            {/* AUTH BUTTONS */}
            {!loggedIn ? (
              <li className="nav-item ms-3 d-flex align-items-center gap-2">
                <Link to="/login" className="auth-btn login-btn">
                  Login
                </Link>

                <Link to="/signup" className="auth-btn signup-btn">
                  Sign Up
                </Link>
              </li>
            ) : (
              <li className="nav-item ms-3 d-flex align-items-center gap-3">
                <span className="text-white small">
                  Ingelogd als: <strong>{role}</strong>
                </span>

                <button
                  onClick={handleLogout}
                  className="auth-btn logout-btn"
                  aria-label="Log out"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
