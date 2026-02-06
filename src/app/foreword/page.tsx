"use client";

import { Navbar } from "@/components/layout/Navbar";
import { SettingsProvider, useSettings } from "@/context/SettingsContext";
import { motion } from "framer-motion";

function ForewordContent() {
    const { t } = useSettings();

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <article className="max-w-3xl mx-auto px-6 py-20 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="block text-center text-primary font-bold tracking-widest uppercase text-sm mb-4">
                        Introduction
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12">
                        {t("nav.foreword")}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="prose prose-lg prose-stone dark:prose-invert font-serif leading-loose mx-auto"
                >
                    <p>
                        <span className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">P</span>
                        aratparasatakam stands as a monumental work in the landscape of Telugu spiritual literature. Written in the 11th century style, it is not merely a collection of verses but a profound outpouring of a soul&apos;s journey towards the Divine.
                    </p>
                    <p>
                        The poet, deeply moved by his pilgrimages to sacred temples across the Indian subcontinent, penned these verses as offerings to the Supreme Lord. Each poem serves as a mirror reflecting the human condition—our struggles with illusion (Maya), our yearning for truth, and the ultimate surrender (Saranagati) required to cross the ocean of worldly existence.
                    </p>
                    <blockquote className="border-l-4 border-primary pl-4 italic my-8 text-xl text-muted-foreground">
                        &quot;In the silence of the heart, the true verse is born.&quot;
                    </blockquote>
                    <p>
                        This digital edition aims to preserve the purity of the original text while making it accessible to a generation that consumes content on screens. By integrating meaning, commentary, and auditory rhythms (planned), we hope to bridge the gap between the ancient palm leaf manuscripts and the modern digital tablet.
                    </p>
                    <div className="flex justify-center mt-12">
                        <span className="text-2xl text-primary">***</span>
                    </div>
                </motion.div>
            </article>
        </main>
    );
}

export default function ForewordPage() {
    return (
        <SettingsProvider>
            <ForewordContent />
        </SettingsProvider>
    );
}
