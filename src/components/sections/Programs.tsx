"use client";

import React, { useState, useEffect } from 'react';

const defaultPrograms = [
  {
    title: "Tahfidz Quran Junior",
    desc: "Menghafal juz 30 dengan metode murottal yang menyenangkan.",
    icon: "menu_book",
    bgClass: "bg-primary-container",
    textClass: "text-on-primary-container",
    hoverBgClass: "bg-primary/5",
  },
  {
    title: "Pembelajaran Bilingual",
    desc: "Pengenalan kosa kata bahasa Arab dan Inggris dasar.",
    icon: "language",
    bgClass: "bg-secondary-container",
    textClass: "text-on-secondary-container",
    hoverBgClass: "bg-secondary/5",
  },
  {
    title: "Kreativitas & Seni Islami",
    desc: "Kaligrafi dasar, nasyid, dan keterampilan motorik halus.",
    icon: "palette",
    bgClass: "bg-tertiary-container",
    textClass: "text-on-tertiary-container",
    hoverBgClass: "bg-tertiary/5",
  },
  {
    title: "Akhlak & Adab Sehari-hari",
    desc: "Pembiasaan adab makan, masuk masjid, dan doa sehari-hari.",
    icon: "volunteer_activism",
    bgClass: "bg-primary-container",
    textClass: "text-on-primary-container",
    hoverBgClass: "bg-primary/5",
  },
  {
    title: "Eksplorasi Alam (Outbound)",
    desc: "Mengenal ciptaan Allah melalui kegiatan di luar kelas.",
    icon: "nature_people",
    bgClass: "bg-secondary-container",
    textClass: "text-on-secondary-container",
    hoverBgClass: "bg-secondary/5",
  },
  {
    title: "Motorik Kasar & Olahraga",
    desc: "Senam sehat, berenang, dan melatih ketangkasan anak.",
    icon: "sports_handball",
    bgClass: "bg-tertiary-container",
    textClass: "text-on-tertiary-container",
    hoverBgClass: "bg-tertiary/5",
  }
];

export function Programs({ data }: { data?: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [mounted, setMounted] = useState(false);

  const programs = data && data.length > 0 ? data.map(item => ({
    title: item.title,
    desc: item.description,
    icon: item.icon || "star",
    bgClass: "bg-primary-container",
    textClass: "text-on-primary-container",
    hoverBgClass: "bg-primary/5",
  })) : defaultPrograms;

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    const maxIndex = programs.length - itemsPerView;
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.max(0, programs.length - itemsPerView));
    }
  };

  const isCentered = programs.length <= itemsPerView;

  return (
    <section className="py-16 md:py-24 bg-surface-container-low relative overflow-hidden" id="program">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <h2 className="text-secondary font-bold text-sm tracking-wider uppercase mb-2">Program Kami</h2>
        <h3 className="font-display-lg text-display-lg text-primary md:text-[40px] md:leading-[48px] font-bold mb-12">Program Unggulan</h3>
        
        <div className="relative">
          <div className="overflow-hidden px-2 py-4">
            <div 
              className={`flex transition-transform duration-500 ease-in-out gap-8 ${isCentered ? 'justify-center' : ''}`}
              style={{ transform: isCentered ? 'none' : `translateX(calc(-${currentIndex * (100 / itemsPerView)}% - ${currentIndex > 0 ? (2 * currentIndex) : 0}rem))` }}
            >
              {programs.map((program, idx) => (
                <div 
                  key={idx} 
                  className="shrink-0"
                  style={{ width: itemsPerView === 1 ? '100%' : itemsPerView === 2 ? 'calc(50% - 1rem)' : 'calc(33.333% - 1.33rem)' }}
                >
                  <div className="bg-surface p-8 rounded-4xl shadow-sm hover:shadow-md transition-all border border-primary/5 group h-full text-left relative overflow-hidden flex flex-col max-w-sm mx-auto">
                    <div className={`absolute top-0 right-0 w-24 h-24 ${program.hoverBgClass} rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500`}></div>
                    <div className={`w-20 h-20 rounded-full ${program.bgClass} ${program.textClass} flex items-center justify-center mb-6 shrink-0`}>
                      <span className="material-symbols-outlined text-4xl">{program.icon}</span>
                    </div>
                    <h4 className="font-headline-md text-xl text-primary font-bold mb-4">{program.title}</h4>
                    <p className="text-on-surface-variant font-body-md grow">{program.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {!isCentered && (
            <div className="flex justify-center gap-4 mt-8">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-surface shadow-sm border border-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-surface shadow-sm border border-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
