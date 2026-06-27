import { PublicReviewForm } from '@/components/public/PublicReviewForm';
import Link from 'next/link';

export const metadata = {
  title: 'Beri Ulasan - TK IT Bina Insan Mulia',
  description: 'Berikan ulasan dan testimoni Anda tentang TK IT Bina Insan Mulia.',
};

export default function BeriUlasanPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] aspect-square bg-tertiary/5 rounded-full blur-3xl -z-10"></div>
      
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
              TK
            </div>
            <span className="font-headline-sm font-bold text-primary hidden sm:block">TK IT Bina Insan Mulia</span>
          </Link>
          <Link href="/" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Beranda
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <PublicReviewForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface py-6 border-t border-outline-variant/30 text-center">
        <p className="text-sm text-on-surface-variant font-body-sm">
          © {new Date().getFullYear()} TK IT Bina Insan Mulia. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
