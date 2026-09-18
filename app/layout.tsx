import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/navbar";
import { ScrollBlur } from "@/components/scroll-blur";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { ThemeScript } from "@/components/theme-script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fuente variable para titulares (h1-h6), estilo geométrico y expresivo
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jose Ignacio Bayón — Software Developer",
  description: "Portfolio de Jose Ignacio Bayón, Software Developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <ScrollBlur />
        <Navbar />
        <ScrollIndicator />
        {children}
      </body>
    </html>
  );
}
