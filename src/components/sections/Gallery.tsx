"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

const defaultGalleryItems = [
  {
    title: "Lomba Mewarnai Hari Santri",
    desc: "Keseruan anak-anak dalam mengikuti lomba mewarnai bersama.",
    image_url: "https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Kunjungan ke Kebun Binatang",
    desc: "Mengenal berbagai macam ciptaan Allah melalui field trip.",
    image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Praktek Sholat Berjamaah",
    desc: "Pembiasaan ibadah harian sejak dini dengan praktek langsung.",
    image_url: "https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

interface GalleryItem {
  image_url: string;
  caption?: string;
  category?: string;
}

export function Gallery({ data }: { data?: GalleryItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  
  const galleryItems = data && data.length > 0 ? data.map(item => ({
    title: item.caption || item.category,
    desc: item.category || "",
    image_url: item.image_url || defaultGalleryItems[0].image_url
  })) : defaultGalleryItems;

  useEffect(() => {
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
    const maxIndex = galleryItems.length - itemsPerView;
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
      setCurrentIndex(Math.max(0, galleryItems.length - itemsPerView));
    }
  };

  const isCentered = galleryItems.length <= itemsPerView;

  return (
    <section className="py-16 md:py-24 bg-surface relative" id="galeri">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <h2 className="text-secondary font-bold text-sm tracking-wider uppercase mb-2">Galeri Foto</h2>
        <h3 className="font-display-lg text-display-lg text-primary md:text-[40px] md:leading-[48px] font-bold mb-12">Kegiatan Anak-Anak</h3>
        
        <div className="relative">
          <div className="overflow-hidden px-2 py-4">
            <div 
              className={`flex transition-transform duration-500 ease-in-out gap-8 ${isCentered ? 'justify-center' : ''}`}
              style={{ transform: isCentered ? 'none' : `translateX(calc(-${currentIndex * (100 / itemsPerView)}% - ${currentIndex > 0 ? (2 * currentIndex) : 0}rem))` }}
            >
              {galleryItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="shrink-0 h-full max-w-md mx-auto"
                  style={{ width: itemsPerView === 1 ? '100%' : itemsPerView === 2 ? 'calc(50% - 1rem)' : 'calc(33.333% - 1.33rem)' }}
                >
                  <div className="bg-surface-container-low rounded-3xl overflow-hidden shadow-sm border border-primary/5 text-left h-full hover-lift custom-shadow">
                    <div className="h-48 bg-surface-container-high relative overflow-hidden">
                      {item.image_url ? (
                        <Image 
                          src={item.image_url} 
                          alt={item.title || "Gallery image"} 
                          fill 
                          className="object-cover" 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : null}
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-primary mb-2">{item.title}</h4>
                      <p className="text-sm text-on-surface-variant">{item.desc}</p>
                    </div>
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
                <MaterialIcon name="arrow_back" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-surface shadow-sm border border-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <MaterialIcon name="arrow_forward" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
