import Sidebar from "@/components/Sidebar";
import "../globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="homepage">
      <Sidebar />
      {children}
    </section>
  );
}
