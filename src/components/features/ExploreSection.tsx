import Link from 'next/link';
import { BookOpen, User, History, ArrowRight } from 'lucide-react';

export function ExploreSection() {
    const cards = [
        {
            title: "Foreword",
            description: "Read the introductory insights into the poem's structure, rhythm, and profound spiritual meaning as described by scholars.",
            link: "/foreword",
            linkText: "Read Foreword",
            icon: BookOpen
        },
        {
            title: "About Author",
            description: "Discover the life, inspirations, and other literary works of the poet behind these timeless verses.",
            link: "/about",
            linkText: "Meet the Poet",
            icon: User
        },
        {
            title: "The Legacy",
            description: "Understand the historical context and the enduring impact of this classical Telugu work on modern literature.",
            link: "/about",
            linkText: "Learn History",
            icon: History
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h3 className="text-blue-600 font-bold tracking-wider uppercase text-sm">DISCOVER THE WORK</h3>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Explore the Essence</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Dive deep into the spiritual and literary significance of this masterpiece through our curated sections.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div key={index} className="bg-[#FDFBF7] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                            {/* Icon */}
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <card.icon className="w-6 h-6" />
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {card.description}
                            </p>

                            {/* Link */}
                            <Link href={card.link} className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                                {card.linkText} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
