import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { LangProvider } from "@/components/lang-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JalSetu — Groundwater Recharge & RTRWH Assessment Platform",
  description:
    "Powered by CGWB & IMD data. Assess rooftop rainwater harvesting feasibility, get recharge structure recommendations, cost-benefit analysis, AR visualization, and community leaderboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LangProvider>
          {children}
        </LangProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
