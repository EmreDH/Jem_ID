import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styling/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-success text-white mt-auto py-3">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <span className="fw-semibold">© {new Date().getFullYear()} jem.id</span>
        <div className="footer-links d-flex gap-3">
          <a href="/contact" className="text-white text-decoration-none">
            Contact
          </a>
          <a href="#" className="text-white text-decoration-none">
            Privacybeleid
          </a>
          <a href="#" className="text-white text-decoration-none">
            Gebruiksvoorwaarden
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
