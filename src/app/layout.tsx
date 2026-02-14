import type { Metadata } from "next";
import { Inter, Playfair_Display, Ramabhadra } from "next/font/google";
import localFont from "next/font/local"; // 1. Import Fonts
import "./globals.css";

// 2. Configure Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const ramabhadra = Ramabhadra({
  weight: "400",
  subsets: ["telugu"],
  variable: "--font-ramabhadra",
  display: "swap",
});

const kalaanja = localFont({
  src: "./fonts/Kalaanja.woff2",
  variable: "--font-kalaanja",
  display: "swap",
});

const kranthi = localFont({
  src: "./fonts/Kranthi_.woff2", // Note the underscore in filename
  variable: "--font-kranthi",
  display: "swap",
});

// 3. Metadata
export const metadata: Metadata = {
  title: "పరాత్పర శతకం - Paratpara Satakam",
  description: "A Neo-Classical digital sanctuary for spiritual Telugu poetry.",
  icons: {
    icon: '/favicon.png', // Using .png since you provided an image
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

import { AudioProvider } from "@/context/AudioContext";
import { AudioPlayerLayoutWrapper } from "@/components/layout/AudioPlayerLayoutWrapper";
import { SettingsProvider } from "@/context/SettingsContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${ramabhadra.variable} ${kalaanja.variable} ${kranthi.variable}`}>
      <body className="antialiased font-sans">
        <SettingsProvider>
          <AudioProvider>
            {children}
            <AudioPlayerLayoutWrapper />
          </AudioProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
