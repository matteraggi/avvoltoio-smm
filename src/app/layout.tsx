import "./globals.css";
import type { Metadata } from "next";
import { Geo, Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { NotifyContextProvider } from "@/context/notify.context";
import { ClientsContextProvider } from "@/context/clients.context";
import { GeolocContextProvider } from "@/context/geoloc.context";
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
        <NotifyContextProvider>
          <ClientsContextProvider>
            <GeolocContextProvider>{children}</GeolocContextProvider>
          </ClientsContextProvider>
        </NotifyContextProvider>
      </body>
    </html>
  );
}
