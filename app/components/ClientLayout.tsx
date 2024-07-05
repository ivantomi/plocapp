"use client";

import { usePathname } from "next/navigation";

import React from "react";
import Sidebar from "./navigation/Sidebar";
import SearchBar from "./navigation/SearchBar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const showNavbar = !["/login", "/register", "forgot-password"].includes(
    pathname
  );
  return (
    <>
      {showNavbar && (
        <>
          <Sidebar />
          <SearchBar />
        </>
      )}
      {children}
    </>
  );
};

export default ClientLayout;
