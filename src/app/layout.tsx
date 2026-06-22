import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppConnect from "@/components/layout/WhatsAppConnect";
import ThemeProvider from "@/components/theme/ThemeProvider";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karapuzha Water Scapes – Luxury Resort, Wayanad",
  description:
    "Experience luxury waterfront villas at Karapuzha Water Scapes, Wayanad. Book directly for the best rates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body
        className={`
          ${jost.variable}
          ${cormorantGaramond.variable}
          font-sans
          antialiased
          bg-gray-50
          dark:bg-black
          text-gray-900
          dark:text-white
          transition-colors
          duration-300
          flex
          flex-col
          min-h-screen
        `}
      >
        <ThemeProvider>
          <Header />

          <main className="flex-grow pt-20">
            {children}
          </main>

          <Footer />
          <WhatsAppConnect />
        </ThemeProvider>
      </body>
    </html>
  );
}