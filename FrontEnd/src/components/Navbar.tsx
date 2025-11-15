import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styling/Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Jem_ID</h1>

      <ul className="navbar-links">
        <li>
          <Link
            to="/dashboard"
            className={`navbar-item ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
          >
            📊 Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/veilingen"
            className={`navbar-item ${
              location.pathname === "/veilingen" ? "active" : ""
            }`}
          >
            📊 Veilingen
          </Link>
        </li>
        <li>

  <li>
    <Link
      to="/actuele-product"
      className={`navbar-item ${location.pathname === "/actuele-product" ? "active" : ""}`}
    >
      🕒 Actuele Product
    </Link>
  </li>

          
    <Link
        to="/profiel"
        className={`navbar-item ${location.pathname === "/profiel" ? "active" : ""}`}
    >
         Profiel
    </Link>
</li>


        

        {token && (
          <li>
            <button
              onClick={logout}
              className="navbar-item navbar-item--logout"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
