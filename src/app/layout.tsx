import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { LangProvider } from "@/components/lang-context";
import { GeminiChat } from "@/components/gemini-chat";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <LangProvider>
            {children}
            <GeminiChat />
          </LangProvider>
        </Suspense>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
