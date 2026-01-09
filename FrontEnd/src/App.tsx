import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";

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
import AuctionDetailPage from "./pages/AuctionDetail";
import Veilingmaster from "./pages/Veilingmaster";
import LiveAuction from "./pages/LiveAuction";

function App(): JSX.Element {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forbidden" element={<Forbidden />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profiel"
          element={
            <ProtectedRoute roles={["klant", "Admin"]}>
              <Profiel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/actuele-product"
          element={
            <ProtectedRoute roles={["klant", "Admin"]}>
              <ActueleProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/veilingen"
          element={
            <ProtectedRoute roles={["klant", "Admin", "Veilingmeester"]}>
              <Veilingen />
            </ProtectedRoute>
          }
        />

        <Route
          path="/veilingen/:auctionId"
          element={
            <ProtectedRoute roles={["klant", "Admin", "Veilingmeester"]}>
              <AuctionDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/aankomende-producten"
          element={
            <ProtectedRoute roles={["Admin", "Veilingmeester"]}>
              <UpcomingProducts />
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

        {/* Veilingmeester/Admin routes */}
        <Route
          path="/Veilingmaster/:id"
          element={
            <ProtectedRoute roles={["Veilingmeester", "Admin"]}>
              <Veilingmaster />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Veilingmaster"
          element={
            <ProtectedRoute roles={["Veilingmeester", "Admin"]}>
              <Veilingmaster />
            </ProtectedRoute>
          }
        />

        {/* Live auction */}
        <Route
          path="/veiling/live/:id"
          element={
            <ProtectedRoute roles={["klant", "Admin", "Veilingmeester"]}>
              <LiveAuction />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
