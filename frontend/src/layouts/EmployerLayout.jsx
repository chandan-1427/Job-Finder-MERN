// layouts/EmployerLayout.jsx
import React from "react";
import MainLayout from "../components/MainLayout";
import { Outlet } from "react-router-dom";

export default function EmployerLayout() {
  return (
    <>
      <MainLayout>
      <main className="min-h-screen bg-[#3e2723]">
        <Outlet />
      </main>
      </MainLayout>
    </>
  );
}
