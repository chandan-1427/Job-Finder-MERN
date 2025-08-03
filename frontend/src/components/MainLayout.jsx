import React from "react";
import Header from "./nav/Header"
import Footer from "./nav/Footer"

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-18 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}