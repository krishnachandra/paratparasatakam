import Link from 'next/link';
import { Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white text-gray-600 py-16">
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">

                {/* Brand */}
                <div className="flex flex-col items-center mb-8">
                    <h1 className="font-telugu text-3xl font-bold text-gray-900 mb-2">పరాత్పర శతకం</h1>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Paratpara Satakam</h2>
                </div>

                {/* Links */}
                <nav className="flex flex-wrap justify-center gap-8 mb-8 text-sm font-medium text-gray-500">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <Link href="/about" className="hover:text-blue-600 transition-colors">About Author</Link>
                    <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
                </nav>

                {/* Social Icons */}
                <div className="flex gap-6 mb-8">
                    <Link href="mailto:contact@paratparasatakam.com" className="p-2 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-full transition-colors duration-300">
                        <Mail className="w-5 h-5" />
                    </Link>
                </div>

                {/* Copyright */}
                <div className="text-sm text-gray-400 border-t border-gray-100 pt-8 w-full">
                    <p>&copy; {new Date().getFullYear()} Paratpara Satakam. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
