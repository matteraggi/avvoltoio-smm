import Navbar from "@/components/Navbar";
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
      <div className="homepage-display">
        <Navbar />
        {children}
        </div>
    </section>
  );
}
