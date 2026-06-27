"use client";

import React, { useState, useEffect } from 'react';

const defaultTestimonials = [
  {
    content: '"Alhamdulillah, sejak sekolah di TK IT Bina Insan Mulia, anak saya jadi lebih mandiri dan sudah hafal beberapa doa harian."',
    name: 'Bunda Aisyah',
    role: 'Orang Tua Murid TK A'
  },
  {
    content: '"Fasilitasnya sangat mendukung untuk belajar sambil bermain. Guru-gurunya juga sangat sabar dan telaten."',
    name: 'Ayah Budi',
    role: 'Orang Tua Murid TK B'
  }
];

export function Testimonials({ data }: { data?: any[] }) {
  const testimonials = data && data.length > 0 ? data.map(t => ({
    content: t.content,
    name: t.parent_name,
    role: t.child_name ? `Orang tua dari ${t.child_name}` : 'Orang Tua',
    rating: t.rating || 5
  })) : defaultTestimonials.map(t => ({ ...t, rating: 5 }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    const maxIndex = testimonials.length - itemsPerView;
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
      setCurrentIndex(Math.max(0, testimonials.length - itemsPerView));
    }
  };

  const isCentered = testimonials.length <= itemsPerView;

  return (
    <section className="py-16 bg-surface-container-low relative" id="testimoni">
      <div className="mx-auto px-margin-mobile md:px-margin-desktop text-center max-w-4xl">
        <h2 className="text-secondary font-bold text-sm tracking-wider uppercase mb-2">Testimoni</h2>
        <h3 className="font-display-lg text-display-lg text-primary md:text-[40px] md:leading-[48px] font-bold mb-12">Kata Orang Tua</h3>
        
        <div className="relative">
          <div className="overflow-hidden px-2 py-4">
            <div 
              className={`flex transition-transform duration-500 ease-in-out gap-8 ${isCentered ? 'justify-center' : ''}`}
              style={{ transform: isCentered ? 'none' : `translateX(calc(-${currentIndex * (100 / itemsPerView)}% - ${currentIndex > 0 ? (2 * currentIndex) : 0}rem))` }}
            >
              {testimonials.map((testi, idx) => (
                <div 
                  key={idx} 
                  className="shrink-0 flex max-w-md mx-auto"
                  style={{ width: itemsPerView === 1 ? '100%' : 'calc(50% - 1rem)' }}
                >
                  <div className="bg-surface p-6 rounded-3xl shadow-sm border border-primary/5 text-left w-full hover-lift custom-shadow relative flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <span className="material-symbols-outlined text-secondary-container text-4xl opacity-50">format_quote</span>
                      <div className="flex gap-0.5 text-yellow-400">
                        {[1,2,3,4,5].map(star => (
                          <span key={star} className={`material-symbols-outlined text-sm ${star <= testi.rating ? 'text-yellow-400' : 'text-outline-variant/30'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-on-surface-variant text-sm mb-6 italic">{testi.content}</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                        {testi.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-primary text-sm">{testi.name}</h4>
                        <p className="text-xs text-on-surface-variant">{testi.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
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
        </div>
      </div>
    </section>
  );
}
