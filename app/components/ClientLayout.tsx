"use client";

import { usePathname } from "next/navigation";

import React from "react";
import Sidebar from "./navigation/Sidebar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const showNavbar = !["/login", "/register", "/forgot-password"].includes(
    pathname
  );
  return (
    <>
      {showNavbar && (
        <div className="fixed">
          <Sidebar />
        </div>
      )}
      <div className="ml-20 w-[calc(100vw-10rem)] mt-4">{children}</div>
    </>
  );
};

export default ClientLayout;
