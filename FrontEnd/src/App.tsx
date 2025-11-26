import React from "react";
import { Routes, Route } from "react-router-dom";
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
import Veilingmaster from "./pages/Veilingmaster";

function App(): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F7F8FC",
      }}
    >
      {/* ✅ Navbar ALWAYS visible now */}
      <Navbar />

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
          <Route path="/AanvoerderItem" element={<AanvoerderItem />} />
          <Route path="/Veilingmaster/:id" element={<Veilingmaster />} />
          <Route path="/Veilingmaster/" element={<Veilingmaster />} />

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

          <Route
            path="/AanvoerderItem"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <AanvoerderItem />
              </ProtectedRoute>
            }
          />
          <Route path="/aankomende-producten" element={<UpcomingProducts />} />
        </Routes>
        /
      </div>
    </div>
  );
}

export default App;
