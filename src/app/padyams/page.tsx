"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";
import { useAudio } from "@/context/AudioContext";

export default function PadyamsPage() {
    const padyams = [
        {
            id: "lr2CvvhUWi8",
            title: "Sri Nilayundu Padyam - Paratpara Satakam",
            text: [
                "శ్రీ నిలయుండు వై, సకల జీవుల యందున అంతరాత్మవై",
                "గానము సేయుచున్న ముని గాయకులం గని పద్మనాభుడై",
                "దీన జనంబులన్ గరుణ దీరగా జూచుచున్న దేవుడై",
                "మానవ జాతి కిన్ వెలుగు మాటలు జెప్పెడి 'భద్ర శైలుడై'"
            ],
            meaning: "Lord Vishnu, the abode of Goddess Lakshmi, resides as the inner soul in all beings. He appears as Padmanabha to the sages who sing his praises. As the compassionate God who looks upon the suffering with mercy, and as the Lord of Bhadrachalam (Bhadrashailuda), He speaks words of light and wisdom to humanity."
        },
        {
            id: "_SPZoVhHGMM",
            title: "Ennadu Bhadrabhudharamu - Paratpara Satakam",
            text: [
                "ఎన్నడు భద్ర భూధరము ఎక్కెదనో? ప్రభు రామ చంద్రునిన్",
                "కన్నుల పండువగా గని, కౌగిట జేర్చుక ముద్దులాడెదో?",
                "సన్నుత గాత్రుడనై, ప్రభు సన్నిధి నిల్చి సుకీర్తనల్",
                "ఎన్నడు పాడి పాడి పరమేశుని మెప్పించెదో? 'పరాత్పరా!'"
            ],
            meaning: "When will I climb the sacred Bhadradri hill? When will I feast my eyes on Lord Ramachandra, embrace Him, and shower Him with affection? When will I stand in His presence, singing melodious hymns (kirtanas) with a devoted voice, singing again and again to please the Supreme Lord? O Paratpara!"
        },
        {
            id: "z3zC-JJbYs4",
            title: "Ramuni Bhadrashiala - Paratpara Satakam",
            text: [
                "రాముని భద్ర శైలమున రాజుగ జూడగ కోటి కన్నులున్",
                "చాలవు గాక చాలవని చెప్పుట సత్యము, సత్య వాక్కులే",
                "ఆ మహనీయు సుందరము, ఆ దరహాసము, ఆ సురూపమున్",
                "భామలు చూడగ వశమే? బ్రహ్మకు నైనను గాదు 'భార్గవా!'"
            ],
            meaning: "To see Lord Rama as the King on Bhadradri hill, even ten million eyes would not be enough; this is truly the truth. That great personage's beauty, that gentle smile, that exquisite form—is it possible even for celestial damsels to fully behold? It is not possible even for Lord Brahma! O Bhargava!"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h3 className="text-blue-600 font-bold tracking-wider uppercase text-sm">Multimedia</h3>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Paratpara Sataka Padyams</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            Experience the divine verses through these soulful renditions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {padyams.map((padyam, index) => (
                            <div key={index} className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden lg:even:translate-y-12 transition-transform hover:shadow-xl duration-300">
                                {/* Video */}
                                <div className="relative w-full aspect-video bg-neutral-900">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${padyam.id}`}
                                        title={padyam.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-8 space-y-6">
                                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {padyam.title}
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="bg-amber-50/50 p-6 rounded-xl border border-amber-100">
                                            {padyam.text.map((line, i) => (
                                                <p key={i} className="text-lg text-gray-800 leading-relaxed font-telugu">
                                                    {line}
                                                </p>
                                            ))}
                                        </div>

                                        <div className="text-gray-600 text-sm leading-relaxed italic border-l-4 border-blue-200 pl-4 py-1">
                                            {padyam.meaning}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
