"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-200 h-96 w-64 mx-auto rounded"></div>
});

const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-100 h-96 w-full"></div>
});
import {
    Download, Bookmark, Share2, MoreVertical, Search, Maximize, Minimize,
    Printer, Code, Sparkles, ThumbsUp, ThumbsDown, Flag, ChevronDown, ChevronUp, ChevronsUp, ChevronsDown,
    Filter, Pencil, Facebook, Linkedin, Mail, Copy, Check, Link as LinkIcon, ZoomIn, ZoomOut
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { useAudio } from "@/context/AudioContext";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export default function DocumentViewerPage() {
    const { setIsPlaying } = useAudio();

    useEffect(() => {
        setIsPlaying(false);
        import('react-pdf').then(({ pdfjs }) => {
            pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
        });
    }, [setIsPlaying]);
    const pdfUrl = "/Paratpara Satakam Book_Inner_FSr.indd.pdf";
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(800);
    const isProgrammaticScroll = useRef(false);
    const pageVisibility = useRef(new Map<number, number>());
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const [scale, setScale] = useState(1.0);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        // Trigger resize calculation when fullscreen mode toggles
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
        return () => clearTimeout(timer);
    }, [isFullScreen]);



    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    // Intersection Observer for Current Page
    useEffect(() => {
        if (numPages === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (isProgrammaticScroll.current) return;

                // Update visibility map
                entries.forEach((entry) => {
                    const pageId = parseInt(entry.target.id.split('_')[1]);
                    if (!isNaN(pageId)) {
                        pageVisibility.current.set(pageId, entry.intersectionRatio);
                    }
                });

                // Find the page with the highest visibility
                let maxVisibility = 0;
                let visiblePage = pageNumber;

                pageVisibility.current.forEach((visibility, id) => {
                    if (visibility > maxVisibility) {
                        maxVisibility = visibility;
                        visiblePage = id;
                    }
                });

                if (maxVisibility > 0 && visiblePage !== pageNumber) {
                    setPageNumber(visiblePage);
                }
            },
            {
                root: containerRef.current,
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] // Granular thresholds for smoother updates
            }
        );

        // Observe all pages
        for (let i = 1; i <= numPages; i++) {
            const el = document.getElementById(`page_${i}`);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, [numPages, pageNumber]); // Re-run when pages change

    useEffect(() => {
        function updateWidth() {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth);
            }
        }

        window.addEventListener('resize', updateWidth);
        updateWidth();

        // Slight delay to ensure layout is settled
        setTimeout(updateWidth, 100);

        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return (
        <div className="h-screen bg-[#F4F4F4] text-gray-800 font-sans flex flex-col antialiased overflow-hidden">
            {!isFullScreen && <Navbar />} {/* Use our main Navbar */}

            {/* 3-Column Layout Container - Takes remaining height */}
            <div className="flex flex-1 overflow-hidden w-full max-w-[1920px] mx-auto relative">

                {/* --------------------------------------------------------
                    COLUMN 1: Metadata & Actions (Left Sidebar)
                   -------------------------------------------------------- */}
                {!isFullScreen && (
                    <aside className="w-[300px] bg-white overflow-y-auto hidden lg:flex flex-col p-6 border-r border-gray-200 z-10">

                        {/* Stats Line */}
                        <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 mb-2">
                            <div className="flex items-center">
                                <ThumbsUp size={12} className="mr-1" />
                                <span>100%</span>
                                <span className="mx-1">(1)</span>
                            </div>
                            <span>•</span>
                            <span>2K views</span>
                            <span>•</span>
                            <span>{numPages} pages</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-xl font-bold text-[#1e1e1e] mb-2 leading-snug">
                            Paratpara Satakam
                        </h1>

                        {/* Author */}
                        <div className="text-sm text-gray-900 font-medium mb-6">
                            Original Title by <span className="text-blue-600 hover:underline cursor-pointer">Paratpara Admin</span>
                        </div>

                        {/* Document Info Section */}
                        <div className="mb-6">
                            <h3 className="uppercase text-[11px] font-bold text-gray-500 mb-3 tracking-widest border-b border-gray-100 pb-2">
                                Document Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <span className="mt-0.5 text-emerald-600"><Sparkles size={14} /></span>
                                    <div>
                                        <p className="text-xs font-bold text-gray-700">AI-enhanced title</p>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 space-y-1">
                                    <p>Uploaded on Feb 14, 2026</p>
                                    <p>A collection of devotional poems exploring the divine nature.</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Grid */}
                        <div className="grid grid-cols-4 gap-2 mb-8">
                            {/* Row 1 */}
                            <ActionButton icon={<Download size={20} />} label="Download" />
                            <ActionButton icon={<Bookmark size={20} />} label="Save" />
                            <ActionButton icon={<Share2 size={20} />} label="Share" />
                            <ActionButton icon={<ThumbsUp size={20} />} label="100%" />

                            {/* Row 2 */}
                            <ActionButton icon={<ThumbsDown size={20} />} label="0%" />
                            <ActionButton icon={<Printer size={20} />} label="Print" />
                            <ActionButton icon={<Code size={20} />} label="Embed" />
                            <ActionButton icon={<Sparkles size={20} />} label="Ask AI" />

                            {/* Report Flag */}
                            <div className="col-span-1 flex flex-col items-center justify-center p-2 rounded hover:bg-gray-50 text-gray-400 gap-1 cursor-pointer transition-colors">
                                <Flag size={18} />
                                <span className="text-[10px] font-medium">Report</span>
                            </div>
                        </div>

                    </aside>
                )}

                {/* --------------------------------------------------------
                    COLUMN 2: Book Display (Center)
                   -------------------------------------------------------- */}
                <main className="flex-1 bg-[#F4F4F4] relative flex flex-col min-w-0">

                    {/* Center Toolbar (Scribd Style) */}
                    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm gap-4">

                        {/* Left: Green Download Button Group */}
                        <div className="flex items-center gap-4">
                            {isFullScreen && (
                                <Link href="/" className="hidden sm:block hover:opacity-80 transition-opacity">
                                    <Image
                                        src="/Title.png"
                                        alt="Paratparasatakam"
                                        width={140}
                                        height={32}
                                        className="h-7 w-auto object-contain"
                                        priority
                                    />
                                </Link>
                            )}
                            <div className="flex rounded-[4px] shadow-sm overflow-hidden">
                                <button className="bg-[#20809D] hover:bg-[#18637a] text-white px-4 py-2 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors">
                                    <Download size={16} />
                                    <span>Download</span>
                                </button>
                                <button className="bg-[#20809D] hover:bg-[#18637a] text-white px-2 py-2 border-l border-white/20 transition-colors">
                                    <ChevronDown size={14} />
                                </button>
                            </div>

                            <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors" title="Bookmark">
                                <Bookmark size={20} />
                            </button>
                            <div className="relative">
                                <button
                                    className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                                    title="Share"
                                    onClick={() => setIsShareOpen(!isShareOpen)}
                                >
                                    <Share2 size={20} />
                                </button>

                                {isShareOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsShareOpen(false)} />
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                                            >
                                                <Facebook size={16} className="text-blue-600" />
                                                <span>Facebook</span>
                                            </a>
                                            <a
                                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                                            >
                                                <Linkedin size={16} className="text-blue-700" />
                                                <span>LinkedIn</span>
                                            </a>
                                            <a
                                                href={`mailto:?subject=Check out this book&body=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                                            >
                                                <Mail size={16} className="text-gray-500" />
                                                <span>Share via email</span>
                                            </a>
                                            <button
                                                onClick={handleCopyLink}
                                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors text-left border-t border-gray-100 mt-1 pt-2"
                                            >
                                                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-500" />}
                                                <span>{copied ? 'Copied!' : 'Copy link'}</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="relative">
                                <button
                                    className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                                    title="More options"
                                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                                >
                                    <MoreVertical size={20} />
                                </button>

                                {isMoreMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsMoreMenuOpen(false)} />
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                                            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors text-left">
                                                <ThumbsUp size={16} />
                                                <span>0% (0)</span>
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors text-left">
                                                <ThumbsDown size={16} />
                                                <span>0% (0)</span>
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors text-left border-t border-gray-100 mt-1 pt-2">
                                                <Printer size={16} />
                                                <span>Print</span>
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors text-left">
                                                <Code size={16} />
                                                <span>Embed</span>
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors text-left">
                                                <Sparkles size={16} />
                                                <span>Ask AI</span>
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors text-left border-t border-gray-100 mt-1 pt-2">
                                                <Flag size={16} />
                                                <span>Report</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Center: Zoom Controls */}
                        <div className="flex items-center justify-center gap-4 flex-1">
                            <button
                                className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                                title="Zoom Out"
                                onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
                            >
                                <ZoomOut size={20} />
                            </button>
                            <span className="text-sm font-medium text-gray-600 w-12 text-center">
                                {Math.round(scale * 100)}%
                            </span>
                            <button
                                className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                                title="Zoom In"
                                onClick={() => setScale(prev => Math.min(2.0, prev + 0.1))}
                            >
                                <ZoomIn size={20} />
                            </button>
                        </div>

                        {/* Right: Search & View Options */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="hidden md:flex items-center gap-2 border border-gray-300 rounded-[4px] px-3 py-1.5 hover:border-gray-400 transition-colors bg-white w-48 lg:w-64">
                                <Search size={16} className="text-gray-400" />
                                <span className="text-sm text-gray-400 truncate">Find in document</span>
                            </div>

                            {/* Zoom Controls */}

                            <button
                                className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                                title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
                                onClick={() => setIsFullScreen(!isFullScreen)}
                            >
                                {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Document Render Area */}
                    <div className="flex flex-1 relative overflow-hidden">

                        {/* Inner Left: Page Navigation Bar - Scribd Style Column */}
                        <div className="w-16 bg-white border-r border-gray-200 hidden md:flex flex-col items-center py-6 gap-1 z-10 h-full flex-shrink-0">

                            <button className="p-2 text-gray-500 hover:text-gray-800 transition-colors mb-1" title="Filter">
                                <Filter size={20} strokeWidth={1.5} />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-800 transition-colors mb-1" title="Edit">
                                <Pencil size={20} strokeWidth={1.5} />
                            </button>

                            <div className="w-6 h-px bg-gray-200 my-4"></div>

                            <div className="flex flex-col items-center gap-1">
                                <button
                                    className="p-1 hover:bg-gray-50 rounded text-gray-500 hover:text-gray-900 transition-colors"
                                    onClick={() => {
                                        const newPage = Math.max(1, pageNumber - 2);
                                        isProgrammaticScroll.current = true;
                                        setPageNumber(newPage);
                                        document.getElementById(`page_${newPage}`)?.scrollIntoView({ behavior: 'smooth' });
                                        setTimeout(() => isProgrammaticScroll.current = false, 1000); // Reset after expected scroll time
                                    }}
                                    title="Go back 2 pages"
                                >
                                    <ChevronsUp size={24} strokeWidth={1.5} />
                                </button>
                                <button
                                    className="p-1 hover:bg-gray-50 rounded text-gray-500 hover:text-gray-900 transition-colors"
                                    onClick={() => {
                                        const newPage = Math.max(1, pageNumber - 1);
                                        isProgrammaticScroll.current = true;
                                        setPageNumber(newPage);
                                        document.getElementById(`page_${newPage}`)?.scrollIntoView({ behavior: 'smooth' });
                                        setTimeout(() => isProgrammaticScroll.current = false, 1000); // Reset after expected scroll time
                                    }}
                                    title="Previous page"
                                >
                                    <ChevronUp size={24} strokeWidth={1.5} />
                                </button>

                                <div className="border border-gray-300 rounded-[4px] px-3 py-1.5 text-sm font-bold text-gray-900 bg-white my-1 min-w-[3rem] text-center">
                                    {pageNumber}
                                </div>

                                <div className="text-xs text-gray-500 font-semibold mb-1">
                                    {numPages}
                                </div>

                                <button
                                    className="p-1 hover:bg-gray-50 rounded text-gray-500 hover:text-gray-900 transition-colors"
                                    onClick={() => {
                                        const newPage = Math.min(numPages, pageNumber + 1);
                                        isProgrammaticScroll.current = true;
                                        setPageNumber(newPage);
                                        document.getElementById(`page_${newPage}`)?.scrollIntoView({ behavior: 'smooth' });
                                        setTimeout(() => isProgrammaticScroll.current = false, 1000); // Reset after expected scroll time
                                    }}
                                    title="Next page"
                                >
                                    <ChevronDown size={24} strokeWidth={1.5} />
                                </button>
                                <button
                                    className="p-1 hover:bg-gray-50 rounded text-gray-500 hover:text-gray-900 transition-colors"
                                    onClick={() => {
                                        const newPage = Math.min(numPages, pageNumber + 2);
                                        isProgrammaticScroll.current = true;
                                        setPageNumber(newPage);
                                        document.getElementById(`page_${newPage}`)?.scrollIntoView({ behavior: 'smooth' });
                                        setTimeout(() => isProgrammaticScroll.current = false, 1000); // Reset after expected scroll time
                                    }}
                                    title="Go forward 2 pages"
                                >
                                    <ChevronsDown size={24} strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>

                        {/* Scroll Container */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center scroll-smooth bg-[#F4F4F4]" ref={containerRef}>
                            <div className="w-full max-w-[850px]">
                                <Document
                                    file={pdfUrl}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    className="flex flex-col gap-6 items-center"
                                    loading={
                                        <div className="flex items-center justify-center p-12">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                                        </div>
                                    }
                                >
                                    {Array.from(new Array(numPages), (el, index) => (
                                        <div key={`page_${index + 1}`} id={`page_${index + 1}`} className="shadow sm:shadow-md bg-white relative transition-transform duration-200 group">
                                            <Page
                                                pageNumber={index + 1}
                                                width={Math.min(containerWidth - 60, 850)}
                                                scale={scale}
                                                className="rendering-sharp"
                                                renderAnnotationLayer={false}
                                                renderTextLayer={true}
                                            />
                                            {/* Page Number Overlay */}
                                            <div className="absolute top-2 right-4 text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity select-none">
                                                {index + 1}
                                            </div>
                                        </div>
                                    ))}
                                </Document>
                            </div>
                        </div>

                    </div>

                </main>

                {/* --------------------------------------------------------
                    COLUMN 3: YouTube / Related (Right Sidebar)
                   -------------------------------------------------------- */}
                {!isFullScreen && (
                    <aside className="w-[320px] bg-white border-l border-gray-200 hidden xl:flex flex-col z-10">
                        <div className="p-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-700 text-sm">You might also like</h3>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {[
                                { id: "lr2CvvhUWi8", title: "Sri Nilayundu Padyam - Paratpara Satakam", duration: "3:45" },
                                { id: "_SPZoVhHGMM", title: "Ennadu Bhadrabhudharamu - Paratpara Satakam", duration: "4:20" },
                                { id: "z3zC-JJbYs4", title: "Ramuni Bhadrashiala - Paratpara Satakam", duration: "3:10" }
                            ].map((video) => (
                                <a
                                    key={video.id}
                                    href={`https://youtu.be/${video.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group cursor-pointer block"
                                >
                                    <div className="aspect-video bg-gray-100 rounded flex items-center justify-center mb-2 overflow-hidden relative">
                                        {/* YouTube Thumbnail */}
                                        <img
                                            src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                        />
                                        {/* Play Icon Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-10 h-8 bg-red-600 rounded-[8px] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
                                            </div>
                                        </div>
                                        {/* <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">{video.duration}</span> */}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 leading-tight mb-1 line-clamp-2">
                                            {video.title}
                                        </h4>
                                        <div className="text-xs text-gray-500">
                                            Paratparasatakam • YouTube
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                            <a href="https://www.youtube.com/@Paratparasatakam" target="_blank" rel="noopener noreferrer" className="text-xs text-center text-blue-500 hover:text-blue-700 font-medium block">
                                Check out our YouTube Channel
                            </a>
                        </div>
                    </aside>
                )}

            </div>
        </div>
    );
}

function ActionButton({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button className="flex flex-col items-center justify-center p-3 rounded hover:bg-gray-50 text-gray-500 gap-2 transition-all group hover:text-[#1e1e1e]">
            <div className="group-hover:scale-105 transition-transform text-gray-600">{icon}</div>
            <span className="text-[10px] uppercase font-semibold text-gray-500 group-hover:text-[#1e1e1e] tracking-tight">{label}</span>
        </button>
    )
}
