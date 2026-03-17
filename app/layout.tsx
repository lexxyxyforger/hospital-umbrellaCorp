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
  title: "RS Umbrella Corp — Layanan Medis Kelas Korporasi",
  description: "Fasilitas medis terpadu milik Umbrella Corporation. Akses spesialis terlatih, booking online, protokol kesehatan berstandar tinggi, dan riset medis mutakhir.",
  keywords: ["umbrella corp", "rumah sakit", "dokter spesialis", "kesehatan korporasi", "booking dokter", "raccoon city"],
  openGraph: {
    title: "RS Umbrella Corp",
    description: "Layanan Medis Kelas Korporasi — Umbrella Corporation",
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