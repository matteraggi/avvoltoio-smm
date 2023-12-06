import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PopupContextProvider } from "@/context/notify.context";
import { ClientsContextProvider } from "@/context/clients.context";
import { GeolocContextProvider } from "@/context/geoloc.context";
import { SocketioContextProvider } from "@/context/socketio.context";
import { NotificationContextProvider } from "@/context/notification.context";
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
        <PopupContextProvider>
          <ClientsContextProvider>
            <GeolocContextProvider>
              <SocketioContextProvider>
                <NotificationContextProvider>
                  {children}
                </NotificationContextProvider>
              </SocketioContextProvider>
            </GeolocContextProvider>
          </ClientsContextProvider>
        </PopupContextProvider>
      </body>
    </html>
  );
}
