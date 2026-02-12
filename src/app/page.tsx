import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/features/Hero";
import { ExploreSection } from "@/components/features/ExploreSection";
import { EventGallery } from "@/components/features/EventGallery";
import { QuoteSection } from "@/components/features/QuoteSection";
import { Footer } from "@/components/layout/Footer";
import { SettingsProvider } from "@/context/SettingsContext";

export default function Home() {
  return (
    <SettingsProvider>
      <main className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <Hero />
        <ExploreSection />
        <EventGallery />
        <QuoteSection />
        <Footer />
      </main>
    </SettingsProvider>
  );
}
