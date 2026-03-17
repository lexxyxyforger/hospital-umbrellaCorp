import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RS Sehat Prima — Pelayanan Kesehatan Modern",
  description: "Rumah sakit modern dengan layanan kesehatan terpadu. Konsultasi dokter spesialis, booking online, dan layanan medis terbaik.",
  keywords: ["rumah sakit", "dokter", "kesehatan", "booking dokter", "konsultasi"],
  openGraph: {
    title: "RS Sehat Prima",
    description: "Pelayanan Kesehatan Modern Untuk Anda",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${poppins.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
