import Link from 'next/link';
import { BookOpen, Twitter, Facebook, Instagram } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white text-gray-600 py-16">
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">

                {/* Brand */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 text-white">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Paratparasatakam</h2>
                    <p className="text-gray-500 max-w-sm">
                        Preserving the heritage of classical Telugu literature for the digital age.
                    </p>
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
                    <Link href="#" className="p-2 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-full transition-colors duration-300">
                        <Twitter className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="p-2 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-full transition-colors duration-300">
                        <Facebook className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="p-2 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-full transition-colors duration-300">
                        <Instagram className="w-5 h-5" />
                    </Link>
                </div>

                {/* Copyright */}
                <div className="text-sm text-gray-400 border-t border-gray-100 pt-8 w-full">
                    <p>&copy; {new Date().getFullYear()} Paratparasatakam Project. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
