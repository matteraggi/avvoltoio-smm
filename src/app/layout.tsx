import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { CounterContextProvider } from "@/context/notify.context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Squealer - SMM",
  description: "Social Media Management Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CounterContextProvider>
          <Navbar />
          {children}
        </CounterContextProvider>
      </body>
    </html>
  );
}
