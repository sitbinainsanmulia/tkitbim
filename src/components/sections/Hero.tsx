import React from 'react';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';
import Link from 'next/link';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

export function Hero({ data }: { data?: any }) {
  const title = data?.hero_title || "Membentuk Generasi Islami yang Cerdas & Berkarakter";
  const subtitle = data?.hero_subtitle || "TK IT Bina Insan Mulia mendedikasikan diri untuk membangun pondasi karakter Islami yang kuat dan kecerdasan akademik melalui pendekatan bermain yang menyenangkan.";

  return (
    <section className="relative pt-24 pb-32 px-margin-mobile md:px-margin-desktop overflow-hidden bg-[#fffdf5]">
      <div className="max-w-container-max mx-auto grid md:grid-cols-2 gap-12 items-center">
        <FadeIn direction="right" delay={100} className="relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-secondary-container/30 px-4 py-1.5 rounded-full text-on-secondary-container text-label-sm font-label-sm">
            <MaterialIcon name="stars" className="text-sm" />
            <span>Lingkungan Belajar yang Aman & Islami</span>
          </div>
          
          <h1 className="font-display-lg text-display-lg text-primary md:text-[56px] md:leading-16 font-bold">
            {title}
          </h1>
          
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            {subtitle}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/pendaftaran" className="bg-secondary text-on-secondary px-8 py-3.5 rounded-full font-label-sm text-label-sm font-bold shadow-[0_4px_0_0_var(--color-on-secondary-container)] hover:translate-y-1 hover:shadow-none transition-all flex items-center space-x-2">
              <span>Daftar Sekarang</span>
              <MaterialIcon name="arrow_forward" className="text-sm" />
            </Link>
            
            {data?.hero_video_url && (
              <a 
                href={data.hero_video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface text-secondary border-2 border-secondary px-8 py-3.5 rounded-full font-label-sm text-label-sm font-bold hover:bg-secondary/10 transition-colors flex items-center space-x-2"
              >
                <MaterialIcon name="play_circle" className="text-[18px]" />
                <span>Tonton Video</span>
              </a>
            )}
            
            <Link 
              href="/#program"
              className="bg-surface text-primary border-2 border-primary/20 px-8 py-3.5 rounded-full font-label-sm text-label-sm font-bold hover:bg-primary/5 transition-colors flex items-center space-x-2"
            >
              <MaterialIcon name="arrow_downward" className="text-sm" />
              <span>Pelajari Lebih Lanjut</span>
            </Link>
          </div>
        </FadeIn>
        
        <FadeIn direction="left" delay={300} className="relative z-10 flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-[0_20px_40px_-15px_rgba(0,103,103,0.15)] rotate-3 bg-surface-container">
            <Image 
              alt="Anak-anak TK bermain dan belajar" 
              className="w-full h-full object-cover" 
              src={data?.hero_image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuDzIj37oLTQaeE67ByzNf7-CMEB6NMsQcoDmB7R4fEhgQG701CMQOun7WiNYXTCaUViHam6xQKYJ-ywkD-dAz--JJ9nV4UpvgLJ5mYaKo4H02eRqmAtGnO1G2o4sLyEdD13J24WgzkiVPzOVIlUQnIx1jYiR3F6yvhPgTaXfZ9ALeTx4qa5odLy4hdV7De9gPBlxnYqOX5WaaBLLtkfHsZDuMfY822PnJZ1edLXP3EiK4ooRAYSbOxAWq7GXWtxg6dO_VR0E5EQbg"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-secondary-container rounded-full mix-blend-multiply opacity-70 animate-bounce"></div>
          <div className="absolute -bottom-12 -left-8 w-32 h-32 bg-primary-container rounded-full mix-blend-multiply opacity-70 animate-pulse"></div>
        </FadeIn>
      </div>
    </section>
  );
}
