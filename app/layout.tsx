import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const quickSand = Quicksand({ subsets: ["latin"] });

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
      <body
        className={quickSand.className}
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div className="flex flex-row">
          <ClientLayout>{children}</ClientLayout>
        </div>
      </body>
    </html>
  );
}
