import { Quote } from 'lucide-react';

export function QuoteSection() {
    return (
        <section className="bg-[#20809D] py-24 text-white text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
                {/* Quote Icon */}
                <Quote className="w-16 h-16 text-white/30 mb-8 fill-current" />

                {/* Telugu Quote */}
                <h2 className="font-telugu text-3xl md:text-5xl font-bold mb-4 leading-relaxed tracking-wide">
                    &quot;జ్ఞానమే దైవము, సత్యమే మార్గము&quot;
                </h2>

                {/* Divider */}
                <div className="w-24 h-1 bg-white/20 rounded-full my-6"></div>

                {/* English Translation */}
                <p className="font-serif italic text-xl md:text-2xl text-blue-100">
                    &quot;Knowledge is divine, Truth is the path.&quot;
                </p>
            </div>
        </section>
    );
}
