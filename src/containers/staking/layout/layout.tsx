"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import { Navbar } from "./nav-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid lg:grid-cols-[252px_1fr] min-h-screen">
        <Navbar />

        <div>
          <Header />

          {children}
        </div>
      </div>

      <ToastContainer icon={false} closeButton={false} hideProgressBar />
    </>
  );
}
