import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { NotifyContextProvider } from "@/context/notify.context";
import { ClientsContextProvider } from "@/context/clients.context";
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
            <Navbar />
            {children}
          </ClientsContextProvider>
        </NotifyContextProvider>
      </body>
    </html>
  );
}