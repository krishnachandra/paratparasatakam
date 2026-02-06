import type { Metadata } from "next";
import { Inter, Playfair_Display, Ramabhadra } from "next/font/google"; // 1. Import Fonts
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

// 3. Metadata
export const metadata: Metadata = {
  title: "Paratparasatakam",
  description: "A Neo-Classical digital sanctuary for spiritual Telugu poetry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${ramabhadra.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
