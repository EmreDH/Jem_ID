import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import AanvoerderItem from "./pages/AanvoerderItem";
import ProtectedRoute from "./components/ProtectedRoute";
import Forbidden from "./pages/Forbidden";
import UpcomingProducts from "./pages/UpcomingProducts";
import Profiel from "./pages/Profiel";
import ActueleProduct from "./pages/ActueleProduct";
import Veilingen from "./pages/Veilingen";
import Footer from "./components/Footer";

function App(): JSX.Element {
  const location = useLocation();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // full height layout
        backgroundColor: "#F7F8FC", // page background
      }}
    >
      {/* Navbar hidden on login/signup pages */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar />
      )}

      {/* Main content fills available space */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/veilingen" element={<Veilingen />} />
          <Route path="/profiel" element={<Profiel />} />
          <Route path="/actuele-product" element={<ActueleProduct />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/aankomende-producten" element={<UpcomingProducts />} />

          {/* Protected routes */}
          <Route
            path="/veilingen"
            element={
              <ProtectedRoute roles={["klant", "Admin"]}>
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

          <Route path="/AanvoerderItem" element={<AanvoerderItem />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>

      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
}

export default App;
