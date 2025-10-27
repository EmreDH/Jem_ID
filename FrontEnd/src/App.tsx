import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard";
import Veilingen from "./pages/veilingen";

function App(): JSX.Element {
  const location = useLocation();
  return (
    <div style={{ backgroundColor: "#F7F8FC", display: "flex" }}>
      {location.pathname !== "/" && <Navbar />}
      <div style={{ flex: 1, marginLeft: location.pathname !== "/login" ? "20px" : "0" }}>
        <Routes>
            <Route path="/veilingen" element={<Veilingen />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
