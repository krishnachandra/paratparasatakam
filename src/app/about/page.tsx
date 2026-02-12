"use client";

import { Navbar } from "@/components/layout/Navbar";
import { SettingsProvider, useSettings } from "@/context/SettingsContext";
import { motion } from "framer-motion";
import Image from "next/image";

function AboutContent() {
    const { t } = useSettings();

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <article className="max-w-4xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start">

                {/* Left: Portrait Placeholder */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="sticky top-24"
                >
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl border-4 border-white dark:border-stone-700 mx-auto w-full max-w-[300px] group">
                        <Image
                            src="/author.JPG"
                            alt="Portrait of Jagarlapudi Lakshmi Narayana"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 300px"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                    </div>
                </motion.div>

                {/* Right: Biography */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="space-y-8"
                >
                    <div>
                        <span className="block text-primary font-bold tracking-widest uppercase text-sm mb-2">
                            The Legend
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                            {t("nav.about")}
                        </h1>
                        <div className="h-1 w-20 bg-primary/30 rounded-full" />
                    </div>

                    <div className="prose prose-lg prose-stone dark:prose-invert font-serif leading-loose">
                        <p>
                            The author of <em>Paratparasatakam</em> remains a figure shrouded in the mists of history, yet his voice resonates with the clarity of a bell ringing in a quiet temple. Living during a time of great devotional revival (Bhakti Movement) in the Telugu lands, he was a wandering ascetic who found his home at the feet of Lord Shiva.
                        </p>
                        <p>
                            His poetry is characterized by <strong>Ninda Stuti</strong> (praise through blame) and <strong>Saranagati</strong> (total surrender). He often converses with the Divine as a friend, a child, and sometimes even as an accuser, demanding to know why the Lord allows his devotees to suffer in the cycle of Samsara.
                        </p>
                        <h3>Literary Style</h3>
                        <p>
                            Unlike the ornate court poetry (Prabandha) of his contemporaries, his style was rugged, direct, and piercing. He valued <em>Bhava</em> (emotion) over <em>Bhasha</em> (language complexity), making his verses accessible to both the scholar and the peasant.
                        </p>
                        <h3>Legacy</h3>
                        <p>
                            Today, this Satakam is recited in thousands of households. It stands as a testament to the power of personal devotion, proving that one does not need elaborate rituals to reach the Divine—only a heart that cries out with sincerity.
                        </p>
                    </div>
                </motion.div>

            </article>
        </main>
    );
}

export default function AboutPage() {
    return (
        <SettingsProvider>
            <AboutContent />
        </SettingsProvider>
    );
}
