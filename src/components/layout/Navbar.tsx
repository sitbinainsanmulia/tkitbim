"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

export function Navbar({ logoUrl }: { logoUrl?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== '/') return;
      
      const sections = ['tentang', 'fasilitas', 'program', 'guru', 'testimoni'];
      
      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const isActive = (path: string) => {
    if (pathname !== '/') {
      return pathname?.startsWith(path) && path !== '/';
    }
    
    if (path === '/') {
      return activeSection === '';
    }
    
    return path === `/#${activeSection}`;
  };

  return (
    <header className="bg-surface/90 dark:bg-surface-container-high/90 backdrop-blur-md w-full top-0 sticky z-50 shadow-sm">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link href="/" className="flex items-center">
          {logoUrl ? (
            <div className="relative w-32 h-10 md:w-40 md:h-12">
              <Image src={logoUrl} alt="Logo TK IT Bina Insan Mulia" fill className="object-contain" priority sizes="(max-width: 768px) 128px, 160px" />
            </div>
          ) : (
            <div className="font-headline-md text-headline-md text-primary font-bold dark:text-primary-fixed-dim">
              TK IT Bina Insan Mulia
            </div>
          )}
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/" className={`font-body-md text-body-md transition-all border-b-[3px] pb-1 ${isActive('/') ? 'text-primary dark:text-primary-fixed-dim font-bold border-[#fbd373]' : 'text-on-surface-variant dark:text-on-surface-variant border-transparent hover:text-secondary dark:hover:text-secondary-fixed-dim'}`}>
            Beranda
          </Link>
          <Link href="/#tentang" className={`font-body-md text-body-md transition-all border-b-[3px] pb-1 ${isActive('/#tentang') ? 'text-primary dark:text-primary-fixed-dim font-bold border-[#fbd373]' : 'text-on-surface-variant dark:text-on-surface-variant border-transparent hover:text-secondary dark:hover:text-secondary-fixed-dim'}`}>
            Tentang
          </Link>
          <Link href="/#fasilitas" className={`font-body-md text-body-md transition-all border-b-[3px] pb-1 ${isActive('/#fasilitas') ? 'text-primary dark:text-primary-fixed-dim font-bold border-[#fbd373]' : 'text-on-surface-variant dark:text-on-surface-variant border-transparent hover:text-secondary dark:hover:text-secondary-fixed-dim'}`}>
            Fasilitas
          </Link>
          <Link href="/#program" className={`font-body-md text-body-md transition-all border-b-[3px] pb-1 ${isActive('/#program') ? 'text-primary dark:text-primary-fixed-dim font-bold border-[#fbd373]' : 'text-on-surface-variant dark:text-on-surface-variant border-transparent hover:text-secondary dark:hover:text-secondary-fixed-dim'}`}>
            Program
          </Link>
          <Link href="/#guru" className={`font-body-md text-body-md transition-all border-b-[3px] pb-1 ${isActive('/#guru') ? 'text-primary dark:text-primary-fixed-dim font-bold border-[#fbd373]' : 'text-on-surface-variant dark:text-on-surface-variant border-transparent hover:text-secondary dark:hover:text-secondary-fixed-dim'}`}>
            Guru
          </Link>
          <Link href="/#testimoni" className={`font-body-md text-body-md transition-all border-b-[3px] pb-1 ${isActive('/#testimoni') ? 'text-primary dark:text-primary-fixed-dim font-bold border-[#fbd373]' : 'text-on-surface-variant dark:text-on-surface-variant border-transparent hover:text-secondary dark:hover:text-secondary-fixed-dim'}`}>
            Testimoni
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link href="/pendaftaran" className="hidden md:flex font-body-md text-body-md bg-[#fbd373] text-[#4a3200] px-4 py-2 rounded-lg font-bold scale-95 active:opacity-80 transition-all hover:bg-[#eabf54] hover:text-[#4a3200] hover:shadow-md border-b-2 border-[#d9af42]">
            Pendaftaran
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-primary flex items-center justify-center p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <MaterialIcon name={isOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-surface absolute top-full left-0 w-full shadow-lg border-t border-outline-variant/20 flex flex-col p-4 space-y-4">
          <Link href="/" className={`${isActive('/') ? 'text-primary font-bold bg-primary/5' : 'text-on-surface-variant hover:text-primary'} px-4 py-2 rounded-lg`} onClick={() => setIsOpen(false)}>
            Beranda
          </Link>
          <Link href="/#tentang" className={`${isActive('/#tentang') ? 'text-primary font-bold bg-primary/5' : 'text-on-surface-variant hover:text-primary'} px-4 py-2 rounded-lg`} onClick={() => setIsOpen(false)}>
            Tentang
          </Link>
          <Link href="/#fasilitas" className={`${isActive('/#fasilitas') ? 'text-primary font-bold bg-primary/5' : 'text-on-surface-variant hover:text-primary'} px-4 py-2 rounded-lg`} onClick={() => setIsOpen(false)}>
            Fasilitas
          </Link>
          <Link href="/#program" className={`${isActive('/#program') ? 'text-primary font-bold bg-primary/5' : 'text-on-surface-variant hover:text-primary'} px-4 py-2 rounded-lg`} onClick={() => setIsOpen(false)}>
            Program
          </Link>
          <Link href="/#guru" className={`${isActive('/#guru') ? 'text-primary font-bold bg-primary/5' : 'text-on-surface-variant hover:text-primary'} px-4 py-2 rounded-lg`} onClick={() => setIsOpen(false)}>
            Guru
          </Link>
          <Link href="/#testimoni" className={`${isActive('/#testimoni') ? 'text-primary font-bold bg-primary/5' : 'text-on-surface-variant hover:text-primary'} px-4 py-2 rounded-lg`} onClick={() => setIsOpen(false)}>
            Testimoni
          </Link>
          <Link href="/pendaftaran" className="bg-secondary text-on-secondary text-center px-6 py-3 rounded-full font-bold shadow-sm w-full mt-4" onClick={() => setIsOpen(false)}>
            Pendaftaran
          </Link>
        </div>
      )}
    </header>
  );
}
