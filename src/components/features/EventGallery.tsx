export function EventGallery() {
    const videos = [
        { id: "LXb3EKWsInQ", title: "Launch Ceremony Highlights" },
        { id: "ysz5S6P_ks0", title: "Keynote Address" },
        { id: "jNQXAC9IVRw", title: "Author Interview" },
        { id: "MZnGValsZps", title: "Cultural Performance" },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <h3 className="text-blue-600 font-bold tracking-wider uppercase text-sm">LAUNCH EVENT</h3>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Grand Release Moments</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Watch the highlights and special moments from the Paratparasatakam book launch.
                    </p>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {videos.map((video, index) => (
                        <div key={index} className="flex flex-col space-y-4 group">
                            {/* Video Container - Aspect Ratio 16:9 */}
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-neutral-900">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </div>

                            {/* Video Title */}
                            <div className="px-2">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {video.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">Official Launch Event • Hyderabad</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-16 text-center">
                    <a
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors duration-200"
                    >
                        View Full Playlist on YouTube
                    </a>
                </div>
            </div>
        </section>
    );
}
