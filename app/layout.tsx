import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

import "./globals.css";
import Sidebar from "./components/navigation/Sidebar";
import SearchBar from "./components/navigation/SearchBar";

const quickSand = Quicksand({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Roby",
  description: "Roby Roby Roby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quickSand.className}>
        <Sidebar />
        <SearchBar />
        {children}
        </body>
    </html>
  );
}
