"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/features/Hero";
import { SettingsProvider } from "@/context/SettingsContext";

export default function Home() {
  return (
    <SettingsProvider>
      <main className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <Hero />

        {/* Placeholder for future sections */}
        <div className="h-20" />
      </main>
    </SettingsProvider>
  );
}
