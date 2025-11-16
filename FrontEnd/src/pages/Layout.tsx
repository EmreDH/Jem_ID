import React from "react";
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        {children}
      </main>
    </>
  );
}
