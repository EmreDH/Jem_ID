import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-container">
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
