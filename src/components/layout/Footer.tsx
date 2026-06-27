import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer({ settings }: { settings?: any }) {
  const address = settings?.school_address || "Jl. Sadang Sari, Bandung, Jawa Barat";
  const phone = settings?.school_phone || "+62 8xx-xxxx-xxxx";
  const email = "info@tkitbinainsanmulia.sch.id"; // Not in settings yet, keep hardcoded or add to settings if needed.

  return (
    <footer className="bg-surface-container-low w-full pt-16 pb-8 px-margin-mobile md:px-margin-desktop mt-auto border-t border-outline-variant">
      <div className="max-w-container-max mx-auto flex flex-col lg:flex-row justify-between gap-12 mb-16">
        {/* Column 1: Brand & Socials */}
        <div className="lg:max-w-[320px] space-y-6">
          <div>
            {settings?.logo_url ? (
              <div className="flex flex-col gap-2 mb-4">
                <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2">
                  <Image src={settings.logo_url} alt="Logo TK IT Bina Insan Mulia" fill className="object-contain object-left" unoptimized />
                </div>
                <div className="font-headline-md text-headline-md font-bold text-primary">TK IT Bina Insan Mulia</div>
              </div>
            ) : (
              <div className="font-headline-md text-headline-md font-bold text-primary mb-2">TK IT Bina Insan Mulia</div>
            )}
            <p className="font-body-md text-body-md text-on-surface-variant">Mendidik dengan Hati, Membangun Generasi Islami yang ceria, cerdas, dan berakhlak mulia.</p>
          </div>
          <div className="flex gap-4">
            {settings?.social_instagram && (
              <a href={settings.social_instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            )}
            {settings?.social_facebook && (
              <a href={settings.social_facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            )}
            {settings?.social_youtube && (
              <a href={settings.social_youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            )}
          </div>
        </div>

        {/* Column 2 & 3 Wrapper */}
        <div className="flex flex-col sm:flex-row gap-8 lg:gap-12">
          {/* Column 2: Quick Links */}
          <div className="space-y-6 min-w-[120px]">
            <h4 className="font-headline-md text-headline-md text-on-surface text-lg">Tautan Cepat</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Beranda</Link>
              <Link href="/#tentang" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Tentang</Link>
              <Link href="/#program" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Program</Link>
              <Link href="/#guru" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Guru</Link>
              <Link href="/#testimoni" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Testimoni</Link>
              <Link href="/#berita" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Berita</Link>
            </nav>
          </div>

          {/* Column 3: Information */}
          <div className="space-y-6">
            <h4 className="font-headline-md text-headline-md text-on-surface text-lg">Informasi</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
                <span className="font-body-md text-body-md text-on-surface-variant max-w-[200px]">{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>call</span>
                <span className="font-body-md text-body-md text-on-surface-variant">{phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>mail</span>
                <span className="font-body-md text-body-md text-on-surface-variant">{email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-container-max mx-auto pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-label-sm text-label-sm text-on-surface-variant">
          © {new Date().getFullYear()} TK IT Bina Insan Mulia. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Kebijakan Privasi</Link>
          <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Syarat &amp; Ketentuan</Link>
        </div>
      </div>
    </footer>
  );
}
