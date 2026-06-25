import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Geist } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      className={cn("scroll-smooth", "font-sans", geist.variable)}
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
          min-h-screen
        `}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
