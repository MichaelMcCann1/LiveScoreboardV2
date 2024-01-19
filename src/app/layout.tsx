import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import Scroll from "@/components/Scroll/Scroll";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Live Scoreboard",
  description: "NextJS project created by Michael McCann",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Scroll />
        <Navbar />
        <main className="bg-gray-100 min-h-[calc(100vh-60px)] h-full pb-10">
          {children}
        </main>
      </body>
    </html>
  );
}
