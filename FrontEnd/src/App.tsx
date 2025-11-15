import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Veilingen from "./pages/Veilingen";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import Forbidden from "./pages/Forbidden";
import UpcomingProducts from "./pages/UpcomingProducts";

function App(): JSX.Element {
  const location = useLocation();

  return (
    <div style={{ backgroundColor: "#F7F8FC", display: "flex" }}>
      {location.pathname !== "/" && <Navbar />}
      <div
        style={{
          flex: 1,
          marginLeft: location.pathname !== "/login" ? "20px" : "0",
        }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/aankomende-producten" element={<UpcomingProducts />}/>

          <Route
            path="/veilingen"
            element={
              <ProtectedRoute roles={["Klant", "Admin"]}>
                <Veilingen />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
